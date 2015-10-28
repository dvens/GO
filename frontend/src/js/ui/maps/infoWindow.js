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

	// _this.element.addListener('domready', function() {



	// 	var iwOuter = document.querySelectorAll('.gm-style-iw');

	// 	for (var i = 0; i < iwOuter.length; i++) {
	// 		iwOuter[i].style.background = 'tomato';
	// 	}

	// 	// console.log(iwOuter);

	// 	// var iwBackground = iwOuter.previousElementSibling;

	// 	// iwOuter.style.background = 'tomato';
	// 	// iwBackground.style.display = 'none';

	// 	// var secondChild = iwBackground.children[2];
	// 	// secondChild.style.display = 'none';

	// 	// var fourthChild = iwBackground.children[4];
	// 	// secondChild.style.display = 'none';

	// 	// console.log(iwOuter);


	// });
	// console.log(iwBackground);


	// // Removes background shadow DIV
	// iwBackground.children(':nth-child(2)').css({'display' : 'none'});

	// // Removes white background DIV
	// iwBackground.children(':nth-child(4)').css({'display' : 'none'});

	// if (_options.clearstyle) {
	// 	clearStyle();
	// }

	// function clearStyle() {

	// }

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