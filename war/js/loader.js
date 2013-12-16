

function handle_update( result, pieces ) {
	//refreshSceneView( result );
	//renderer.initWebGLObjects( result.scene );
	var m, material, count = 0;
	for ( m in result.materials ) {
		material = result.materials[ m ];
		if ( ! ( material instanceof THREE.MeshFaceMaterial || material instanceof THREE.ShaderMaterial || material.morphTargets ) ) {
			if( !material.program ) {
				renderer.initMaterial( material, result.scene.__lights, result.scene.fog );
				count += 1;
				if( count > pieces ) {
					//console.log("xxxxxxxxx");
					break;
				}
			}
		}
	}
}

var callbackProgress = function( progress, result ) {

	var bar = 250,
	total = progress.totalModels + progress.totalTextures,
	loaded = progress.loadedModels + progress.loadedTextures;
	if ( total )
		bar = Math.floor( bar * loaded / total );
	document.getElementById( "bar" ).style.width = bar + "px";
	count = 0;
	for ( var m in result.materials ) count++;
		handle_update( result, Math.floor( count/total ) );
}

var callbackFinished = function ( result ) {
	loaded = result;
	document.getElementById( "message" ).style.display = "none";
	document.getElementById( "progressbar" ).style.display = "none";
	document.getElementById( "start" ).style.display = "block";
	document.getElementById( "start" ).className = "enabled";
	//handle_update( result, 1 );
	flingpiece_mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ) );
}
