/**
 * animation.js
 * 
 * This file handles all animations currently available in the game. 
 * 
 * @author Serj Kazar
 */

var animationList = []; /* Tracks the animations currently being played */

/**
 * Constantly check what is animating and update their morph targets by calling
 * their respective animation functions
 */
function updateAnimations(){
	for(var i = 0; i < animationList.length; i++){
		if(animationList[i].meshType == "turtle"){
			turtle_animation(animationList[i]);
		}
		else if(animationList[i].meshType == "flingpiece"){
			flingpiece_animation(animationList[i]);
		}
	}
}

/**
 * Remove a mesh from the animation list, thereby killing their animations.
 * @param mesh: The mesh to remove. 
 */
function killAnimation(mesh){
	var animationPosition = animationList.indexOf(mesh);
	if(animationPosition != -1){
		animationList.splice(animationPosition,1);
	}
	return;
}
///////////////////////////////////////////////////////////////////////////
//
// Flingpiece

/**
 * To start an animation for a flingpiece, this function should be called. 
 */
function flingpiece_animate(flingPiece){
	flingpiece_activate(flingPiece);
}
/**
 * Activates the mesh, making it ready for and thereby beginning, its animations.
 */
function flingpiece_activate(flingPiece){
	flingPiece.meshType = "flingpiece";
	
	flingPiece.speed = 2;           /* Slows down the animation the higher it goes. 1 = Regular speed, 2 = 2x slower, etc */
	flingPiece.padTimer = 0;        /* Internal variable to slow down animation*/
	flingPiece.keyframes = 159;     /* Total amount of keyframes in the animation */
	flingPiece.lastKeyframe = 0;    /* Used to track the last played frame */
	flingPiece.currentKeyframe = 0; /* Used to track the currently playing frame */
	
	animationList.push(flingPiece);
	
	var botY = flingPiece.position.y;
	var topY = botY + flingpiece_height;
	var shouldBeDead = [];
	for(var i = 0; i < climberMeshArray.length; i++){
		if( (climberMeshArray[i].position.y > botY && climberMeshArray[i].position.y < topY) ||
			(climberMeshArray[i].position.y+turtleHeight > botY && climberMeshArray[i].position.y+turtleHeight < topY)	){
			shouldBeDead.push(i);
		}
	}
	/* Must be removed backwards from the list to avoid kill problems 
	 * with multiple deaths due to splicing of the array */
	for(var i = (shouldBeDead.length-1); i >= 0; i--){
		killClimber(climberMeshArray[shouldBeDead[i]]);
	}
}
/**
 * Applies the next morph targets in the animation, and checks if
 * the full animation has played and kills it if it has. 
 * @param flingPiece: Mesh to be animated.
 */
function flingpiece_animation(flingPiece) {
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
		killAnimation(flingPiece);
		return;
	}
	flingPiece.morphTargetInfluences[ flingPiece.lastKeyframe ] = 0;
	flingPiece.morphTargetInfluences[ flingPiece.currentKeyframe ] = 1;
	flingPiece.lastKeyframe = flingPiece.currentKeyframe;
}

/**
 * Use this to begin a turtle enemy AI. 
 */
function turtle_animate(turtle){
	turtle_activate(turtle,"walk");
}

/**
 * Activates a turtle mesh and begins its animation. 
 * TODO: --If the mesh was already animating, it creates a smooth transition from the previous animation to the next one.--
 * @param turtle - Mesh that must begin animations.
 * @param animType - Type of animation to play. Turtle supports three types:
 * 					 1) Walk cycle: 					"walk"
 * 					 2) Transition from walk to climb: 	"walktoclimb"
 * 					 3) Climb cycle:					"climb"
 */
function turtle_activate(turtle, animType){
	turtle.meshType = "turtle";
	
	if(typeof turtle.animType != 'undefined'){
		turtle.prevAnimType = turtle.animType;
	}
	turtle.animType = animType;
	turtle.speed = 2;           /* Slows down the animation the higher it goes. 1 = Regular speed, 2 = 2x slower, etc */
	turtle.padTimer = 0;        /* Internal variable to slow down animation*/
	
	if(animType == "walk"){
		turtle.keyframes = 47;     /* Total amount of keyframes in the animation */
		turtle.startFrame = 1;     /* Track the beginning of the animation in the frameset */
		turtle.endFrame = 48;       /* Track the end of the animation in the frameset */
		turtle.lastKeyframe = 1;    /* Used to track the last played frame */
		turtle.currentKeyframe = 1; /* Used to track the currently playing frame */
	}
	else if(animType == "walktoclimb"){
		turtle.keyframes = 103;     /* Total amount of keyframes in the animation */
		turtle.startFrame = 48;     /* Track the beginning of the animation in the frameset */
		turtle.endFrame = 151;       /* Track the end of the animation in the frameset */
		turtle.lastKeyframe = 48;    /* Used to track the last played frame */
		turtle.currentKeyframe = 48; /* Used to track the currently playing frame */
	}
	else if(animType == "climb"){
		turtle.speed = 1;
		turtle.keyframes = 108;     /* Total amount of keyframes in the animation */
		turtle.startFrame = 151;     /* Track the beginning of the animation in the frameset */
		turtle.endFrame = 259;       /* Track the end of the animation in the frameset */
		turtle.lastKeyframe = 151;    /* Used to track the last played frame */
		turtle.currentKeyframe = 151; /* Used to track the currently playing frame */
	}
	else{
		console.log("Unkown turtle animation type:  "+type);
		return;
	}
	
	animationList.push(turtle);
}
function turtle_deactivate(turtle){
	turtle.currentKeyframe = 0;
	var animationPosition = animationList.indexOf(turtle);
	animationList.splice(animationPosition,1);
	return;
}
function turtle_animation(turtle){
	if(typeof turtle != 'undefined'){
		/* pad the timer to slow down the animation*/
		turtle.padTimer++;
		if(turtle.padTimer == turtle.speed){
			turtle.padTimer = 0;
		}
		else{
			return;
		}
		
		
		if(turtle.animType == "walk"){
			turtle.currentKeyframe++;
			if(turtle.currentKeyframe > turtle.endFrame){
				/* Cycle the animation */
				turtle.currentKeyframe = turtle.startFrame;
			}
			turtle.morphTargetInfluences[ turtle.lastKeyframe ] = 0;
			turtle.morphTargetInfluences[ turtle.currentKeyframe ] = 1;
			turtle.lastKeyframe = turtle.currentKeyframe;

			/* Move the turtle to the left */
			turtle.position.x = turtle.position.x - 1;
			if(turtle.position.x < WHERETOCLIMB ){
				killAnimation(turtle);
				turtle_activate(turtle,"walktoclimb");
				return;
			}
		}
		else if(turtle.animType == "walktoclimb"){
			turtle.currentKeyframe++;
			if(turtle.currentKeyframe > turtle.endFrame){
				/* Animation is over - switch to climb animation */
				killAnimation(turtle);
				turtle_activate(turtle,"climb");
				return;
			}
			turtle.morphTargetInfluences[ turtle.lastKeyframe ] = 0;
			turtle.morphTargetInfluences[ turtle.currentKeyframe ] = 1;
			turtle.lastKeyframe = turtle.currentKeyframe;
		}
		else if(turtle.animType == "climb"){
			turtle.currentKeyframe++;
			if(turtle.currentKeyframe > turtle.endFrame){
				/* Cycle the animation */
				turtle.currentKeyframe = turtle.startFrame;
			}
			turtle.morphTargetInfluences[ turtle.lastKeyframe ] = 0;
			turtle.morphTargetInfluences[ turtle.currentKeyframe ] = 1;
			turtle.lastKeyframe = turtle.currentKeyframe;
			
			turtle.position.y = turtle.position.y + 1;
			//if(turtle.currentKeyframe > 208 && turtle.currentKeyframe < 220){
			//	turtle.position.y = turtle.position.y + 3;
			//}
			if(turtle.position.y > currentTowerHeight+topPiece_crystalheight){
				gameOver();
			}
		}
		else{
			console.log("Unkown turtle animation type:  "+type);
			return;
		}
	}
}
