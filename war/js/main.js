
var 
SCREEN_WIDTH = window.innerWidth, 
SCREEN_HEIGHT = window.innerHeight, 
SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2, 
SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

init();
animate();

var cube;

function init() {

	mainCamera = new THREE.PerspectiveCamera(75, 500 / 500, 1,10000);
	mainCamera.position.z = 450;
	mainScene = new THREE.Scene();
	mainScene.add( mainCamera );

	/**							*
	 * 			RENDERER		*
	 * 							*
	 */
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	document.getElementById('gameCanvas').appendChild(renderer.domElement);
	renderer.autoClear = false;
	renderer.setSize(500, 500);

	
	
	//document.addEventListener('mousemove', onDocumentMouseMove, false);
	//document.body.appendChild(renderer.domElement);
	
	// attach the render-supplied DOM element (the gameCanvas)
	var c = document.getElementById("gameCanvas");
	c.appendChild(renderer.domElement);

	// The performance monitor for FPS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById('gameCanvas').appendChild(stats.domElement);

	//window.addEventListener('resize', onWindowResize, false);
	
	
	// set up the sphere vars
	// lower 'segment' and 'ring' values will increase performance
	var radius = 5,
	segments = 6,
	rings = 6;
	 
	var geometry = new THREE.CubeGeometry(111,111,111);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	mainScene.add( cube );

}

function animate() {

	requestAnimationFrame(animate);

	update();
	render();
	stats.update();
}

function update() {
	cube.rotation.y += 0.01;
}

function render() {
	
	renderer.render(mainScene, mainCamera);
}