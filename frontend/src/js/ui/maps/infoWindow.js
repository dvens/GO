function InfoWindow(options) {

	var _this = this;

	_options = options;
	_this.element = new google.maps.InfoWindow(_options);

	_this.element.addListener('domready', function() {

		var iwOuter = document.querySelectorAll('.gm-style-iw');

		for (var i = 0; i < iwOuter.length; i++) {
			var iwBackground = iwOuter[i].previousElementSibling;
			var secondChild = iwBackground.children[2];
			var fourthChild = iwBackground.children[4];

			// whole item
			iwOuter[i].style.background = 'tomato';
			iwBackground.style.color = 'green';

			// background
			iwBackground.style.display = 'none';

			// arrow
			secondChild.style.display = 'none';
			secondChild.style.display = 'none';
		}
	});
	
	if (_options.clearstyle) {
		clearStyle();
	}

	function clearStyle() {

	}

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
InfoWindow.prototype.addSmallContent = function(content) {
	
	this.element.setContent(content);

}
InfoWindow.prototype.addLargeContent = function(content) {
	
	this.element.setContent(content);

}

module.exports = InfoWindow;