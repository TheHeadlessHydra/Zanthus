
var 
SCREEN_WIDTH = window.innerWidth, 
SCREEN_HEIGHT = window.innerHeight, 
SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2, 
SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var DIV_WIDTH = 500;
var DIV_HEIGHT = 500;

init();
animate();

var cube;
var renderer;
var geometry;

function init() {

	/**							*
	 * 			CAMERA   		*
	 * 			  &				*
	 *          SCENE           *
	 */
	mainCamera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	//mainCamera = new THREE.OrthographicCamera( 500 / - 2, 500 / 2, 500 / 2, 500 / - 2, 1, 1000 );
	mainCamera.position.z = 450;
	mainScene = new THREE.Scene();
	mainScene.add( mainCamera );
	
	blankCamera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	blankScene = new THREE.Scene();
	blankScene.add( blankCamera );


	/**							*
	 * 			RENDERER		*
	 * 							*
	 */
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	document.getElementById('gameCanvas').appendChild(renderer.domElement);
	renderer.autoClear = false;
	renderer.setSize(DIV_WIDTH, DIV_HEIGHT);
	
	// attach the render-supplied DOM element (the gameCanvas)
	var c = document.getElementById("gameCanvas");
	c.appendChild(renderer.domElement);

	// The performance monitor for FPS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById('gameCanvas').appendChild(stats.domElement);

	 
	//  Create the object
	geometry = new THREE.CubeGeometry(111,111,111);
	var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	mainScene.add( cube );
	

	
	// Create the light
	var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    mainScene.add(directionalLight);

}

function animate() {

	requestAnimationFrame(animate);

	update();
	render();
	stats.update();
}

function animateBlank() {

	requestAnimationFrame(animateBlank);

	update();
	renderBlank();
	stats.update();
}

function update() {
	cube.rotation.y += 0.01;
}

function render() {
	
	renderer.render(mainScene, mainCamera);
}
function renderBlank() {
	
	renderer.render(blankScene, mainCamera);
}