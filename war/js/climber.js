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
var climber_cost = 50;
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
	//spawnClimber();
}
/**
 * Spawns a new mesh and begins its movement
 */
function spawnClimber(){
	var geo = new THREE.SphereGeometry(20);
	var mat = new THREE.MeshLambertMaterial( { color: 0xf0ff00 } );
	var climber = new THREE.Mesh( geo, mat );
	
	var randomSpawnZ = Math.floor((Math.random()*300)-0);
	climber.position.set(200,0,randomSpawnZ);
	mainScene.add( climber );
	
	/* Add a new variable to the mesh itself - its position in the climber array */
	climber.climberArrayPosition = climberArray.length;
	climberArray.push(new Climber(climber));
	climberMeshArray.push(climber);
}
/**
 * Spwan a new turtle climber
 */
function spawnTurtle(){
	/* Only allow if the player has enough coins */
	/* Duplicate the flingpiece material for each added flingpiece, allowing each one to change their emissive values seperately */
	var newMaterials = [];
	for(var i = 0; i < turtle_materials.length; i++){
		newMaterials.push( turtle_materials[i].clone() );
	}
	var newPiece = new THREE.Mesh(turtle_mesh.geometry, new THREE.MeshFaceMaterial( newMaterials ) );
	
	var randomSpawnZ = Math.floor((Math.random()*150)-150);
	newPiece.position.set(200,0,randomSpawnZ);
	newPiece.scale.set(0.4,0.4,0.4);
	newPiece.rotation.y=Math.PI/2;
	mainScene.add( newPiece );
	
	/* Add a new variable to the mesh itself - its position in the climber array */
	newPiece.climberArrayPosition = climberArray.length;
	newPiece.state = 0;
	climberArray.push(new Climber(newPiece));
	climberMeshArray.push(newPiece);
	
	turtle_animate(newPiece);
}

/**
 * Takes a climber mesh and completely removes it from the scene. 
 * @param climberMesh: Mesh to kill from the scene
 */
function killClimber(climberMesh){
	if(typeof climberMesh != 'undefined'){
		updateCoins(climber_cost);
		//console.log("Remove position: "+climberMesh.climberArrayPosition);
		climberArray.splice(climberMesh.climberArrayPosition,1);
		climberMeshArray.splice(climberMesh.climberArrayPosition,1);
		
		/* Must update the climber array position of the rest of the climbers, as the array is being shifted down by 1 */
		for(var i = climberMesh.climberArrayPosition; i < climberArray.length; i++ ){
			climberMeshArray[i].climberArrayPosition = climberMeshArray[i].climberArrayPosition - 1;
		}
		
		killAnimation(climberMesh);
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
	/*
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
		
		if(climberArray[i].mesh.position.y > currentTowerHeight+topPiece_crystalheight){
			gameOver();
		}
	}*/
}
