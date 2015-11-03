function OverlayView(options) {
	
	var _overlayOptions = options;
	var _marker;
	
	this.marker = _overlayOptions.marker;
	this.content = _overlayOptions.content;
	this.contentSmall = _overlayOptions.contentSmall;
	this.map = _overlayOptions.marker;
	this.cssClass = _overlayOptions.cssClass || null;
	this.div_;
	this.lat = _overlayOptions.lat;
	this.lng = _overlayOptions.lat;
	this.bounds = new google.maps.LatLng(this.lat, this.lng);
	this.setMap(_overlayOptions.map);
	this.button = this.content.querySelector('.button--info');	
	this.cross = this.content.querySelector('.button--cross');	

	_marker = this.marker;

	this.button.addEventListener('click', function() {
		
		_overlayOptions.click.apply(_marker);	

	});
	this.cross.addEventListener('click', function() {

		_overlayOptions.hide.apply(_marker);

	});

	var _this = this;

}

OverlayView.prototype = new google.maps.OverlayView();

OverlayView.prototype.onAdd = function() {

	var div = document.createElement('DIV');
	div.style.position = "absolute";
	div.style.visibility = "hidden";
	div.style.zIndex = 300;
	div.appendChild(this.content);
	this.div_ = div;

	var divSmall = document.createElement('DIV');
	divSmall.style.position = "absolute";
	divSmall.style.visibility = "hidden";
	divSmall.style.zIndex = 999;
	divSmall.appendChild(this.contentSmall);
	this.divSmall_ = divSmall;

	var panes = this.getPanes();
	panes.floatPane.appendChild(this.divSmall_);
	panes.floatPane.appendChild(this.div_);

};

OverlayView.prototype.draw = function() {

    var overlayProjection = this.getProjection();
    var lat = this.lat;
    var lng = this.lng;
    var ne = overlayProjection.fromLatLngToDivPixel(this.marker.getPosition());
    var left = (ne.x + 10) + 'px';
    var top = (ne.y - 30) + 'px';
    var leftSmall = (ne.x - 17) + 'px';
    var topSmall = (ne.y - 60) + 'px';

    var div = this.div_;
    var divSmall = this.divSmall_;

    div.style.left = left;
    div.style.top = top;
    divSmall.style.left = leftSmall;
    divSmall.style.top = topSmall;

};

OverlayView.prototype.click = function() {

	if (this.div_) {	

	    this.div_.style.visibility = 'visible';
	    this.divSmall_.style.visibility = "hidden";
	}	

};

OverlayView.prototype.hideClick = function() {

	if (this.div_) {	

		// dit moet all div's worden
	    this.div_.style.visibility = 'hidden';
	    
	}	

};

OverlayView.prototype.show = function() {

	if (this.div_) {	

	    this.div_.style.visibility = 'hidden';
	    this.divSmall_.style.visibility = 'visible';
	}

};

OverlayView.prototype.hide = function() {

	if (this.div_) {

	    this.divSmall_.style.visibility = "hidden";
	}

};

module.exports = OverlayView;