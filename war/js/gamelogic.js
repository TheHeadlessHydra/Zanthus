var total_coins = 500;
var game_started = 0;


function gameOver(){
	console.log("Game over!");
	document.getElementById( "gameovermessage" ).style.display = "block";
	window.cancelAnimationFrame(renderId);
}
function reset(){
	
}
function startGame(){
	console.log("Start game!");
	initBaseMeshes();
	initClimbers();		/* Initializes the climber enemy type module */
	game_started = 1;
	
	updateCoins(0);
	setTimeout(updateWave,timeUntilNextWave);
}

function updateCoins(addOrSub){
	if(addOrSub > 0){
		total_coins += addOrSub;
		document.getElementById( "total_coins" ).innerHTML = total_coins;
		return 1;
	}
	else if(addOrSub < 0 && total_coins+addOrSub >= 0){
		total_coins += addOrSub;
		document.getElementById( "total_coins" ).innerHTML = total_coins;
		return 1;
	}
	else{
		document.getElementById( "total_coins" ).innerHTML = total_coins;
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
var waveTimeMax = 30000;
var timeUntilNextWave = 10000;
var waveIncrease = 5000;

var wave_max = 20;
var wave_constant = 3;
var curWaveCount = 5;
/*
function updateWave(){
	console.log("Warning! Incoming wave!");
	
	for(var i = 0; i < curWaveCount; i++){
		//setTimeout(spawnClimber, Math.floor((Math.random()*10000)+500));
		setTimeout(spawnTurtle, Math.floor((Math.random()*10000)+500));
	}
	curWaveCount += wave_constant;
	
	timeUntilNextWave += waveIncrease;
	setTimeout(updateWave,timeUntilNextWave);
}*/
function updateWave(){
	console.log("Warning! Incoming wave!");
	
	for(var i = 0; i < curWaveCount; i++){
		//setTimeout(spawnClimber, Math.floor((Math.random()*10000)+500));
		setTimeout(spawnTurtle, Math.floor((Math.random()*timeUntilNextWave)+500));
	}
	curWaveCount += wave_constant;
	if(curWaveCount > wave_max){
		curWaveCount = wave_max;
	}
	
	timeUntilNextWave += waveIncrease;
	if(timeUntilNextWave > waveTimeMax){
		timeUntilNextWave = waveTimeMax;
	}
	
	
	setTimeout(updateWave,timeUntilNextWave);
}