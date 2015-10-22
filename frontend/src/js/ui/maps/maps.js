var extend = require('./../../helpers/extend');

function Map(id, options) {

	var _this = this;
	_this.element = document.querySelector(id);
	
	_this.defaults = {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 8
	}

	this.options = extend(options, this.defaults);

	this.init();

}

Map.prototype.init = function() {
	
	this.initMap();
	
}

Map.prototype.initMap = function() {
	
	console.log(this.options);

}

Map.prototype.createMap = function() {

}

module.exports = Map;