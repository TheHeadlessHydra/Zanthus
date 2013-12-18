/**
 * tower.js
 * 
 * This file is in charge of creating and maintaining the tower structure,
 * its associated pieces, and how it is built.  
 * 
 * @author Serj Kazar
 */

/* X and Z position to add tower meshes to. 
 * Indicates the centre position of the tower. */
var TOWER_X = -450;
var TOWER_Z = 0;
		
/* What X value climbers should begin climbing */
var WHERETOCLIMB = -300;

/* Various types of towers*/
var TOWER_FLING = 0;

/* Type of mouse hover modes */
var CURRENT_HOVER_MODE = 0; /* Current mode. Initialized to activate mode */
var HOVER_ACTIVATE = 0;     /* In this mode, click a tower to activate a tower's trap */
var HOVER_DESTROY = 1;      /* In this mode, click a tower section to destroy it  */

var crystalmesh;

function Tower(height, mesh, base, type){
	this.height = height;
	this.mesh = mesh;
	this.base = base;
	this.type = type;
};

towerList = [];			/* List of Tower elements */
towerMeshList = [];     /* List of tower meshes */
currentTowerHeight = 0; /* Current height of the tower */

/**
 * Basic add of a tower mesh - Simply create a cube with the given height. 
 * @param height
 */
function addToTower(height){
	var geometry = new THREE.CubeGeometry(300,height,300,10,10,10);
	var material = new THREE.MeshLambertMaterial( { color: 0xa74fff } );
	var newMesh = new THREE.Mesh( geometry, material );
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight+(height/2); // Pivot in centre of object
	newMesh.position.z=TOWER_Z;
	
	addToList(new Tower(height,newMesh,currentTowerHeight,TOWER_FLING));
	currentTowerHeight = currentTowerHeight + height;
	updateTopMesh();
}
function addMeshToTower(newMesh, height){
	if(typeof newMesh == 'undefined'){
		console.log("Adding undefined mesh!!");
		return;
	}
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight; // Pivot in centre of object
	newMesh.position.z=TOWER_Z;
	
	addToList(new Tower(height,newMesh,currentTowerHeight,TOWER_FLING));
	currentTowerHeight = currentTowerHeight + height;
	updateTopMesh();
}
function addBaseMeshToTower(newMesh, height){
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight;
	newMesh.position.z=TOWER_Z;
	mainScene.add(newMesh);
	currentTowerHeight = currentTowerHeight + height;
	updateTopMesh();
}
function addStaticMeshToTower(newMesh){
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight; // Pivot in centre of object
	newMesh.position.z=TOWER_Z;
	
	mainScene.add(newMesh);
}
function addFlingPiece(){
	/* Only allow if the player has enough coins */
	
	if(updateCoins(-flingpiece_cost)){
		var newPiece = new THREE.Mesh(flingpiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
		addMeshToTower(newPiece,flingpiece_height);
	}
}


function addStaticMeshToScene(newMesh){
	mainScene.add(newMesh);
}


function updateTopMesh(){
	if(typeof crystalmesh != 'undefined'){
		crystalmesh.position.y=currentTowerHeight;
	}
}
/**
 * Add a Tower element to the scene, the lists and assign its position. 
 * @param tower: the Tower element to add to the list. 
 */
function addToList(tower){
	mainScene.add(tower.mesh);
	
	/* Add a new variable to the mesh itself - its position in the tower array */
	tower.mesh.towerArrayPosition = towerMeshList.length;
	
	towerList.push(tower);
	towerMeshList.push(tower.mesh);
}

/**
 * Remove a mesh from the tower, and slide the rest of the tower down
 * @param towerMesh: Mesh to remove
 */
function removeFromTower(towerMesh){
	var tower = towerList[towerMesh.towerArrayPosition];
	towerList.splice(towerMesh.towerArrayPosition,1);
	towerMeshList.splice(towerMesh.towerArrayPosition,1);
	currentTowerHeight = currentTowerHeight - tower.height;
	updateTopMesh();
	for(var i = towerMesh.towerArrayPosition; i < towerMeshList.length; i++){
		towerMeshList[i].position.y = towerMeshList[i].position.y - tower.height;
		towerMeshList[i].towerArrayPosition = towerMeshList[i].towerArrayPosition - 1;
	}
	mainScene.remove(towerMesh);
}
function enterDestroyMode(){
	CURRENT_HOVER_MODE = HOVER_DESTROY;
}


////////////////////////////////////////////////////
///
/// Mouse Hover functions
/**
 * Check if the hover of the mouse is over a tower piece or not, and 
 * properly handle them if they are.
 * - Will apply towerHover() on all tower pieces being hovered on.
 * - Will apply towerNotHover() on all tower pieces not being hovered on. 
 * 
 * Current problems with this code:
 * -- Since its checking both back and front, it hovers over 2 objects
 *    at a time due to the FOV of the camera itself. 
 * 
 * @param xPosInDiv: X value of mouse in relation to div content
 * @param yPosInDiv: Y value of mouse in relation to div content
 */
function checkTowerHover(xPosInDiv,yPosInDiv){
	/* Optimization: Do not need to check collision if not close enough to tower. */
	if(xPosInDiv > (DIV_WIDTH/2)){
		return;
	}
	
	/* Obtain all objects currently being hovered on by the mouse*/
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	var intersects = raycaster.intersectObjects( towerMeshList );
	
	/* A hacky disjoin operation created by looping through both arrays - Will obtain all
	 * objects currently NOT being hovered on. 
	 * 
	 * I cannot get comparison of three.js mesh types to give a 'true' value, 
	 * so give up and just loop through both arrays comparing their respective
	 * positions in the towerListArray (which is stored in the mesh object) */
	var notHover = [];
	for(var i = 0; i < towerMeshList.length; i++){
		/* This loop should be 1 in length most of the time - max 2*/
		var isIntersect = 0;
		for(var j = 0; j < intersects.length; j++){
			var hoverTowerPosition = intersects[j].object.towerArrayPosition;
			var currentTowerPosition = towerMeshList[i].towerArrayPosition;
			if(hoverTowerPosition == currentTowerPosition){
				isIntersect = 1;
			}
		}
		if(isIntersect == 0){
			notHover.push(towerMeshList[i]);
		}
	}
	/* All objects not being hovered on can apply the towerNotHover() call, and only
	 * one object will be towerHover() at a time, forcing all others to not be hovered. 
	 * **********************************************************************
	 * - Theres a possibility to optimize this by only calling NotHover() on
	 *   meshes that have already been set to emissive, maybe though checking 
	 *   the hex value on the mesh emissive or a flag variable. 
	 *   Leave it naive for now. */
	for(var i = 0; i < notHover.length; i++){
		towerNotHover(notHover[i]);
	}
	/* Make sure only one piece of the tower is being highlighted by
	 * making the first element highlighted, but the remaining elements not highlighted. */
	if(intersects.length > 0){
		towerHover(intersects[0].object);
	}
	for(var i = 1; i < intersects.length; i++){
		//towerNotHover(intersects[ i ].object);
	}
}
/**
 * Manipulate tower when hovered.
 * @param towerMesh: Mesh to manipulate
 */
function towerHover(towerMesh){
	if(CURRENT_HOVER_MODE == HOVER_ACTIVATE){
		towerMesh.material.emissive.setHex( 0xff0000 );
	}
	else if(CURRENT_HOVER_MODE == HOVER_DESTROY){
		towerMesh.material.emissive.setHex( 0xae1f1f );
	}
}
/**
 * Manipulate tower when not being hovered on.
 * @param towerMesh: Mesh to manipulate
 */
function towerNotHover(towerMesh){
	towerMesh.currentHex = towerMesh.material.emissive.getHex();
	towerMesh.material.emissive.setHex( 0x000000 );
}
////////////////////////////////////////////////////
///
/// Mouse left click functions
/**
 * Checks which part of the tower was clicked and calls towerClicked() on it. 
 * @param xPosInDiv: X value of mouse in relation to div content
 * @param yPosInDiv: Y value of mouse in relation to div content
 */
function checkTowerLeftClick(xPosInDiv,yPosInDiv){
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var mesh = intersects[ 0 ].object;
		towerLeftClicked(mesh);
		console.log("Tower left clicked!");
	}
}
/**
 * Tower mesh was clicked. In this instance of a tower click, simply eliminate any climber
 * that is colliding with the tower mesh.
 * 
 * @param towerMesh: Mesh that was clicked.
 */
function towerLeftClicked(towerMesh){
	if(CURRENT_HOVER_MODE == HOVER_DESTROY){
		/* Must destroy tower piece and slide the rest of the tower down */
		removeFromTower(towerMesh);
	} /* HOVER_DESTROY*/
	else if(CURRENT_HOVER_MODE == HOVER_ACTIVATE){
		if(towerList[towerMesh.towerArrayPosition].type == TOWER_FLING){
			flingpiece_activate(towerMesh);
		}
	} /* HOVER_ACTIVATE*/
}

////////////////////////////////////////////////////
///
/// Mouse right click functions

function checkTowerRightClick(xPosInDiv,yPosInDiv){
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var mesh = intersects[ 0 ].object;
		towerRightClicked(mesh);
		console.log("Tower right clicked!");
	}
	else{
		if(CURRENT_HOVER_MODE == HOVER_DESTROY){
			CURRENT_HOVER_MODE = HOVER_ACTIVATE;
		}
	}
}

function towerRightClicked(towerMesh){
	if(CURRENT_HOVER_MODE == HOVER_DESTROY){
		CURRENT_HOVER_MODE = HOVER_ACTIVATE;
		towerNotHover(towerMesh);
	}
}
