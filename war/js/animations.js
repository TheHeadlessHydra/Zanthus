

var animationList = []; /* Tracks the animations currently being played */


function updateAnimations(){
	for(var i = 0; i < animationList.length; i++){
		if(towerList[animationList[i].towerArrayPosition].type == TOWER_FLING){
			flingpiece_animation(animationList[i]);
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Loaders
var totalMeshesToLoad = 3;
var currentMeshNumber = 0;

var flingpiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var flingpiece_height = 321.697;

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

function addFlingPiece(){
	var newPiece = new THREE.Mesh(flingpiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
	addMeshToTower(newPiece,flingpiece_height);
}


///////////////////////////////////////////////////////////////////////////
//
// Flingpiece animations
function flingpiece_activate(flingPiece){
	flingPiece.speed = 2;           /* Slows down the animation the higher it goes. 1 = Regular speed, 2 = 2x slower, etc */
	flingPiece.padTimer = 0;        /* Internal variable to slow down animation*/
	flingPiece.keyframes = 170;     /* Total amount of keyframes in the animation */
	flingPiece.lastKeyframe = 0;    /* Used to track the last played frame */
	flingPiece.currentKeyframe = 0; /* Used to track the currently playing frame */
	
	animationList.push(flingPiece);
	
	var botY = flingPiece.position.y;
	var topY = botY + flingpiece_height;
	var shouldBeDead = [];
	for(var i = 0; i < climberMeshArray.length; i++){
		if(climberMeshArray[i].position.y > botY && climberMeshArray[i].position.y < topY){
			shouldBeDead.push(i);
		}
	}
	/* Must be removed backwards from the list to avoid kill problems 
	 * with multiple deaths due to splicing of the array */
	for(var i = (shouldBeDead.length-1); i >= 0; i--){
		killClimber(climberMeshArray[shouldBeDead[i]]);
	}
}
function flingpiece_animation(flingPiece) {
	flingPiece.padTimer++
	if(flingPiece.padTimer == flingPiece.speed){
		flingPiece.padTimer = 0;
	}
	else{
		return;
	}
	flingPiece.currentKeyframe++;
	if(flingPiece.currentKeyframe > flingPiece.keyframes){
		/* Animation is over */
		var animationPosition = animationList.indexOf(flingPiece);
		animationList.splice(animationPosition,1);
		return;
	}
	flingPiece.morphTargetInfluences[ flingPiece.lastKeyframe ] = 0;
	flingPiece.morphTargetInfluences[ flingPiece.currentKeyframe ] = 1;
	flingPiece.lastKeyframe = flingPiece.currentKeyframe;
}
