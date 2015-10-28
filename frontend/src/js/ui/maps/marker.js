function GeoMarker(options) {

	var _this = this;

	_options = options;
	_this.element = new google.maps.Marker(_options);

	_this.element.addListener('click', function() {

		if( _options.click ) {

			_options.click.apply(this);	

		}
		
	});

	_this.element.addListener('mouseover', function() {

		if( _options.mouseover ) {

			_options.mouseover.apply(this);	

		}
		
	});

	_this.element.addListener('mouseout', function() {

		if( _options.mouseout ) {

			_options.mouseout.apply(this);	

		}
		
	});

}

module.exports = GeoMarker;
