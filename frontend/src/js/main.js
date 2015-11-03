var MapHandler = require('./modules/map/mapHandler');
var InfoboxHandler = require('./modules/infobox/infoboxHandler');

var main = new Main();
main.init();

function Main() {

	var _this = this;
	var _mapHandler;
	var _infboxHandler;

	_this.init = function() {

	 	_mapHandler = new MapHandler();

	}

}