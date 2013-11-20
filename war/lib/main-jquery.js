/**
 * JQuery Stuff
 */

$(document).ready(function(){
	$( "#trans-3d" ).click(function() {
		var redirectLocation = "/art";
		window.location = redirectLocation;
	});
	$( "#trans-compsci" ).click(function() {
		console.log("test");
		var redirectLocation = "/compsci";
		window.location = redirectLocation;
	});
	
	$("#trans-3d").hover(function() {
		$(this).attr("src","images/main/main-to-3d-hover.png");
		$("#trans-inner").attr("src","images/main/main-inner-hover-left.png");
			}, function() {
		$(this).attr("src","images/main/main-to-3d.png");
		$("#trans-inner").attr("src","images/main/main-inner.png");
	});
	$("#trans-compsci").hover(function() {
		$(this).attr("src","images/main/main-to-compsci-hover.png");
		$("#trans-inner").attr("src","images/main/main-inner-hover-right.png");
			}, function() {
		$(this).attr("src","images/main/main-to-compsci.png");
		$("#trans-inner").attr("src","images/main/main-inner.png");
	});
	
});