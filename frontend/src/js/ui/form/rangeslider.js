function RangeSlider(el) {

	var _this = this; 
	_this.element = el;
	_this.range;
	_this.currentValue;
	_this.beginValue;
	_this.endValue;

	_this.init();
}

RangeSlider.prototype.init = function() {
	this.range = this.element.querySelector('input[type="range"]');
	this.currentValue = this.range.value;
	this.beginValue = this.element.querySelector('.begin-value');
	this.endValue = this.element.querySelector('.end-value');

	this.setValues(this.currentValue);
	this.initEvents();
}

RangeSlider.prototype.initEvents = function() {

	var _this = this;

	this.range.addEventListener('input', function() {
		
		var _value = this.value;
		_this.setValues(_value);

	})

}

RangeSlider.prototype.setValues = function(value) {

	var _diff = 132.67;
	var _value = value;
	
	console.log('setValues', this.beginValue.innerHTML);

	this.beginValue.innerHTML = _value + ',-';
	this.endValue.innerHTML = Math.round( (_value * _diff) * 100) / 100 + ',-';
}

module.exports = RangeSlider;