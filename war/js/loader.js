//////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Loaders
var totalMeshesToLoad = 3;
var currentMeshNumber = 0;

var flingpiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var flingpiece_height = 321.697;
var flingpiece_cost = 200;

var basepiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var basepiece_height = 284.72;

var toppiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var topPiece_crystalheight = 129.313;

var groundplane_mesh; /* The flingpiece mesh that should be cloned to place. */

function load_assets(){
	document.getElementById( "progress" ).style.display = "block";

	var loader = new THREE.JSONLoader( true );
	loader.callbackProgress = callbackProgress;
	loader.loadAjaxJSON(
            loader,
            "../models/fling_piece.js",
            meshloader("flingpiece"),
            false,
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/base_piece.js",
            meshloader("basepiece"),
            false,
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/top_piece.js",
            meshloader("toppiece"),
            false,
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/groundplane.js",
            meshloader("groundplane"),
            false,
            callbackProgress
            );
}

function globalProgress(bar){
	var bar = 250;
	var perBar = bar/totalMeshesToLoad;
}
function callbackProgress( progress, result ) {
	var bar = 250;
	if ( progress.total ){
		bar = Math.floor( bar * progress.loaded / progress.total );
	}
	var curBarWidth = document.getElementById( "bar" ).style.width;
	//var toadd = (curBarWidth + (bar/totalMeshesToLoad));
	//curBarWidth/totalMeshesToLoad-bar/totalMeshesToLoad
	//console.log("ITS: "+toadd);
	//document.getElementById( "bar" ).style.width = curBarWidth + (bar/totalMeshesToLoad) + "px";
	document.getElementById( "bar" ).style.width = bar + "px";
}

function meshloader(fileName){
	return function(geometry){
		console.log("A mesh has been loaded into the scene!");
		if(fileName == "basepiece"){
			basepiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
		}
		else if(fileName == "toppiece"){
			toppiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
		}
		else if(fileName == "groundplane"){
			groundplane_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
		}
		else if(fileName == "flingpiece"){
			flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
		}
		meshLoaded();
	}
}
function meshLoaded(){
	currentMeshNumber++;
	if(currentMeshNumber == totalMeshesToLoad){
		document.getElementById( "message" ).style.display = "none";
		document.getElementById( "progressbar" ).style.display = "none";
		startGame();
	}
}

function initBaseMeshes(){
	var basePiece = new THREE.Mesh(basepiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	addBaseMeshToTower(basePiece,basepiece_height);
	
	crystalmesh = new THREE.Mesh(toppiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	addStaticMeshToTower(crystalmesh);
	
	var groundplane = new THREE.Mesh(groundplane_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	addStaticMeshToScene(groundplane);
}