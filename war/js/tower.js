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

function checkTowerHover(xPosInDiv,yPosInDiv){
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	//var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	/* Check each piece of the tower for a collision */
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var INTERSECTED = intersects[ 0 ].object;
		INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
		INTERSECTED.material.emissive.setHex( 0xff0000 );
		console.log("Tower hover!");
	}
}

function checkTowerCollide(xPosInDiv,yPosInDiv){
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( ( xPosInDiv / DIV_WIDTH ) * 2 - 1, - ( yPosInDiv / DIV_HEIGHT ) * 2 + 1, 0.5 );
	//var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, mainCamera );
	var raycaster = new THREE.Raycaster( mainCamera.position, vector.sub( mainCamera.position ).normalize() );
	/* Check each piece of the tower for a collision */
	var intersects = raycaster.intersectObjects( towerMeshList );
	if( intersects.length > 0 ){
		var mesh = intersects[ 0 ].object;
		towerClicked(mesh);
		console.log("Tower clicked!");
	}
}
function towerClicked(towerMesh){
	/* Check if any climbers collided with the clicked tower piece */
	for (var vertexIndex = 0; vertexIndex < towerMesh.geometry.vertices.length; vertexIndex++)
	{      
	    var localVertex = towerMesh.geometry.vertices[vertexIndex].clone();
	    //var globalVertex = cube.matrix.multiplyVector3(localVertex);
	    var globalVertex = localVertex.applyMatrix4(towerMesh.matrix);
	    var directionVector = globalVertex.sub( towerMesh.position );
	    var ray = new THREE.Raycaster( towerMesh.position, directionVector.clone().normalize() );
	    var collisionResults = ray.intersectObjects( climberMeshArray );
	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	for(var i = 0; i < collisionResults.length; i++){
	    		console.log("KILL");
	    		killClimber(collisionResults[i].object);
	    	}
	    }
	}
	console.log("length of climber mesh array: "+climberMeshArray.length);
	console.log("position is: " +towerMesh.towerArrayPosition);
	//mainScene.remove(towerMesh);
}