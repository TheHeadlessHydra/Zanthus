//////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Loaders
var totalMeshesToLoad = 4;
var currentMeshNumber = 0;

var flingpiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var flingpiece_height = 321.697;
var flingpiece_materials;
var flingpiece_cost = 200;

var basepiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var basepiece_height = 284.72;

var toppiece_mesh; /* The flingpiece mesh that should be cloned to place. */
var topPiece_crystalheight = 129.313;

var groundplane_mesh; /* The flingpiece mesh that should be cloned to place. */

function load_assets(){
	document.getElementById( "progress" ).style.display = "block";
	
	//loadGlobalTextures();
	
	var loader = new THREE.JSONLoader( true );
	loader.callbackProgress = callbackProgress;
	loader.loadAjaxJSON(
            loader,
            "../models/flingpiece.js",
            meshloader("flingpiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/basepiece.js",
            meshloader("basepiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/toppiece.js",
            meshloader("toppiece"),
            "../models/textures",
            callbackProgress
            );
	loader.loadAjaxJSON(
            loader,
            "../models/groundplane.js",
            meshloader("groundplane"),
            "../models/textures",
            callbackProgress
            );
}

function globalProgress(bar){
	var bar = 250;
	var perBar = bar/totalMeshesToLoad;
}
function callbackProgress( progress, result ) {
	var bar = 250;
	if ( progress.total ){
		bar = Math.floor( bar * progress.loaded / progress.total );
	}
	var curBarWidth = document.getElementById( "bar" ).style.width;
	//var toadd = (curBarWidth + (bar/totalMeshesToLoad));
	//curBarWidth/totalMeshesToLoad-bar/totalMeshesToLoad
	//console.log("ITS: "+toadd);
	//document.getElementById( "bar" ).style.width = curBarWidth + (bar/totalMeshesToLoad) + "px";
	document.getElementById( "bar" ).style.width = bar + "px";
}

function meshloader(fileName){
	return function(geometry, materials){
		console.log("A mesh has been loaded into the scene!");
		if(fileName == "basepiece"){
			/*var image = new Image();
            image.onload = function () { texture.needsUpdate = true; };
            image.src = "models/brick_poster.png";
            var texture  = new THREE.Texture( image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping );
            texture.repeat.x = 8;
            texture.repeat.y = 8;
            for(var i = 0; i < materials.length; i++){
                     if(materials[i].name=="topCylinderBrick"){
                             materials[i] = new THREE.MeshLambertMaterial( { map: texture } );
                     }
            }*/
			for(var i = 0; i < materials.length; i++){
                 if(materials[i].name=="grass"){
                         //materials[i] = grassMaterial;
                 }
			}
			basepiece_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		else if(fileName == "toppiece"){
			crystalmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		else if(fileName == "groundplane"){
			//groundplane_mesh = new THREE.Mesh( geometry,  materials[0]);
			groundplane_mesh = new THREE.Mesh( geometry,  new THREE.MeshFaceMaterial( materials ));
		}
		else if(fileName == "flingpiece"){
			//flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
			for(var i = 0; i < materials.length; i++){
				materials[i].morphTargets = true;
			}
			flingpiece_materials = materials;
			flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
		meshLoaded();
	}
}

function meshLoaded(){
	currentMeshNumber++;
	if(currentMeshNumber == totalMeshesToLoad){
		document.getElementById( "message" ).style.display = "none";
		document.getElementById( "progressbar" ).style.display = "none";
		startGame();
	}
}

function initBaseMeshes(){
	//var basePiece = new THREE.Mesh(basepiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0xdeadbeef } ) );
	addBaseMeshToTower(basepiece_mesh,basepiece_height);
	
	//crystalmesh = new THREE.Mesh(toppiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	//crystalmesh = new THREE.Mesh(toppiece_mesh.geometry, toppiece_mesh.materials );
	addStaticMeshToTower(crystalmesh);
	
	//var groundplane = new THREE.Mesh(groundplane_mesh.geometry,  new THREE.MeshLambertMaterial( { color: 0x00FFCC } ));
	//crystalmesh = new THREE.Mesh(toppiece_mesh.geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
	
	//var groundplane = new THREE.Mesh( groundplane_mesh.geometry, groundplane_mesh.material );
	//addStaticMeshToScene(groundplane);
	addStaticMeshToScene(groundplane_mesh);
}











///////////////////////////////////////////////////////////////
////
//// UNDER CONSTRUCTION

var grassMaterial;
var grassUniforms;
var grassShader;
var grassTex;
var grassImage;

var brickGrayMaterial;
var brickOrangeMaterial;

function loadGlobalTextures(){
	
	grassImage = new Image(); grassImage.onload = function () { grassTex.needsUpdate = true; }; grassImage.src = "models/textures/grass_diffuse.png";
	grassTex  = new THREE.Texture( grassImage, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping ); grassTex.repeat.x = 3; grassTex.repeat.y = 3;
	
	grassNImage = new Image(); grassNImage.onload = function () { grassNTex.needsUpdate = true; }; grassNImage.src = "models/textures/grass_normal.png";
	grassNTex  = new THREE.Texture( grassNImage, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping ); grassNTex.repeat.x = 3; grassNTex.repeat.y = 3;
	
	var color= 0x050505, ambient = 0x050505, diffuse = 0x331100, specular = 0xffffff, shininess = 10, scale = 23;

	// normal map shader

	var shader = THREE.ShaderLib[ "normalmap" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "enableDiffuse" ].value = true;
	uniforms[ "enableAO" ].value = false;
	uniforms[ "enableSpecular" ].value = false;
	uniforms[ "enableReflection" ].value = false;
	uniforms[ "enableDisplacement" ].value = false;

	uniforms[ "tDiffuse" ].value = grassTex;
	uniforms[ "tNormal" ].value = grassNTex;
	uniforms[ "tAO" ].value = grassTex;

	uniforms[ "tDisplacement" ].value = grassTex;
	uniforms[ "uDisplacementBias" ].value = - 0.428408;
	uniforms[ "uDisplacementScale" ].value = 2.436143;

	uniforms[ "uNormalScale" ].value.y = -1.0;
	uniforms[ "uNormalScale" ] = 5.0;
	uniforms[ "uDiffuseColor" ].value.setHex( diffuse );
	uniforms[ "uSpecularColor" ].value.setHex( specular );
	uniforms[ "uAmbientColor" ].value.setHex( 0x000000 );

	uniforms[ "uShininess" ].value = 0;
	uniforms[ "uReflectivity" ].value = 0.0;

	uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
	uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
	uniforms[ "uAmbientColor" ].value.convertGammaToLinear();
	
	var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: false };
	console.log("MATERIAL MADE");
	//grassMaterial = new THREE.ShaderMaterial( parameters );
	grassMaterial = new THREE.MeshLambertMaterial( {
		map: grassTex,
		normalMap: new THREE.Texture( "models/textures/grass_normal.png" )
	} );

	/*
	grassMaterial = new THREE.MeshLambertMaterial( { 
		map: grassTex,
		normalMap: grassNTex
	} );

	
	brickGrayImage = new Image();brickGrayImage.onload = function () { texture.needsUpdate = true; };
	image.src = "models/grass_posterized.png";
	brickOrangeImage = new Image(); brickOrangeImage.onload = function () { texture.needsUpdate = true; };
	
	
	var image = new Image();
    image.onload = function () { texture.needsUpdate = true; };
    image.src = "models/grass_posterized.png";
	var texture  = new THREE.Texture( image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping );
	//var grassTex = new THREE.ImageUtils.loadTexture("models/Grass0100_7_S.jpg");
	//grassTex.wrapS = THREE.RepeatWrapping;
	//grassTex.wrapT = THREE.RepeatWrapping;
	texture.repeat.x = 30;
	texture.repeat.y = 30;*/
}


/**
 * -- UNDER CONSTRUCTION --
 * @param params:
 *        params[0] = Diffuse map path, or -1 if not used
 *        params[1] = AO map path, or -1 if not used
 *        params[0] = Specular map path, or -1 if not used
 *        params[0] = Reflection map path, or -1 if not used
 *        params[0] = Displacement map path, or -1 if not used
 *        params[0] = Diffuse Map, or -1 if not used
 */
function createNormalMaterial(params){
	var ambient = 0x050505, diffuse = 0x331100, specular = 0xffffff, shininess = 10, scale = 23;
	
	var image = new Image();
	image.onload = function () { texture.needsUpdate = true; };
    image.src = "models/brick-ornate.png";
    var diffuseTex  = new THREE.Texture( image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping );
	
	
	var shader = THREE.ShaderLib[ "normalmap" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "enableDiffuse" ].value = true;
	uniforms[ "enableAO" ].value = false;
	uniforms[ "enableSpecular" ].value = false;
	uniforms[ "enableReflection" ].value = false;
	uniforms[ "enableDisplacement" ].value = false;

	uniforms[ "tDiffuse" ].value = diffuseTex;
	uniforms[ "tNormal" ].value = THREE.ImageUtils.loadTexture( "../models/brick-ornate_normal.png" );
	uniforms[ "tAO" ].value = THREE.ImageUtils.loadTexture( "textures/normal/ninja/ao.jpg" );

	uniforms[ "tDisplacement" ].value = THREE.ImageUtils.loadTexture( "textures/normal/ninja/displacement.jpg" );
	uniforms[ "uDisplacementBias" ].value = - 0.428408;
	uniforms[ "uDisplacementScale" ].value = 2.436143;

	uniforms[ "uNormalScale" ].value.y = -1.0;
	uniforms[ "uNormalScale" ] = 5.0;
	uniforms[ "uDiffuseColor" ].value.setHex( diffuse );
	uniforms[ "uSpecularColor" ].value.setHex( specular );
	uniforms[ "uAmbientColor" ].value.setHex( 0x000000 );

	uniforms[ "uShininess" ].value = 0;
	uniforms[ "uReflectivity" ].value = 0.0;

	uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
	uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
	uniforms[ "uAmbientColor" ].value.convertGammaToLinear();


	var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: false };
	var material1 = new THREE.ShaderMaterial( parameters );
	var material2 = new THREE.MeshLambertMaterial( {
		map: texture,
		color: color,
		specular: specular,
		ambient: ambient,
		shininess: shininess,
		normalMap: uniforms[ "tNormal" ].value,
		normalScale: uniforms[ "uNormalScale" ].value,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.1
	} );
}