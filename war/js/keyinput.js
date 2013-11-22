

//KeyboardJS.on('a', function() {
//	if ($("#gameCanvas").is(":focus")){return;};
//    console.log('you pressed a!');
//});


function onClick()
{
	/* Grab position of mouse click relative to div */
	var x=event.clientX;
	var y=event.clientY;
	
	var rect = document.getElementById('gameCanvas').getBoundingClientRect();
	var divTop = rect.top;
	var divRight = rect.right;
	var divBottom = rect.bottom;
	var divLeft = rect.left;
	
	var xPosInDiv = (x-divLeft);
	var yPosInDiv = (y-divTop);
	
	console.log('Div content clicked: '+xPosInDiv+' '+yPosInDiv);
	

    //document.getElementById('gameCanvas').innerHTML="clicked";
    document.getElementById('gameCanvas').focus();

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

//install event handlers
document.getElementById('gameCanvas').addEventListener("click", onClick, false);
document.getElementById('gameCanvas').addEventListener("keypress", onKeypressDiv, false);
document.addEventListener("keypress", onKeypressDoc, false);