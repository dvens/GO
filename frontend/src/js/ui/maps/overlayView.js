function OverlayView(options) {
	
	_options = options;
	
	this.marker = _options.marker;
	this.content = _options.content;
	this.map = _options.marker;
	this.cssClass = _options.cssClass || null;
	this.lat = _options.lat;
	this.lng = _options.lat;
	this.bounds = new google.maps.LatLng(this.lat, this.lng);
	this.div_ = null;
	this.setMap(_options.map);

	var thisMarker = this.marker;
	var _this = this;
	_this.marker.addListener('mouseover', function () {
	    _this.show();
	    _this.marker.icon.size = new google.maps.Size(50, 50);
	    console.log(_this.marker.icon);
	});
	_this.marker.addListener('mouseout', function () {
	    _this.hide();
	});

}

OverlayView.prototype = new google.maps.OverlayView();

OverlayView.prototype.onAdd = function() {

	var div = document.createElement('DIV');
	div.style.position = "absolute";
	div.style.visibility = "hidden";
	if (this.cssClass_)
	    div.className += " " + this.cssClass_;
	div.appendChild(this.content);
	this.div_ = div;
	var panes = this.getPanes();
	panes.floatPane.appendChild(this.div_);

};

OverlayView.prototype.draw = function() {

    var overlayProjection = this.getProjection();
    var lat = this.lat;
    var lng = this.lng;
    var ne = overlayProjection.fromLatLngToDivPixel(this.marker.getPosition());
    var left = (ne.x - 27) + 'px';
    var top = (-ne.y + 27) + 'px';
    var div = this.div_;
    div.style.left = left;
    div.style.bottom = top;

};

OverlayView.prototype.onRemove = function() {

	this.div_.parentNode.removeChild(this.div_);

};

OverlayView.prototype.show = function() {

	if (this.div_) {
	    this.div_.style.visibility = "visible";
	}

};

OverlayView.prototype.hide = function() {

	if (this.div_) {
	    this.div_.style.visibility = "hidden";
	}

};

module.exports = OverlayView;