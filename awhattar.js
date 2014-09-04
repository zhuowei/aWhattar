"use strict";
(function(){

var avatarCache = {};
var canvasCache = {};

function drawOneAvatar(elem) {
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = elem.width;
	canvasCache[elem.src] = canvas;

	var tempElem = document.createElement("img");
	tempElem.src = elem.src;
	var realWidth = tempElem.width;
	var realHeight = tempElem.height;

	var ctx = canvas.getContext("2d");
	// draw the middle pixels
	ctx.drawImage(elem, realWidth / 2, 0, 1, realHeight, 0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = "blue";
	//ctx.fillRect(0, 0, elem.width, elem.height);
	return canvas;
}

function processOneAvatar(elem) {
	var redrawn = drawOneAvatar(elem);
	// replace the elem with the redrawn one
	redrawn.className = elem.className + " awhattar-complete";
	elem.parentNode.replaceChild(redrawn, elem);	
}

function processAvatarGroups(n) {
	var elems = document.getElementsByClassName(n);
	for (var i = 0; i < elems.length; i++) {
		var e = elems[i];
		if (e.className.indexOf("awhattar-complete") < 0) {
			processOneAvatar(e);
		}
	}
}

function processAvatars() {
	processAvatarGroups("avatar");
	processAvatarGroups("ProfileTweet-avatar");
}

function loadHandler() {
	processAvatars();
	setTimeout(loadHandler, 1000);
}

window.addEventListener("load", loadHandler);
})();
