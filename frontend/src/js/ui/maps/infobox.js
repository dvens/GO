var Peach = require('./../../vendor/peach-min');
var CircularGraph = require('./../../ui/canvas/circulargraph');
var RangeSlider = require('./../../ui/form/rangeslider');

function Infobox(opt_in) {

	var _this = this;
	_this.maxValues = opt_in;	
	_this.boxContainer = document.querySelector('[data-peach-container="main"]');
	_this.element;
	_this.button;
	_this.save;

	_this.init();

}

Infobox.prototype.init = function() {

	this.createInfobox();

}

Infobox.prototype.initEvents = function() {
	
	var _this = this;

	if( this.button ) {
		
		this.button.addEventListener('click', function(e) {

			e.preventDefault();
			_this.close();

		});

	}

}

Infobox.prototype.createInfobox = function() {
	
	var _div = document.createElement('div');
	_div.setAttribute('class', 'infobox');
	this.element = _div;

}

Infobox.prototype.render = function(tmpl_name, data) {

	var _template = tmpl_name;
	this.boxContainer.appendChild(this.element);
	this.element.innerHTML = Peach.render(_template, { data: data }, 'render');
	
	if( this.element.querySelector('.infobox__close') && this.element.querySelector('.infobox__button-holder a') ) {

		this.button = this.element.querySelector('.infobox__close');
		this.save = this.element.querySelector('.infobox__button-holder a');

	}

	this.load();
	this.element.classList.add('active');
}

Infobox.prototype.load = function() {

	this.initEvents();
	this.loadRange();
	this.loadCosts();
	this.loadCirclegraphs();

}

Infobox.prototype.loadCosts = function() {

	var _airbnbPercent;
	var _hotelPercent;
	var _apartmentPercent;

	// Get elements
	var _airbnb = this.element.querySelector('.airbnb');
	var _hotel = this.element.querySelector('.hotel');
	var _apartment = this.element.querySelector('.apartment');

	// Set max
	var _airbnbMax = this.maxValues.airbnb.airbnb;
	var _hotelMax = this.maxValues.hotel.hotel;
	var _apartmentMax = this.maxValues.apartment.apartment;

	// Get attributes
	_airbnbPercent = ( _airbnb.getAttribute('data-cost') / _airbnbMax ) * 100;
	_apartmentPercent = ( _apartment.getAttribute('data-cost') / _apartmentMax ) * 100;
	_hotelPercent = ( _hotel.getAttribute('data-cost') / _hotelMax ) * 100;

	// Set span width
	_airbnb.querySelector('span').style.width = Math.round(_airbnbPercent) + '%';
	_hotel.querySelector('span').style.width = Math.round(_hotelPercent) + '%';
	_apartment.querySelector('span').style.width = Math.round(_apartmentPercent) + '%';

	if( _airbnbPercent <= 25 ) {
		_airbnb.querySelector('span > div').setAttribute('class', 'sm');
	}

	if( _apartmentPercent <= 25 ) {
		_apartment.querySelector('span > div').setAttribute('class', 'sm');
	}

	if( _hotelPercent <= 25 ) {
		_hotel.querySelector('span > div').setAttribute('class', 'sm');
	}

}

Infobox.prototype.loadRange = function() {
	
	var _range = this.element.querySelector('.range');
	var rangeslider = new RangeSlider(_range);

}

Infobox.prototype.loadCirclegraphs = function() {

	var _charts = this.element.querySelectorAll('.chart');

	var _options = {
	    size: 67,
	    lineWidth: 10,
	    rotate: 0,
	    backgroundColor: '#e0ba08'
	};

	for( var i = 0; i < _charts.length; i++ ) {

	    var circleChart = new CircularGraph(_charts[i], _options);

	}

}

Infobox.prototype.close = function() {
	
	var _timer;
	var _this = this;
	
	this.element.classList.remove('active');
	
	_timer = setTimeout(function(){
  		
		_this.boxContainer.removeChild(_this.element);
		clearTimeout(_timer);	

	}, 400);
	

}

Infobox.prototype.save = function() {

}

module.exports = Infobox;