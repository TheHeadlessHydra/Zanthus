/**
 * tower.js
 * 
 * This file is in charge of creating and maintaining the tower structure,
 * its associated pieces, and how it is built.  
 * 
 * @author Serj Kazar
 */

var TOWER_X = -450;
var TOWER_Z = 0;

/* What X value climbers should begin climbing */
var WHERETOCLIMB = -300;

/* Type of towers*/
var TOWER_FLING = 0;

function tower(height, mesh, base, type){
	this.height = height;
	this.mesh = mesh;
	this.base = base;
	this.type = type;
};

towerList = [];
towerMeshList = [];
currentTowerHeight = 0;


function addToTower(height){
	var geometry = new THREE.CubeGeometry(300,height,300,10,10,10);
	var material = new THREE.MeshLambertMaterial( { color: 0xa74fff } );
	var newMesh = new THREE.Mesh( geometry, material );
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight+(height/2); // Pivot in centre of object
	newMesh.position.z=TOWER_Z;
	
	addToList(new tower(height,newMesh,currentTowerHeight,TOWER_FLING));
	currentTowerHeight = currentTowerHeight + height;
}

function addToList(tower){
	mainScene.add(tower.mesh);
	
	/* Add a new variable to the mesh itself - its position in the tower array */
	tower.mesh.towerArrayPosition = towerMeshList.length;
	
	towerList.push(tower);
	towerMeshList.push(tower.mesh);
}
function popFromList(){
	var tower = towerList.pop();
	if(typeof tower != 'undefined'){
		currentTowerHeight = currentTowerHeight - tower.height;
		mainScene.remove(tower.mesh);
	}
}
function removeFromList(tower){	
	var returnValue = towerList.indexOf(tower);
	if(returnValue != -1){
		towerList.splice(returnValue,1);
	}
}

/**
 * Manipulate tower when hovered.
 * @param towerMesh: Mesh to manipulate
 */
function towerHover(towerMesh){
	towerMesh.currentHex = towerMesh.material.emissive.getHex();
	towerMesh.material.emissive.setHex( 0xff0000 );
}
/**
 * Manipulate tower when not being hovered on.
 * @param towerMesh: Mesh to manipulate
 */
function towerNotHover(towerMesh){
	towerMesh.currentHex = towerMesh.material.emissive.getHex();
	towerMesh.material.emissive.setHex( 0x000000 );
}
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
	/* Obtain all objects currently being hovered on by the mouse*/
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var intersectedMesh = intersects[ 0 ].object;
		towerHover(intersectedMesh);
	}
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
	/* All objects not being hovered on can apply the towerNotHover() call
	 * **********************************************************************
	 * - Theres a possibility to optimize this by only calling NotHover() on
	 *   meshes that have already been set to emissive, maybe though checking 
	 *   the hex value on the mesh emissive or a flag variable. 
	 *   Leave it naive for now. */
	for(var i = 0; i < notHover.length; i++){
		towerNotHover(notHover[i]);
	}
}

/**
 * Checks which part of the tower was clicked and calls towerClicked() on it. 
 * @param xPosInDiv: X value of mouse in relation to div content
 * @param yPosInDiv: Y value of mouse in relation to div content
 */
function checkTowerCollide(xPosInDiv,yPosInDiv){
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var mesh = intersects[ 0 ].object;
		towerClicked(mesh);
		console.log("Tower clicked!");
	}
}
/**
 * Tower mesh was clicked. In this instance of a tower click, simply eliminate any climber
 * that is colliding with the tower mesh.
 * 
 * @param towerMesh: Mesh that was clicked.
 */
function towerClicked(towerMesh){
	/* Check if any climbers collided with the clicked tower piece */
	for (var vertexIndex = 0; vertexIndex < towerMesh.geometry.vertices.length; vertexIndex++)
	{      
	    var localVertex = towerMesh.geometry.vertices[vertexIndex].clone();
	    var globalVertex = localVertex.applyMatrix4(towerMesh.matrix);
	    var directionVector = globalVertex.sub( towerMesh.position );
	    var ray = new THREE.Raycaster( towerMesh.position, directionVector.clone().normalize() );
	    var collisionResults = ray.intersectObjects( climberMeshArray );
	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	for(var i = 0; i < collisionResults.length; i++){
	    		killClimber(collisionResults[i].object);
	    	}
	    }
	}
}