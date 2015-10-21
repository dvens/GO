var ExampleClass = require('./modules/exampleClass');
var MapsClass = require('./modules/maps');

console.log('main is initialized!');

var main = new Main();
main.init();

function Main() {

	var _this = this;
	var _ExampleClass;
	var _Maps;

	_this.init = function() {

	 	_ExampleClass = new ExampleClass();
	 	_Maps = new MapsClass();

	}

}