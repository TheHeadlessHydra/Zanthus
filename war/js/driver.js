/**
 * driver.js
 * 
 * This is the driver in charge of many important features:
 * 1. The updating and rendering of the application.
 * 2. Initializing the other modules.
 * 
 * @author Serj Kazar
 */
var mesh;
/* Drive!
 * 
 * For the 'global var' variables to exist in the other files, 
 * this driver must call them in some way from here. If this file does
 * not call them, none of the variables will be shared to the modules
 * */
init();				/* Creates the main scene and camera, allowing for the rest of the modules to use them */
initClimbers();		/* Initializes the climber enemy type module */
initCubeSwap();		/* Initializes the test cubeswap module  */

animate();			/* Begins the render loop */

/**
 * Animation, render and update frameworks
 *
 */
function animate() {
	renderId = requestAnimationFrame(animate);
	
	/* Update the various modules */
	update();
	updateClimbers(); /* Updates related to the climber enemy type */
	updateCubeSwap(); /* Updates related to the test cubeswap system*/
	stats.update();
	
	render();
}

function update() {

	/* Collision test! */
	var collidableMeshList = [wall];
	for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
	{       
	    var localVertex = cube.geometry.vertices[vertexIndex].clone();
	    //var globalVertex = cube.matrix.multiplyVector3(localVertex);
	    var globalVertex = localVertex.applyMatrix4(cube.matrix);
	    var directionVector = globalVertex.sub( cube.position );

	    var ray = new THREE.Raycaster( cube.position, directionVector.clone().normalize() );
	    var collisionResults = ray.intersectObjects( collidableMeshList );
	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	console.log("COLLIDE!");
	    }
	}
}

var duration = 1000;
var keyframes = 200, interpolation = duration / keyframes;
var lastKeyframe = 0, currentKeyframe = 0;
function render() {
	if ( mesh ) {

		// Alternate morph targets

		var time = Date.now() % duration;

		var keyframe = Math.floor( time / interpolation );

		if ( keyframe != currentKeyframe ) {

			mesh.morphTargetInfluences[ lastKeyframe ] = 0;
			mesh.morphTargetInfluences[ currentKeyframe ] = 1;
			mesh.morphTargetInfluences[ keyframe ] = 0;

			lastKeyframe = currentKeyframe;
			currentKeyframe = keyframe;

			// console.log( mesh.morphTargetInfluences );

		}

		mesh.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
		mesh.morphTargetInfluences[ lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];

	}
	renderer.render(mainScene, mainCamera);
}