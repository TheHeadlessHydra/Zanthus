

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
var totalMeshesToLoad = 2;
var currentMeshNumber = 0;

var flingpiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var flingpiece_height = 321.697;

var basepiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var basepiece_height = 284.72;

function load_assets(){
	document.getElementById( "progress" ).style.display = "block";

	var loader = new THREE.JSONLoader( true );
	loader.callbackProgress = callbackProgress;
	loader.loadAjaxJSON(
            loader,
            "../models/fling_piece.js",
            flingpieceloader("flingpiece"),
            false,
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/base_piece.js",
            basepieceloader("basepiece"),
            false,
            callbackProgress
            );
	//var loader2 = new THREE.JSONLoader( true );
	//loader2.load("../models/base_piece.js",basepieceloader("basepiece",totalMeshes));
}
function meshLoaded(){
	currentMeshNumber++;
	if(currentMeshNumber == totalMeshesToLoad){
		startGame();
	}
}
function callbackProgress( progress, result ) {
	var bar = 250,
	total = progress.totalModels + progress.totalTextures,
	loaded = progress.loadedModels + progress.loadedTextures;
	if ( progress.total )
		bar = Math.floor( bar * progress.loaded / progress.total );
	document.getElementById( "bar" ).style.width = bar + "px";
}
function flingpieceloader(fileName){
	return function(geometry){
		console.log("A mesh has been loaded into the scene!");
		document.getElementById( "message" ).style.display = "none";
		document.getElementById( "progressbar" ).style.display = "none";
		//document.getElementById( "start" ).style.display = "block";
		//document.getElementById( "start" ).className = "enabled";
		flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
		meshLoaded();
	}
}
function basepieceloader(fileName){
	return function(geometry){
		console.log("A mesh has been loaded into the scene!");
		document.getElementById( "message" ).style.display = "none";
		document.getElementById( "progressbar" ).style.display = "none";
		//document.getElementById( "start" ).style.display = "block";
		//document.getElementById( "start" ).className = "enabled";
		basepiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
		meshLoaded();
	}
}



function initBaseMeshes(){
	var basePiece = new THREE.Mesh(basepiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	addBaseMeshToTower(basePiece,basepiece_height);
}

function addFlingPiece(){
	//var newPiece = flingpiece_mesh.clone();	
	var newPiece = new THREE.Mesh(flingpiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
	addMeshToTower(newPiece,flingpiece_height);
}
function flingpiece_activate(flingPiece){
	flingPiece.speed = 2;           /* Slows down the animation the higher it goes. 1 = Regular speed, 2 = 2x slower, etc */
	flingPiece.padTimer = 0;        /* Internal variable to slow down animation*/
	flingPiece.keyframes = 170;     /* Total amount of keyframes in the animation */
	flingPiece.lastKeyframe = 0;    /* Used to track the last played frame */
	flingPiece.currentKeyframe = 0; /* Used to track the currently playing frame */
	
	animationList.push(flingPiece);
	
	var botY = flingPiece.position.y;
	var topY = botY + flingpiece_height;
	for(var i = 0; i < climberMeshArray.length; i++){
		if(climberMeshArray[i].position.y > botY && climberMeshArray[i].position.y < topY){
			killClimber(climberMeshArray[i]);
		}
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
