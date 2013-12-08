/**
 * climber.js
 * 
 * File in charge of the basic climber AI type of enemy. 
 * 
 * @author Serj Kazar
 */
var climberMeshArray = [];
var climberArray = [];
var climber;

/**
 * create a Climber enemy type. It has these modes:
 * 0: Moving towards the tower.
 * 1: Climbing the tower.
 * 
 * @param mesh
 * @returns
 */
function Climber(mesh){
	this.mesh = mesh;
	this.state = 0;
};

/**
 * Used to initialize the climbers. 
 */
function initClimbers(){
	spawn();
}
/**
 * Spawns a new mesh and begins its movement
 */
function spawn(){
	var geo = new THREE.SphereGeometry(20);
	var mat = new THREE.MeshLambertMaterial( { color: 0xf0ff00 } );
	var climber = new THREE.Mesh( geo, mat );
	climber.position.set(200,0,0);
	mainScene.add( climber );
	
	/* Add a new variable to the mesh itself - its position in the climber array */
	climber.climberArrayPosition = climberArray.length;
	climberArray.push(new Climber(climber));
	climberMeshArray.push(climber);
}

/**
 * Takes a climber mesh and completely removes it from the scene. 
 * @param climberMesh: Mesh to kill from the scene
 */
function killClimber(climberMesh){
	if(typeof climberMesh != 'undefined'){
		console.log("Remove position: "+climberMesh.climberArrayPosition);
		climberArray.splice(climberMesh.climberArrayPosition,1);
		climberMeshArray.splice(climberMesh.climberArrayPosition,1);
		
		/* Must update the climber array position of the rest of the climbers, as the array is being shifted down by 1 */
		for(var i = climberMesh.climberArrayPosition; i < climberArray.length; i++ ){
			climberMeshArray[i].climberArrayPosition = climberMeshArray[i].climberArrayPosition - 1;
		}
		mainScene.remove(climberMesh);
	}
}

/**
 *  Called on each frame render - this function should be highly profiled.
 *  
 *  In charge of all logical checks for each climber in the climber array.  
 *   
 * */
function updateClimbers(){
	for(var i = 0; i < climberArray.length; i++){
		var climberElement = climberArray[i];
		switch(climberElement.state){
		case 0:
			climberElement.mesh.position.x = climberElement.mesh.position.x - 1;
			if(climberElement.mesh.position.x < WHERETOCLIMB ){
				climberArray[i].state = 1;
			}
			break;
		case 1:
			climberElement.mesh.position.y = climberElement.mesh.position.y + 1;
			break;
		default:
			console.log("unkown mode: "+climberElement.state);
		}
		
		if(climberArray[i].mesh.position.y > currentTowerHeight){
			gameOver();
		}
	}
}