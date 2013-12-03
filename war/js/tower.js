

var TOWER_X = -300;
var TOWER_Z = 0;

var towerMeshList = [];
var currentTowerHeight = -50;


function addToTower(){
	geometry = new THREE.CubeGeometry(100,50,100);
	material = new THREE.MeshLambertMaterial( { color: 0xa74fff } );
	newMesh = new THREE.Mesh( geometry, material );
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight;
	newMesh.position.z=TOWER_Z;
	
	currentTowerHeight = currentTowerHeight + 50;
	addToList(newMesh);
}

function addToList(mesh){
	mainScene.add(mesh);
	towerMeshList.push(mesh);
}
function popFromList(){
	var mesh = towerMeshList.pop();
	currentTowerHeight = currentTowerHeight - 50;
	mainScene.remove(mesh);
	
}
function removeFromList(mesh){	
	var returnValue = towerMeshList.indexOf(mesh);
	if(returnValue != -1){
		towerMeshList.splice(returnValue,1);
	}
	
}