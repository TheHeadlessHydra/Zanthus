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

function tower(height, mesh){
	this.height = height;
	this.mesh = mesh;
};

towerMeshList = [];
collidableTowerList = [];
currentTowerHeight = 0;


function addToTower(height){
	geometry = new THREE.CubeGeometry(300,height,300);
	material = new THREE.MeshLambertMaterial( { color: 0xa74fff } );
	newMesh = new THREE.Mesh( geometry, material );
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight+(height/2); // Pivot in centre of object
	newMesh.position.z=TOWER_Z;
	
	currentTowerHeight = currentTowerHeight + height;
	addToList(new tower(height,newMesh));
}

function addToList(tower){
	mainScene.add(tower.mesh);
	towerMeshList.push(tower);
	collidableTowerList.push(tower.mesh);
}
function popFromList(){
	var tower = towerMeshList.pop();
	collidableTowerList.pop();
	if(typeof tower != 'undefined'){
		currentTowerHeight = currentTowerHeight - tower.height;
		mainScene.remove(tower.mesh);
	}
}
function removeFromList(tower){	
	var returnValue = towerMeshList.indexOf(tower);
	if(returnValue != -1){
		towerMeshList.splice(returnValue,1);
	}
}