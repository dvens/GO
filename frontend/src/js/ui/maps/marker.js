function GeoMarker(options) {

	var _this = this;
	var _audio;

	_options = options;
	_audio = new Audio(_options.audio);
	_this.overlayview;
	_this.smallOverlayview;
	_this.coOverlayview;
	_this.element = new google.maps.Marker(_options);

	_this.element.addListener('click', function() {

		if( _options.click ) {

			_options.click.apply(this);	

		}
			
	});

	_this.element.addListener('mouseover', function() {

		if( _options.mouseover ) {

			_audio.play();
			_options.mouseover.apply(this);	

		}
		
	});

	_this.element.addListener('mouseout', function() {

		if( _options.mouseout) {

			_options.mouseout.apply(this);

		}
		
	});

}

GeoMarker.prototype.setOverlayView = function(el) {

	this.element.overlayview = el;

}

GeoMarker.prototype.setSmallOverlayView = function(el) {

	this.element.smallOverlayview = el;

}

GeoMarker.prototype.setCoOverlayView = function(el) {

	this.element.coOverlayview = el;

}

module.exports = GeoMarker;
