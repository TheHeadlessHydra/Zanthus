
var 
SCREEN_WIDTH = window.innerWidth, 
SCREEN_HEIGHT = window.innerHeight, 
SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2, 
SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var DIV_WIDTH = 800;
var DIV_HEIGHT = 600;

init();
animate();

var cube;
var cubeInScene = 1;
var cube3;
var cube3InScene = 0;
var cube4;
var cube4InScene = 0;

var mainCubeToMove = cube;
var mainScene;
var mainCamera;

function init() {

	/**							*
	 * 			CAMERA   		*
	 * 			  &				*
	 *          SCENE           *
	 */
	mainCamera = new THREE.PerspectiveCamera(80, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	//mainCamera = new THREE.OrthographicCamera( 500 / - 2, 500 / 2, 500 / 2, 500 / - 2, 1, 1000 );
	mainCamera.position.z = 1000;
	mainCamera.position.y = 500;
	//mainCamera.rotation.x = -0.2;
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
	wall.position.set(0,-300,0);
	mainScene.add( wall );
	//collidableMeshList.push(wall);
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0x32a7b1 } );
	cube3 = new THREE.Mesh( geometry, material );
	cube3.position.x=-150;
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0xa74040 } );
	cube4 = new THREE.Mesh( geometry, material );
	cube4.position.x=150;
	
	geometry = new THREE.PlaneGeometry(2000,1000,50,50);
	material = new THREE.MeshLambertMaterial( { color: 0xa74040 } );
	groundPlane = new THREE.Mesh( geometry, material );
	groundPlane.rotation.x=80;
	groundPlane.position.z=-50;
	mainScene.add(groundPlane);
	
	// Create the lights
	var directionalLight = new THREE.HemisphereLight( 0x404040,0xffffff,2 );
    directionalLight.position.set(1, 1, 1).normalize();
    mainScene.add(directionalLight);

}

function animateOne(){
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
	if(cube4InScene == 1){
		cube4InScene = 0;
		mainScene.remove( cube4 );
		mainCubeToMove = cube4;
	}
}
function animateTwo(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 0){
		cube3InScene = 1;
		mainScene.add( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 1){
		cube4InScene = 0;
		mainScene.remove( cube4 );
		mainCubeToMove = cube4;
	}
}
function animateThree(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		mainScene.remove( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 0){
		cube4InScene = 1;
		mainScene.add( cube4 );
		mainCubeToMove = cube4;
	}
}

function onLeftMouseMove(xPosScene,yPosScene) {
	cube.position.set(xPosScene,yPosScene,-50);
	cube3.position.set(xPosScene,yPosScene,-50);
	cube4.position.set(xPosScene,yPosScene,-50);
}

lastX = -1;
lastY = -1;
cameraMovementSpeed = 2;
function onRightMouseMove(xPosScene,yPosScene){
	if(lastX == -1){
		lastX = xPosScene;
		lastY = yPosScene;
		return;
	}
	var xDiff = lastX-xPosScene;
	var yDiff = lastY-yPosScene;
	lastX = xPosScene;
	lastY = yPosScene;
	
	var posOrNeg = 1;
	if(yDiff < 0){
		posOrNeg = -1;
	}
	if(yDiff != 0){
		yDiff = posOrNeg*(Math.log(Math.abs(yDiff)));
	}
	
	var currentY = mainCamera.position.y;
	console.log("adding: "+yDiff);
	mainCamera.position.y = currentY + (yDiff*cameraMovementSpeed);
}
/**
 * Animation, render and update frameworks
 *
 */
function animate() {
	requestAnimationFrame(animate);
	update();
	render();
	stats.update();
}

function update() {

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
	
	cube.rotation.y += 0.01;
	cube3.rotation.y += 0.01;
	cube4.rotation.y += 0.01;
}
function render() {
	renderer.render(mainScene, mainCamera);
}