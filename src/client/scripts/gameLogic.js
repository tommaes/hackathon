function gameLogic(canvas) {
	var renderer = new gameRenderer(canvas);
	var position;
	var players;
	var destination;

	function initialize() {
		position = Math.floor(Math.random() * tiles.length-1);
	}

	this.update = function(deltaTime) {
	}

	this.render = function() {
		renderer.render();
	}

	this.setPlayers = function(playerArray) {
		//playerArray contains information of other players (type and coordinates)
		//Note: coordinates are relative (i.e. x/screenWidth and y/screenHeight)
		//in order to have resolution independent coordinates
		players = playerArray;
	}

	initialize();
}