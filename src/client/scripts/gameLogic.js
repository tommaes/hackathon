function gameLogic(canvas) {
	var renderer = new gameRenderer(this, canvas);
	var players;
	var properties;
	var destination;

	function initialize() {
		var tile = tiles[Math.floor(Math.random() * tiles.length-1)];
		properties = {
			position : {x: tile[0], y: tile[1]},
			absoluteposition : {x: tile[0]*canvas.width/60, y: tile[1]*canvas.height/40},
			direction : "right",
			playerType : "hulk"
		}
		if (mapData[properties.position.y][properties.position.x+1])
			destination = [properties.position.x+1, properties.position.y]
		else if (mapData[properties.position.y+1][properties.position.x])
			destination = [properties.position.x, properties.position.y+1]
		else if (mapData[properties.position.y+1][properties.position.x+1])
			destination = [properties.position.x+1, properties.position.y+1]
		else if (mapData[properties.position.y-1][properties.position.x])
			destination = [properties.position.x, properties.position.y-1]
		else if (mapData[properties.position.y][properties.position.x-1])
			destination = [properties.position.x-1, properties.position.y]
		else if (mapData[properties.position.y-1][properties.position.x-1])
			destination = [properties.position.x-1, properties.position.y-1]
		else if (mapData[properties.position.y+1][properties.position.x-1])
			destination = [properties.position.x-1, properties.position.y+1]
		else if (mapData[properties.position.y-1][properties.position.x+1])
			destination = [properties.position.x+1, properties.position.y-1]
	}

	function sign(number) {
		return number && number / Math.abs(number);
	}
	this.update = function(deltaTime) {
		if ((properties.absoluteposition.x == destination.x) && (properties.absoluteposition.y == destination.y))
			destination = null;

		if (destination && (properties.position.x != destination[0]))
			properties.absoluteposition.x += 1*sign(destination[0] - properties.absoluteposition.x);
		if (destination && (properties.position.y != destination[1]))
			properties.absoluteposition.y += 1*sign(destination[1] - properties.absoluteposition.y);
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