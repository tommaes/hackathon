function initializeGame() {
	var mainCanvas = document.getElementById("mainCanvas");

	mainCanvas.width  = window.innerWidth;
	mainCanvas.height = window.innerHeight;

	startGame(mainCanvas);
}



function startGame(aCanvas) {
	var ctx = aCanvas.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0,0,150,75);
}