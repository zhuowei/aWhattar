"use strict";
(function(){

function drawOneAvatar(elem) {
	var canvas = (elem.dataset.awhattarSrc? elem: document.createElement("canvas"));
	canvas.width = canvas.height = elem.width;

	var redraw = elem == canvas;

	var tempElem = document.createElement("img");
	tempElem.src = redraw? canvas.dataset.awhattarSrc: elem.src;
	var realWidth = tempElem.width;
	var realHeight = tempElem.height;

	var drawElem = redraw? tempElem: elem;

	var ctx = canvas.getContext("2d");
	// draw the middle pixels
	ctx.drawImage(drawElem, realWidth / 2, 0, 1, realHeight, 0, 0, canvas.width, canvas.height);
	if (!redraw) {
		canvas.dataset.awhattarSrc = elem.src;
		canvas.className = elem.className + " awhattar-complete"
	}
	canvas.awhattarDrawn = true;
	return canvas;
}

function processOneAvatar(elem) {
	var redrawn = drawOneAvatar(elem);
	// replace the elem with the redrawn one
	if (redrawn == elem) return;
	elem.parentNode.replaceChild(redrawn, elem);	
}

function processAvatarGroups(n) {
	var elems = document.getElementsByClassName(n);
	for (var i = 0; i < elems.length; i++) {
		var e = elems[i];
		if (e.className.indexOf("awhattar-complete") < 0 || !e.awhattarDrawn) {
			processOneAvatar(e);
		}
	}
}

function processAvatars() {
	processAvatarGroups("avatar");
	processAvatarGroups("ProfileTweet-avatar");
	processAvatarGroups("ProfileCard-avatarImage");
	processAvatarGroups("ProfileAvatar-image");
	processAvatarGroups("ProfileCardMini-avatarImage");
	processAvatarGroups("DashboardProfileCard-avatarImage");
	processAvatarGroups("Avatar");
}

function loadHandler() {
	processAvatars();
	setTimeout(loadHandler, 1000);
}

window.addEventListener("load", loadHandler);
})();
