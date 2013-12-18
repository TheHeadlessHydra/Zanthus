/**
 * init.js
 * 
 * This is the initialization function for the main scene.
 * It is in charge of setting up the camera,
 * the lights, and the background of the scene. 
 * 
 * @author Serj Kazar
 */

var 
SCREEN_WIDTH = window.innerWidth, 
SCREEN_HEIGHT = window.innerHeight, 
SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2, 
SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var DIV_WIDTH = 1000;
var DIV_HEIGHT = 600;

var mainScene;
var mainCamera;

var renderId;

function init() {

	/**							*
	 * 			CAMERA   		*
	 * 			  &				*
	 *          SCENE           *
	 */
	mainCamera = new THREE.PerspectiveCamera(25, DIV_WIDTH / DIV_HEIGHT, 1,10000);
	//mainCamera = new THREE.OrthographicCamera( 500 / - 2, 500 / 2, 500 / 2, 500 / - 2, 1, 1000 );
	mainCamera.position.z = 2200;
	mainCamera.position.y = 350;
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

	/* Create the ground plane */
	var geometry = new THREE.PlaneGeometry(2000,1000,50,50);
	var material = new THREE.MeshLambertMaterial( { color: 0xa74040 } );
	var groundPlane = new THREE.Mesh( geometry, material );
	groundPlane.rotation.x=-1.57079633;
	groundPlane.position.z=-50;
	//mainScene.add(groundPlane);
	
	// Create the lights
	var directionalLight = new THREE.HemisphereLight( 0x404040,0xffffff,2 );
    directionalLight.position.set(1, 1, 1).normalize();
    mainScene.add(directionalLight);

    // Load meshes
    load_assets();
}
