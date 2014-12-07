function gameLogic(canvas) {
	var renderer = new gameRenderer(this, canvas);
	var players;
	var properties;
	var destination;

	function initialize() {
		var tile = tiles[Math.floor(Math.random() * tiles.length-1)];
		properties = {
			position : {x: tile[0]*canvas.width/60, y: tile[1]*canvas.height/40},
			direction : "right",
			playerType : "hulk"
		}
	}

	this.update = function(deltaTime) {
	}

	this.render = function() {
		renderer.render(properties);
	}

	this.setPlayers = function(playerArray) {
		//playerArray contains information of other players (type and coordinates)
		//Note: coordinates are relative (i.e. x/screenWidth and y/screenHeight)
		//in order to have resolution independent coordinates
		players = playerArray;
	}

	initialize();
}