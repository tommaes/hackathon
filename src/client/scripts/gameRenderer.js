function gameRenderer(gameLogic, canvas) {
	var ctx = canvas.getContext("2d");
	var tileWidth = canvas.width/60;
	var tileHeight = canvas.height/40;
	var playerWidth = canvas.width/60*2;
	var playerHeight = playerWidth*1.1;


	function renderBackground() {
		ctx.drawImage(resources.mapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	function renderDebugLines() {
		if (debug) {
			for (var i=0; i<40; i++) {
				ctx.fillText(parseInt(i),5,i*(ctx.canvas.height/40)+10);
				ctx.beginPath();
				ctx.moveTo(0,i*(ctx.canvas.height/40));
				ctx.lineTo(ctx.canvas.width,i*(ctx.canvas.height/40));
				ctx.stroke();
			}

			for (var i=0; i<60; i++) {
				ctx.fillText(parseInt(i),i*(ctx.canvas.width/40)+5, 10);
				ctx.beginPath();
				ctx.moveTo(i*(ctx.canvas.width/60), 0);
				ctx.lineTo(i*(ctx.canvas.width/60), ctx.canvas.height);
				ctx.stroke();
			}

			for (var y=0; y<40; y++) {
				for (var x=0; x<60; x++) {
					if (mapData[y] && mapData[y][x] == 1) {
						ctx.fillStyle = "#00FF00";
						ctx.fillRect(x*(ctx.canvas.width/60),y*(ctx.canvas.height/40),(ctx.canvas.width/60),(ctx.canvas.height/40));
					}
				}
			}
		}
	}

	function renderPlayer(gameLogic) {
		var playerImages = resources.player[gameLogic.playerType];
		var currentImage;
		switch (gameLogic.direction) {
			case 'right' : currentImage=playerImages['right1']; break;
			case 'left' : currentImage=playerImages['left1']; break;
			case 'front' : currentImage=playerImages['front1']; break;
			case 'back' : currentImage=playerImages['back1']; break;
		}

		ctx.fillStyle = "#FF0000";
		ctx.fillRect(gameLogic.position.x, gameLogic.position.y, (ctx.canvas.width/60),(ctx.canvas.height/40));
		ctx.drawImage(currentImage, gameLogic.position.x - (playerWidth/2)+tileWidth/2, gameLogic.position.y - playerHeight + tileHeight, playerWidth, playerHeight);
	}

	this.render = function(gameLogic) {
		renderBackground();
		renderDebugLines();
		renderPlayer(gameLogic);
	}

}

