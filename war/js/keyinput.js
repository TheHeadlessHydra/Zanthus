

$("#gameCanvas").on("mousemove", function(e) {
    if (e.which == 1) {
    	
    	mainScene.add( cube );
    	animate();
    	
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
	
	/* Grab position of mouse click relative to div */
	/*
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
	
	cube.position.set(xPosScene,yPosScene,0);
	
	console.log('Div content clicked: '+xPosInDiv+' '+yPosInDiv);
	

    //document.getElementById('gameCanvas').innerHTML="clicked";
    document.getElementById('gameCanvas').focus();*/

}

//this handler is never called
function onKeypressDiv()
{	
	console.log('Pressed a key when gameContent had focus!');
    //document.getElementById('gameCanvas').innerHTML="keypress on div";
    
}

function onKeypressDoc()
{
	//console.log('2222!');
    //document.getElementById('gameCanvas').innerHTML="keypress on doc";
}

function removeEntity() {
    mainScene.remove( cube );
    //geometry.dispose();
    animateBlank();
}

//install event handlers
document.getElementById('item').addEventListener("click", removeEntity, false);

document.getElementById('gameCanvas').addEventListener("click", onClick, false);
document.getElementById('gameCanvas').addEventListener("keypress", onKeypressDiv, false);
document.addEventListener("keypress", onKeypressDoc, false);