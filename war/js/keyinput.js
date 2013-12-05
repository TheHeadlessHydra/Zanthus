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
	animateOne(); 
});
$(".item2").click(function(){ 
	animateTwo(); 
});
$(".item3").click(function(){ 
	animateThree(); 
});
$(".erase").click(function(){ 
	popFromList();
});

$("#gameCanvas").on("mousemove", function(e) {
    if (e.which == 1) {	
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
    	//cube.position.set(xPosScene,yPosScene,-50);
    	console.log('Div content clicked: '+xPosInDiv+' '+yPosInDiv);
    	
        //document.getElementById('gameCanvas').innerHTML="clicked";
        document.getElementById('gameCanvas').focus();
    }
    if(e.which == 3){
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
    	
    	onRightMouseMove(xPosScene,yPosScene);
    	console.log('Right click!');
    }
});
$("#gameCanvas").on("mouseup", function(e) {
	// Reset camera movement
    if(e.which == 3){
    	lastX = -1;
    	lastY = -1;
    }
});

/* Used to disable right click context menu */
function onRightClick(){	
	return false;
}

function onClick()
{
}
function onKeypressDiv()
{	
	console.log('Pressed a key when gameContent had focus!');    
}
function onKeypressDoc()
{	
	console.log('Pressed a key when gameContent had focus!');    
}
function onLeftMouseMove(xPosScene,yPosScene){
	moveCubes(xPosScene,yPosScene);
}
function onRightMouseMove(xPosScene,yPosScene){
	updateCameraOnRightClick(xPosScene,yPosScene);
}
//install event handlers
document.getElementById('gameCanvas').oncontextmenu=onRightClick;
document.getElementById('gameCanvas').addEventListener("click", onClick, false);
document.getElementById('gameCanvas').addEventListener("keypress", onKeypressDiv, false);
document.addEventListener("keypress", onKeypressDoc, false);