

var TOWER_X = -300;
var TOWER_Z = 0;


function tower(height, mesh){
	this.height = height;
	this.mesh = mesh;
};

towerMeshList = new Array();
currentTowerHeight = 0;


function addToTower(height){
	geometry = new THREE.CubeGeometry(100,height,100);
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
}
function popFromList(){
	var tower = towerMeshList.pop();
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