function OverlayView(options) {
	
	var _this = this;
	
	_this.overlayOptions = options;

	this.marker = _this.overlayOptions.marker;
	this.content = _this.overlayOptions.content;
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
	div.innerHTML = this.content;
	div.style.zIndex = 300;
	this.div_ = div;

	this.button = this.div_.querySelector('.button--info');	
	this.cross = this.div_.querySelector('.button--cross');	

	if( this.button ) {

		this.button.addEventListener('click', function() {
			
			_this.overlayOptions.click.apply(_this.marker);	

		});

	}

	if(  this.cross ) {

		this.cross.addEventListener('click', function() {

			_this.overlayOptions.hide.apply(_this.marker);

		});

	}

	var panes = this.getPanes();
	panes.floatPane.appendChild(this.div_);

};

OverlayView.prototype.draw = function() {

    var overlayProjection = this.getProjection();
    var lat = this.lat;
    var lng = this.lng;
    var ne;
    var left;
    var top;
    
    if( this.overlayOptions.templateType === '.overlayviewTemp' ) {

    	ne = overlayProjection.fromLatLngToDivPixel(this.marker.getPosition());
    	left = (ne.x + 18) + 'px';
     	top = (ne.y - 31) + 'px';

    }

	if( this.overlayOptions.templateType === '.overlayviewTempSmall' ) {

		ne = overlayProjection.fromLatLngToDivPixel(this.marker.getPosition());
    	left = (ne.x - 17) + 'px';
     	top = (ne.y - 60) + 'px';

    }

    if( this.overlayOptions.templateType === '.overlayviewTempCo' ) {

		var bounds = new google.maps.LatLngBounds(
		      new google.maps.LatLng(lat, lng),
		      new google.maps.LatLng(lat, lng));

		this._bounds = bounds;

		var sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSouthWest());
		var ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());

		left = (sw.x + 10) + 'px';
		top = (ne.y -20) + 'px';

    }

    var div = this.div_;

    div.style.left = left;
    div.style.top = top;

};

OverlayView.prototype.click = function() {

	if( this.overlayOptions.templateType != '.overlayviewTempCo' ) {

	    this.marker.overlayview.div_.style.visibility = 'visible';
		this.marker.smallOverlayview.div_.style.visibility = 'hidden';

	}
	
	if( this.overlayOptions.templateType === '.overlayviewTempCo' ) {

		this.marker.coOverlayview.div_.style.visibility = 'visible';

	};

};

OverlayView.prototype.hideClick = function() {

	if( this.overlayOptions.templateType != '.overlayviewTempCo' ) {

	    this.marker.overlayview.div_.style.visibility = 'hidden';
		this.marker.smallOverlayview.div_.style.visibility = 'hidden';

	}

	if( this.overlayOptions.templateType === '.overlayviewTempCo' ) {

		this.marker.coOverlayview.div_.style.visibility = 'hidden';

	};

};

OverlayView.prototype.show = function() {

    if( this.overlayOptions.templateType != '.overlayviewTempCo' ) {

	    this.marker.overlayview.div_.style.visibility = 'hidden';
		this.marker.smallOverlayview.div_.style.visibility = 'visible';

    }

	if( this.overlayOptions.templateType === '.overlayviewTempCo' ) {

		this.marker.coOverlayview.div_.style.visibility = 'visible';

	};

};

OverlayView.prototype.hide = function() {

	if( this.overlayOptions.templateType != '.overlayviewTempCo' ) {

		this.marker.smallOverlayview.div_.style.visibility = 'hidden';

	}
	
	if( this.overlayOptions.templateType === '.overlayviewTempCo' ) {

		this.marker.coOverlayview.div_.style.visibility = 'hidden';

	};

};

module.exports = OverlayView;