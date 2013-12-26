

var animationList = []; /* Tracks the animations currently being played */

function updateAnimations(){
	for(var i = 0; i < animationList.length; i++){
		if(towerList[animationList[i].towerArrayPosition].type == TOWER_FLING){
			flingpiece_animation(animationList[i]);
		}
	}
}

///////////////////////////////////////////////////////////////////////////
//
// Flingpiece

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
	console.log("Animation");
	flingPiece.padTimer++;
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
