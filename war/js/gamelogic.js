var total_coins = 500;

function gameOver(){
	console.log("Game over!");
	window.cancelAnimationFrame(renderId);
}
function startGame(){
	console.log("Start game!");
	initBaseMeshes();
	initClimbers();		/* Initializes the climber enemy type module */
}

function updateCoins(addOrSub){
	if(addOrSub > 0){
		total_coins += addOrSub;
		document.getElementById( "total_coins" ).innerHTML = total_coins;
		return 1;
	}
	else if(addOrSub < 0 && total_coins+addOrSub > 0){
		total_coins += addOrSub;
		document.getElementById( "total_coins" ).innerHTML = total_coins;
		return 1;
	}
	else{
		return 0;
	}
}