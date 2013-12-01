
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
var cubeInScene = 1;
var cube2;
var cube2InScene = 0;
var cube3;
var cube3InScene = 0;
var cube4;
var cube4InScene = 0;

var mainCubeToMove = cube;

var requestIdAnimate;
var requestIdAnimateBlank;


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
	
	cube2Camera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	cube2Scene = new THREE.Scene();
	cube2Scene.add( cube2Camera );
	
	cube3Camera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	cube3Scene = new THREE.Scene();
	cube3Scene.add( cube3Camera );


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
	
	geometry = new THREE.CubeGeometry(0.1,0.1,500);
	material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	cube2 = new THREE.Mesh( geometry, material );
	blankScene.add( cube2 );
	//cube2.position.x=0;
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	cube3 = new THREE.Mesh( geometry, material );
	cube3.position.x=-150;
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0x125fa4 } );
	cube4 = new THREE.Mesh( geometry, material );
	cube4.position.x=150;
	
	// Create the light
	var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    mainScene.add(directionalLight);

}

function animate() {
	//console.log("animate");
	requestAnimationFrame(animate);
	update();
	render();
	stats.update();
}
function stopAnimate(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
	}
	if(cube3InScene == 0){
		cube3InScene = 1;
		mainScene.add( cube3 );
	}
	animateBlank();
}
function startAnimate(){
	if(cubeInScene == 0){
		cubeInScene = 1;
		mainScene.add( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		mainScene.remove( cube3 );
		mainCubeToMove = cube3;
	}
}
function update() {
	//console.log('update');
	cube.rotation.y += 0.01;
	cube3.rotation.y += 0.01;
}
function render() {
	renderer.render(mainScene, mainCamera);
	renderer.render(cube2Scene, cube2Camera);
	renderer.render(cube3Scene, cube3Camera);
}

function onMouseMove(xPosScene,yPosScene) {
	cube3.position.set(xPosScene,yPosScene,-50);
	cube.position.set(xPosScene,yPosScene,-50);
}

function animateBlank() {
	requestAnimationFrame(animateBlank);
	renderBlank();
}
function renderBlank() {
	renderer.render(blankScene, mainCamera);
}