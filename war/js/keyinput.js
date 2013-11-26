

$(".item").click(function(){
	stopAnimate();
});

$("#gameCanvas").on("mousemove", function(e) {
    if (e.which == 1) {
    	
    	startAnimate();
    	
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
    	
    	cube.position.set(xPosScene,yPosScene,-50);
    	console.log('Div content clicked: '+xPosInDiv+' '+yPosInDiv);
    	
        //document.getElementById('gameCanvas').innerHTML="clicked";
        document.getElementById('gameCanvas').focus();
    }
});


function onClick()
{
}

//this handler is never called
function onKeypressDiv()
{	
	console.log('Pressed a key when gameContent had focus!');    
}

function onKeypressDoc()
{
}

function removeEntity() {
    stopAnimate();
}

//install event handlers
//document.getElementById('item').addEventListener("click", removeEntity, false);

document.getElementById('gameCanvas').addEventListener("click", onClick, false);
document.getElementById('gameCanvas').addEventListener("keypress", onKeypressDiv, false);
document.addEventListener("keypress", onKeypressDoc, false);