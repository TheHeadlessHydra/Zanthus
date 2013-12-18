/**
 * camera.js
 * 
 * File in charge of any camera movement calls. 
 * 
 * @author Serj Kazar
 */

lastX = -1;
lastY = -1;
cameraMovementSpeed = 15;
function updateCameraOnRightMouseMove(xPosScene,yPosScene){
	if(lastX == -1){
		lastX = xPosScene;
		lastY = yPosScene;
		return;
	}
	var xDiff = lastX-xPosScene;
	var yDiff = lastY-yPosScene;
	lastX = xPosScene;
	lastY = yPosScene;
	
	var posOrNeg = 1;
	if(yDiff < 0){
		posOrNeg = -1;
	}
	if(yDiff != 0){
		yDiff = posOrNeg*(Math.log(Math.abs(yDiff)));
	}
	
	var currentY = mainCamera.position.y;
	
	var finalPositionSet = currentY + (yDiff*cameraMovementSpeed);
	
	/* Limit the distance in y-direction the camera is allowed to traverse */
	if(finalPositionSet > 35 && finalPositionSet < currentTowerHeight+100){
		mainCamera.position.y = finalPositionSet;
	}
	
}
