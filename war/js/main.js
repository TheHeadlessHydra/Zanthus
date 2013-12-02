
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
var blankCube;
var blankCubeInScene = 0;
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
	
	cube3Camera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	cube3Camera.position.z = 450;
	cube3Scene = new THREE.Scene();
	cube3Scene.add( cube3Camera );
	
	cube4Camera = new THREE.PerspectiveCamera(50, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	cube4Camera.position.z = 450;
	cube4Scene = new THREE.Scene();
	cube4Scene.add( cube4Camera );


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
	
	geometry = new THREE.CubeGeometry(200,100,50);
	material = new THREE.MeshLambertMaterial( { color: 0xf0ff00 } );
	wall = new THREE.Mesh( geometry, material );
	wall.position.set(0,0-100,0);
	mainScene.add( wall );
	//collidableMeshList.push(wall);
	
	
	geometry = new THREE.CubeGeometry(0.1,0.1,500);
	material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	blankCube = new THREE.Mesh( geometry, material );
	blankScene.add( blankCube );
	//blankCube.position.x=0;
	
	geometry3 = new THREE.CubeGeometry(111,111,111);
	material3 = new THREE.MeshLambertMaterial( { color: 0x32a7b1 } );
	cube3 = new THREE.Mesh( geometry3, material3 );
	cube3.position.x=-150;
	
	geometry4 = new THREE.CubeGeometry(111,111,111);
	material4 = new THREE.MeshLambertMaterial( { color: 0xa74040 } );
	cube4 = new THREE.Mesh( geometry4, material4 );
	cube4.position.x=150;
	
	// Create the light
	var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    mainScene.add(directionalLight);
    
    var directionalLight3 = new THREE.DirectionalLight(0xffffff);
    directionalLight3.position.set(1, 1, 1).normalize();
    cube3Scene.add(directionalLight3);
    
    var directionalLight4 = new THREE.DirectionalLight(0xffffff);
    directionalLight4.position.set(1, 1, 1).normalize();
    cube4Scene.add(directionalLight4);

}

function animate() {
	//console.log("animate");
	requestAnimationFrame(animate);
	update();
	render();
	stats.update();
}
function animateOne(){
	if(cubeInScene == 0){
		cubeInScene = 1;
		mainScene.add( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		cube3Scene.remove( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 1){
		cube4InScene = 0;
		cube4Scene.remove( cube4 );
		mainCubeToMove = cube4;
	}
	animateBlank();
}
function animateTwo(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 0){
		cube3InScene = 1;
		cube3Scene.add( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 1){
		cube4InScene = 0;
		cube4Scene.remove( cube4 );
		mainCubeToMove = cube4;
	}
	animateBlank();
}
function animateThree(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		cube3Scene.remove( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 0){
		cube4InScene = 1;
		cube4Scene.add( cube4 );
		mainCubeToMove = cube4;
	}
	animateBlank();
}

function update() {

	var collidableMeshList = [wall];
	
	for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
	{       
	    var localVertex = cube.geometry.vertices[vertexIndex].clone();
	    var globalVertex = cube.matrix.multiplyVector3(localVertex);
	    var directionVector = globalVertex.sub( cube.position );

	    var ray = new THREE.Raycaster( cube.position, directionVector.clone().normalize() );
	    var collisionResults = ray.intersectObjects( collidableMeshList );
	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	console.log("COLLIDE!");
	    }
	}
	
	//console.log('update');
	cube.rotation.y += 0.01;
	cube3.rotation.y += 0.01;
	cube4.rotation.y += 0.01;
}
function render() {
	renderer.render(mainScene, mainCamera);
	renderer.render(blankScene, blankCamera);
	renderer.render(cube3Scene, cube3Camera);
	renderer.render(cube4Scene, cube4Camera);
}

function onMouseMove(xPosScene,yPosScene) {
	cube.position.set(xPosScene,yPosScene,-50);
	cube3.position.set(xPosScene,yPosScene,-50);
	cube4.position.set(xPosScene,yPosScene,-50);
}

function animateBlank() {
	requestAnimationFrame(animateBlank);
	renderBlank();
}
function renderBlank() {
	renderer.render(blankScene, mainCamera);
}