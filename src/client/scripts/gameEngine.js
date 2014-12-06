var resources = {};
var gamestate = "PAUSED";
var debug = true;

function initializeGame() {
	var mainCanvas = document.getElementById("mainCanvas");

	mainCanvas.width  = window.innerWidth;
	mainCanvas.height = window.innerHeight;

	var initialized = loadResources();

	initialized.then(function(){startGame(mainCanvas)});
}


function loadResources() {
	var loaded = new $.Deferred();

	resources.mapImage 		  = new Image();
	resources.mapImage.onload = loaded.resolve;
	resources.mapImage.src 	  = "images/Map/map.png";

	return loaded.promise();
}

function startGame(canvas) {
	var game = new gameLogic(canvas);
	var loopTime = new Date();

	gamestate = "RUNNING";

	function gameLoop() {
		if (gamestate != "STOPPED") {
			var currentTime = new Date();
			var timeDelta   = currentTime - loopTime;

			game.update(timeDelta);
			game.render();

			loopTime = new Date();
			setTimeout(gameLoop, 200-timeDelta);
		}
	}
	gameLoop();	
}