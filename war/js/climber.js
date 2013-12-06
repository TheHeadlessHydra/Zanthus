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

function initClimbers(){
	spawn();
}

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
function killClimber(climberMesh){
	if(typeof climberMesh != 'undefined'){
		console.log("Remove position: "+climberMesh.climberArrayPosition);
		climberArray.splice(climberMesh.climberArrayPosition,1);
		climberMeshArray.splice(climberMesh.climberArrayPosition,1);
		mainScene.remove(climberMesh);
	}
}

function updateClimbers(){
	for(var i = 0; i < climberArray.length; i++){
		var climberElement = climberArray[i];
		switch(climberElement.state){
		case 0:
			climberElement.mesh.position.x = climberElement.mesh.position.x - 1;
			break;
		case 1:
			climberElement.mesh.position.y = climberElement.mesh.position.y + 1;
			break;
		default:
			console.log("unkown mode: "+climberElement.state);
		
		}
	}
	for(var i = 0; i < climberArray.length; i++){
		var elmnt = climberArray[i];
		
		/* If a climber has reached the top, its game over */
		if(elmnt.mesh.position.y > currentTowerHeight){
			gameOver();
		}
		if(elmnt.state == 0){
			for (var vertexIndex = 0; vertexIndex < elmnt.mesh.geometry.vertices.length; vertexIndex++)
			{       
			    var localVertex = elmnt.mesh.geometry.vertices[vertexIndex].clone();
			    //var globalVertex = climber.matrix.multiplyVector3(localVertex);
			    var globalVertex = localVertex.applyMatrix4(elmnt.mesh.matrix);
			    var directionVector = globalVertex.sub( elmnt.mesh.position );
			
			    var ray = new THREE.Raycaster( elmnt.mesh.position, directionVector.clone().normalize() );
			    var collisionResults = ray.intersectObjects( towerMeshList );
			    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			    {
			    	if( climberArray[i].state == 0) {
			    		climberArray[i].mesh.position.x = climberArray[i].mesh.position.x - 5;
			    	}
			    	climberArray[i].state = 1;
			    	console.log("COLLIDE!");
			    }
			}
		}
	}
}