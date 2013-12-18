/**
 * keyinput.js
 * 
 * This file is in charge of gather and distributing 
 * keyinput from the user. 
 * 
 * @author Serj Kazar
 */

$(".add").click(function(){ 
	addToTower(50);
});
$(".add2").click(function(){ 
	addToTower(100);
});
$(".item1").click(function(){ 
	spawn();
});
$(".addflingpiece").click(function(){ 
	addFlingPiece();
});
$(".item3").click(function(){ 
});
$(".erase").click(function(){ 
	enterDestroyMode();
});

$("#gameCanvas").on("mousemove", function(event) {
    if (leftClick == 1) {	
    	var x=event.clientX;
    	var y=event.clientY;
    	
    	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
    	var divTop = rect.top;
    	var divRight = rect.right;
    	var divBottom = rect.bottom;
    	var divLeft = rect.left;
    	
    	var xPosInDiv = (x-divLeft);
    	var yPosInDiv = (y-divTop);
    	
    	var xPosScene = xPosInDiv - 250;
    	var yPosScene = 250 - yPosInDiv;
    	
    	onLeftMouseMove(xPosScene,yPosScene);
    	//console.log('Div content clicked: '+xPosInDiv+' '+yPosInDiv);
    	
        //document.getElementById('gameCanvas').innerHTML="clicked";
        document.getElementById('gameCanvas').focus();
    }
    else if(rightClick == 1){
    	var x=event.clientX;
    	var y=event.clientY;
    	
    	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
    	var divTop = rect.top;
    	var divRight = rect.right;
    	var divBottom = rect.bottom;
    	var divLeft = rect.left;
    	
    	var xPosInDiv = (x-divLeft);
    	var yPosInDiv = (y-divTop);
    	
    	var xPosScene = xPosInDiv - (DIV_WIDTH/2);
    	var yPosScene = (DIV_WIDTH/2) - yPosInDiv;
    	
    	onRightMouseMove(xPosScene,yPosScene);
    }
    else{
    	onMouseHover(event);
    }
});

var leftClick = 0;
var rightClick = 0;
$("#gameCanvas").on("mouseup", function(event) {
	leftClick = 0;
	rightClick = 0;
	// Reset camera movement
	if(event.which == 3){
    	lastX = -1;
    	lastY = -1;
    }
});
$( "#gameCanvas" ).mousedown(function(event) {
	if(event.which == 1){
		onLeftClick(event);
		leftClick = 1;
		rightClick = 0;
	}
	else if(event.which == 3){
		leftClick = 0;
		rightClick = 1;
	}
});

/* Used to disable right click context menu */
function onRightClick(event){
	var x=event.clientX;
	var y=event.clientY;
	
	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
	var divTop = rect.top;
	var divRight = rect.right;
	var divBottom = rect.bottom;
	var divLeft = rect.left;
	
	var xPosInDiv = (x-divLeft);
	var yPosInDiv = (y-divTop);
	
	checkTowerRightClick(xPosInDiv,yPosInDiv);
	return false;
}
function onLeftClick(event){
	//event = event || window.event //For IE
	var x=event.clientX;
	var y=event.clientY;
	
	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
	var divTop = rect.top;
	var divRight = rect.right;
	var divBottom = rect.bottom;
	var divLeft = rect.left;
	
	var xPosInDiv = (x-divLeft);
	var yPosInDiv = (y-divTop);
	
	checkTowerLeftClick(xPosInDiv,yPosInDiv);
}

function onLeftMouseMove(xPosScene,yPosScene){
	//moveCubes(xPosScene,yPosScene);
}
function onRightMouseMove(xPosScene,yPosScene){
	updateCameraOnRightMouseMove(xPosScene,yPosScene);
}

function onMouseHover(event){
	var x=event.clientX;
	var y=event.clientY;
	
	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
	var divTop = rect.top;
	var divRight = rect.right;
	var divBottom = rect.bottom;
	var divLeft = rect.left;
	
	var xPosInDiv = (x-divLeft);
	var yPosInDiv = (y-divTop);
	
	checkTowerHover(xPosInDiv,yPosInDiv);
}
function onKeypressDiv(){	
	console.log('Pressed a key when gameContent had focus!');    
}
function onKeypressDoc(){
	console.log('Pressed a key!');    
}

/* Install event handlers */
//document.getElementById('gameCanvas').onmousemove=onMouseHover;
//document.getElementById('gameCanvas').addEventListener("click", onLeftClick, false);
document.getElementById('gameCanvas').oncontextmenu=onRightClick; // Used to disable context - must be done through jscript not jquery
document.getElementById('gameCanvas').addEventListener("keypress", onKeypressDiv, false);
document.addEventListener("keypress", onKeypressDoc, false);
