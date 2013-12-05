/**
 * cubeswap.js
 * 
 * A test file that has some interesting construct about swapping cubes around. 
 * Not useful or relevant but might come in handy as a reference on how to do 
 * movement of objects in a 3D scene based on mouse movement events. 
 * 
 * @author Serj Kazar
 */

var mainCubeToMove = cube;

var cube;
var cubeInScene = 1;
var cube3;
var cube3InScene = 0;
var cube4;
var cube4InScene = 0;

function initCubeSwap(){
	geometry = new THREE.CubeGeometry(111,111,111);
	var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	mainScene.add( cube );
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0x32a7b1 } );
	cube3 = new THREE.Mesh( geometry, material );
	cube3.position.x=-150;
	
	geometry = new THREE.CubeGeometry(111,111,111);
	material = new THREE.MeshLambertMaterial( { color: 0xa74040 } );
	cube4 = new THREE.Mesh( geometry, material );
	cube4.position.x=150;
	
	geometry = new THREE.CubeGeometry(200,100,50);
	material = new THREE.MeshLambertMaterial( { color: 0xf0ff00 } );
	wall = new THREE.Mesh( geometry, material );
	wall.position.set(0,-300,0);
	mainScene.add( wall );

}

function animateOne(){
	if(cubeInScene == 0){
		cubeInScene = 1;
		mainScene.add( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		mainScene.remove( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 1){
		cube4InScene = 0;
		mainScene.remove( cube4 );
		mainCubeToMove = cube4;
	}
}
function animateTwo(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 0){
		cube3InScene = 1;
		mainScene.add( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 1){
		cube4InScene = 0;
		mainScene.remove( cube4 );
		mainCubeToMove = cube4;
	}
}
function animateThree(){
	if(cubeInScene == 1){
		cubeInScene = 0;
		mainScene.remove( cube );
		mainCubeToMove = cube;
	}
	if(cube3InScene == 1){
		cube3InScene = 0;
		mainScene.remove( cube3 );
		mainCubeToMove = cube3;
	}
	if(cube4InScene == 0){
		cube4InScene = 1;
		mainScene.add( cube4 );
		mainCubeToMove = cube4;
	}
}

function moveCubes(xPosScene,yPosScene){
	cube.position.set(xPosScene,yPosScene,-50);
	cube3.position.set(xPosScene,yPosScene,-50);
	cube4.position.set(xPosScene,yPosScene,-50);
}

function updateCubeSwap(){
	cube.rotation.y += 0.01;
	cube3.rotation.y += 0.01;
	cube4.rotation.y += 0.01;
}