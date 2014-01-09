/**
 * loader.js
 * 
 * This file will load all the meshes needed to begin the game, and trigger the 
 * start of the game once loading is complete. 
 * 
 * @author Serj Kazar
 */

//////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Loaders
var totalMeshesToLoad = 6;
var currentMeshNumber = 0;

var flingpiece_mesh;
var flingpiece_height = 321.697;
var flingpiece_materials;
var flingpiece_cost = 200;

var basepiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var basepiece_height = 284.72;

var toppiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var topPiece_crystalheight = 129.313;

var groundplane_mesh; /* The flingpiece mesh that should be cloned to place. */

var turtle_mesh;
var turtle_materials;

var bgmountains_mesh;
var bgPlane;

/**
 * Load all the various JSON objects that is needed in the scene.
 */
function load_assets(){
	document.getElementById( "progress" ).style.display = "block";
	document.getElementById( "gameovermessage" ).style.display = "none";
	
	var loader = new THREE.JSONLoader( true );
	loader.callbackProgress = callbackProgress;
	loader.loadAjaxJSON(
            loader,
            "../models/flingpiece.js",
            meshloader("flingpiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/basepiece.js",
            meshloader("basepiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/toppiece.js",
            meshloader("toppiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/groundplane.js",
            meshloader("groundplane"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/climber.js",
            meshloader("turtle"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/mountainline.js",
            meshloader("mountainline"),
            "../models/textures",
            callbackProgress
            );
}

/**
 * Currently unused progress function. Since each mesh has to be loaded
 * separately and asynchronously, it is currently not ideal to use
 * a function of this nature, as the bar will not properly represent update
 * progress. In the future, it would be best to utilize this information
 * to more accurately represent how far loaded the scene is. 
 */
function callbackProgress( progress, result ) {
	return;
	var bar = 250;
	if ( progress.total ){
		bar = Math.floor( bar * progress.loaded / progress.total );
	}
	var curBarWidth = document.getElementById( "bar" ).style.width;
	document.getElementById( "bar" ).style.width = bar + "px";
}

/**
 * The meshloader function will load the various meshes that are required in the entire scene
 * @param fileName: The filename specifies which mesh is being loaded. 
 * @returns {Function}
 */
function meshloader(fileName){
	return function(geometry, materials){
		if(fileName == "basepiece"){
			basepiece_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		else if(fileName == "toppiece"){
			crystalmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		else if(fileName == "groundplane"){
			groundplane_mesh = new THREE.Mesh( geometry,  new THREE.MeshFaceMaterial( materials ));
		}
		else if(fileName == "flingpiece"){
			for(var i = 0; i < materials.length; i++){
				materials[i].morphTargets = true;
			}
			flingpiece_materials = materials;
			flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		else if(fileName == "turtle"){
			for(var i = 0; i < materials.length; i++){
				materials[i].morphTargets = true;
			}
			turtle_materials = materials;
			turtle_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
			turtle_mesh.scale.set(0.1,0.1,0.1);
		}
		else if(fileName == "mountainline"){
			for(var i = 0; i < materials.length; i++){
				materials[i].transparent = true;
			}
			bgmountains_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		meshLoaded(); // Once complete, indicate that the mesh has been fully loaded. 
	}
}
/**
 * Handles all updates that should happen once a mesh has been loaded
 * into the scene. 
 */
function meshLoaded(){
	console.log("A mesh has been loaded into the scene!");
	currentMeshNumber++;
	/* Update progress bar to indicate a mesh has been loaded*/
	var bar = 250;
	bar = Math.floor( bar * currentMeshNumber / totalMeshesToLoad );
	document.getElementById( "bar" ).style.width = bar + "px";
	
	/* If all meshes have been loaded, begin the game */
	if(currentMeshNumber == totalMeshesToLoad){
		document.getElementById( "message" ).style.display = "none";
		document.getElementById( "progressbar" ).style.display = "none";
		startGame();
	}
	var bar = 250;
	bar = Math.floor( bar * currentMeshNumber / totalMeshesToLoad );
	document.getElementById( "bar" ).style.width = bar + "px";
}

/**
 * Initialization function that adds the various meshes into the scene. 
 */
function initBaseMeshes(){
	addBaseMeshToTower(basepiece_mesh,basepiece_height);
	addStaticMeshToTower(crystalmesh);
	addStaticMeshToScene(groundplane_mesh);
	addStaticMeshToScene(bgmountains_mesh);	


	/* Background colour - check camera.js, the background moves with the camera */
	bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000, 1, 1), new THREE.MeshLambertMaterial( { color: 0xf2d7b2 } ));
	bgPlane.material.side = THREE.DoubleSide;
	bgPlane.position.set(0,0,-7000);
	mainScene.add(bgPlane);
}