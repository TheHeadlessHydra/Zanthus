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
//initCubeSwap();		/* Initializes the test cubeswap module  */

animate();			/* Begins the render loop */

/**
 * Animation, render and update frameworks
 *
 */
function animate() {
	renderId = requestAnimationFrame(animate);
	
	/* Update the various modules */
	update();
	updateAnimations();
	updateClimbers(); /* Updates related to the climber enemy type */
	//updateCubeSwap(); /* Updates related to the test cubeswap system*/
	stats.update();
	
	render();
}

function update() {
}
function render() {
	renderer.render(mainScene, mainCamera);
}
