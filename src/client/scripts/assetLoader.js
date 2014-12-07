var promises = [];

function loadAssets() {
	var mapPromise 			  = new $.Deferred();
	resources.mapImage 		  = new Image();
	resources.mapImage.onload = mapPromise.resolve;
	resources.mapImage.src 	  = "images/Map/map.png";
	promises.push(mapPromise.promise());

	loadAsset("hulk");
}

function loadAsset(playerType) {
	if (!resources.player)
		resources.player = {};

	resources.player[playerType] = {
		back1 : new Image(),
		back2 : new Image(),
		back3 : new Image(),
		back4 : new Image(),
		front1 : new Image(),
		front2 : new Image(),
		front3 : new Image(),
		front4 : new Image(),
		left1 : new Image(),
		left2 : new Image(),
		left3 : new Image(),
		left4 : new Image(),
		right1 : new Image(),
		right2 : new Image(),
		right3 : new Image(),
		right4 : new Image()
	}

	for (var key in resources.player[playerType]) {
		var promise 							 = new $.Deferred();
		resources.player[playerType][key].onload = promise.resolve
		resources.player[playerType][key].src	 = "images/Hero/" + playerType +"/"+key+".png"
		promises.push(promise.promise());
	}
}