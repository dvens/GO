function InfoWindow(options) {

	var _this = this;

	_options = options;
	_this.element = new google.maps.InfoWindow(_options);

	_this.element.addListener('domready', function(){

		var iwOuter = document.querySelector('.gm-style-iw');
		var iwBackground = iwOuter.previousElementSibling;

		//iwBackground.children[2].style.display = 'none';
		//iwBackground.children[4].style.display = 'none';

		// close button >>> iwOuter.nextElementSibling;
		var button = iwOuter.nextElementSibling;

		iwOuter.parentElement.parentElement.style.top = '-10px';

	});

}

InfoWindow.prototype.open = function(map) {
	
	this.element.open(map);

}

InfoWindow.prototype.close = function(map) {
	
	this.element.close(map);

}

InfoWindow.prototype.addPosition = function(position) {
	
	this.element.setPosition(position);

}

InfoWindow.prototype.setContent = function(content) {
	
	this.element.setContent(content);

}

module.exports = InfoWindow;