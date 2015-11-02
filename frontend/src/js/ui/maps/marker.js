function GeoMarker(options) {

	var _this = this;
	var _audio = new Audio('./assets/images/button.mp3');

	_options = options;
	_this.element = new google.maps.Marker(_options);

	_this.element.addListener('click', function() {


		if( _options.click ) {

			_options.click.apply(this);	
			console.log("Foo");

		}
			
	});

	_this.element.addListener('mouseover', function() {

		

			_audio.play();
			// _options.mouseover.apply(this);	


		
	});

	_this.element.addListener('mouseout', function() {

		if( _options.mouseout) {

			_options.mouseout.apply(this);

		}
		
	});

}

module.exports = GeoMarker;
