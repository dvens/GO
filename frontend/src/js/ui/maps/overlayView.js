function OverlayView(options) {
	
	var _this = this;
	
	_this.overlayOptions = options;

	this.marker = _this.overlayOptions.marker;
	this.content = _this.overlayOptions.content;
	this.contentSmall = _this.overlayOptions.contentSmall;
	this.map = _this.overlayOptions.marker;
	this.cssClass = _this.overlayOptions.cssClass || null;
	this.div_;
	this.divSmall_;
	this.divCo_;
	this.lat = _this.overlayOptions.lat;
	this.lng = _this.overlayOptions.lng;
	this.bounds = new google.maps.LatLng(this.lat, this.lng);
	this.setMap(_this.overlayOptions.map);
	this.button;
	this.cross;	

}

OverlayView.prototype = new google.maps.OverlayView();

OverlayView.prototype.onAdd = function() {

	var div = document.createElement('DIV');
	var _this = this;
	div.style.position = "absolute";
	div.style.visibility = "hidden";
	div.style.zIndex = 300;
	div.innerHTML = this.content;
	this.div_ = div;

	this.button = this.div_.querySelector('.button--info');	
	this.cross = this.div_.querySelector('.button--cross');	

	if( this.button ) {

		this.button.addEventListener('click', function() {
			
			_this.overlayOptions.click.apply(_this.marker);	
			console.log('click');

		});

	}

	if(  this.cross ) {

		this.cross.addEventListener('click', function() {

			console.log('close');
			_this.overlayOptions.hide.apply(_this.marker);

		});

	}

	// var divSmall = document.createElement('DIV');
	// divSmall.style.position = "absolute";
	// divSmall.style.visibility = "hidden";
	// divSmall.style.zIndex = 999;
	// // divSmall.appendChild(this.contentSmall);
	// this.divSmall_ = divSmall;

	// var divCo = document.createElement('DIV');
	// divCo.style.position = "absolute";
	// // divCo.style.visibility = "hidden";
	// divCo.style.zIndex = 300;
	// divCo.appendChild(this.contentCo);
	// this.divCo_ = divCo;

	var panes = this.getPanes();
	panes.floatPane.appendChild(this.div_);
	// panes.floatPane.appendChild(this.divSmall_);
	// // panes.floatPane.appendChild(this.divCo_);
	

};

OverlayView.prototype.draw = function() {

    var overlayProjection = this.getProjection();
    var lat = this.lat;
    var lng = this.lng;
    var ne = overlayProjection.fromLatLngToDivPixel(this.marker.getPosition());
    var left;
    var top;
    
    if( this.overlayOptions.templateType === '.overlayviewTemp' ) {
    	left = (ne.x + 10) + 'px';
     	top = (ne.y - 30) + 'px';
    }

	if( this.overlayOptions.templateType === '.overlayviewTempSmall' ) {
    	left = (ne.x - 17) + 'px';
     	top = (ne.y - 60) + 'px';
    }     



    // var leftSmall = (ne.x - 17) + 'px';
    // var topSmall = (ne.y - 60) + 'px';

    var div = this.div_;
    // var divSmall = this.divSmall_;

    div.style.left = left;
    div.style.top = top;
    // divSmall.style.left = leftSmall;
    // divSmall.style.top = topSmall;
    
    // var overlayProjectionCo = this.getProjection();
    // var latCo = this.latCo;
    // var lngCo = this.lngCo;
    // var neCo = overlayProjectionCo.fromLatLngToDivPixel(this.marker.getPosition());
    // var leftCo = (neCo.x + 10) + 'px';
    // var topCo = (neCo.y - 30) + 'px';
    // var divCo = this.divCo_;
    // divCo.style.left = leftCo;
    // divCo.style.top = topCo;
};

OverlayView.prototype.click = function() {

	if (this.div_) {	

	    this.div_.style.visibility = 'visible';
	    // this.divSmall_.style.visibility = "hidden";

	}	

};

OverlayView.prototype.hideClick = function() {

	if (this.div_) {	

	    this.div_.style.visibility = 'hidden';
	    
	}	

};

OverlayView.prototype.show = function() {

	if (this.div_) {	

	    this.div_.style.visibility = 'visible';
	    // this.divSmall_.style.visibility = 'visible';
	}

};

OverlayView.prototype.hide = function() {

	if (this.div_) {

	    this.div_.style.visibility = "hidden";
	}

};

module.exports = OverlayView;