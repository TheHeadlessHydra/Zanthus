var total_coins = 500;
var game_started = 0;


function gameOver(){
	console.log("Game over!");
	window.cancelAnimationFrame(renderId);
}
function startGame(){
	console.log("Start game!");
	initBaseMeshes();
	initClimbers();		/* Initializes the climber enemy type module */
	game_started = 1;
	
	setTimeout(updateWave,timeUntilNextWave);
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


/**
 * The current logic of the wave spawning works like so:
 *     - It will be done in a linear increasing fashion
 *       instead of an exponential increase. Each time the wave
 *       gets updated, it will go up linearly by the wave_constant. 
 *     - The time it takes to update the wave difficulty also goes up
 *       linearly.

 */
var timeUntilNextWave = 5000;
var waveIncrease = 5000;

var wave_constant = 5;
var curWaveCount = 5;

function updateWave(){
	console.log("Warning! Incoming wave!");
	
	for(var i = 0; i < curWaveCount; i++){
		setTimeout(spawnClimber, Math.floor((Math.random()*10000)+500));
	}
	curWaveCount += wave_constant;
	
	timeUntilNextWave += waveIncrease;
	setTimeout(updateWave,timeUntilNextWave);
}