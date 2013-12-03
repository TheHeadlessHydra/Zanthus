

var TOWER_X = -300;
var TOWER_Z = 0;


function tower(height, mesh){
	this.height = height;
	this.mesh = mesh;
};

var towerMeshList = new Array();
var currentTowerHeight = -50;


function addToTower(){
	geometry = new THREE.CubeGeometry(100,50,100);
	material = new THREE.MeshLambertMaterial( { color: 0xa74fff } );
	newMesh = new THREE.Mesh( geometry, material );
	newMesh.position.x=TOWER_X;
	newMesh.position.y=currentTowerHeight;
	newMesh.position.z=TOWER_Z;
	
	console.log('height-add: '+currentTowerHeight);
	addToList(new tower(50,newMesh));
	currentTowerHeight = currentTowerHeight + 50;
}

function addToList(tower){
	mainScene.add(tower.mesh);
	towerMeshList.push(tower);
}
function popFromList(){
	var tower = towerMeshList.pop();
	currentTowerHeight = currentTowerHeight - tower.height;
	console.log('height-remove: '+tower.height);
	mainScene.remove(tower.mesh);
}
function removeFromList(tower){	
	var returnValue = towerMeshList.indexOf(tower);
	if(returnValue != -1){
		towerMeshList.splice(returnValue,1);
	}
}