var resources = {};
var mainCanvas;
var debug = true;

function initializeGame() {
	mainCanvas = document.getElementById("mainCanvas");

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

function startGame() {
	var ctx = mainCanvas.getContext("2d");

	ctx.drawImage(resources.mapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

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

		for (var y=0; y<40; y++)
			for (var x=0; x<60; x++) {
				if (mapData[y] && mapData[y][x] == 1) {
					ctx.fillStyle = "#00FF00";
					ctx.fillRect(x*(ctx.canvas.width/60),y*(ctx.canvas.height/40),(ctx.canvas.width/60),(ctx.canvas.height/40));
				}
			}
	}
}