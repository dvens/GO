function GeoMarker(options) {

	var _this = this;

	_options = options;
	_this.element = new google.maps.Marker(_options);

}

GeoMarker.prototype.click = function(fn) {
	// TODO: make click function
}

GeoMarker.prototype.mouseover = function(fn) {
	// TODO: make mouseover function
}

GeoMarker.prototype.mouseout = function(fn) {
	// TODO: make mouseout function
}

module.exports = GeoMarker;
