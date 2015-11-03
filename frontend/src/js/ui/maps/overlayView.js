function OverlayView(options) {
	
	var _overlayOptions = options;
	var _marker;
	
	this.marker = _overlayOptions.marker;
	this.content = _overlayOptions.content;
	this.map = _overlayOptions.marker;
	this.cssClass = _overlayOptions.cssClass || null;
	this.lat = _overlayOptions.lat;
	this.lng = _overlayOptions.lat;
	this.bounds = new google.maps.LatLng(this.lat, this.lng);
	this.div_ = null;
	this.setMap(_overlayOptions.map);
	this.button = this.content.querySelector('.button--info');
	
	_marker = this.marker;

	this.button.addEventListener('click', function() {
		
		_overlayOptions.click.apply(_marker);	

	});

	var _this = this;

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
    var left = (ne.x + 10) + 'px';
    var top = (ne.y - 30) + 'px';
    var div = this.div_;
    div.style.left = left;
    div.style.top = top;

};

OverlayView.prototype.onRemove = function() {

	this.div_.parentNode.removeChild(this.div_);

};

OverlayView.prototype.show = function() {

	if (this.div_) {	
	    this.div_.style.visibility = 'visible';
	}

};

OverlayView.prototype.hide = function() {

	if (this.div_) {
	    this.div_.style.visibility = "hidden";
	}

};

module.exports = OverlayView;