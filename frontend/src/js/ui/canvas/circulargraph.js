var extend = require('./../../helpers/extend');

/*	
	Options::
	size: size of the circle,
	lineWidth: line width of the ,
	rotate: 0
*/

function CircularGraph(el, options) {
	
	var _this = this;
	
	_this.canvas;
	_this.span; 
	_this.context;
	_this.radius;
	_this.element = el;

	var _defaults = {
		color: _this.element.getAttribute('data-graph-color'),
		percent: _this.element.getAttribute('data-graph-percent')
	};

	_this.options = extend(options, _defaults);

	_this.init();

}

CircularGraph.prototype.init = function() {

	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.span = document.createElement('span');
	this.span.textContent = this.options.percent + '%';

	this.setCanvas();

}

CircularGraph.prototype.setCanvas = function() {

	this.canvas.width = this.canvas.height = this.options.size;

	this.element.appendChild(this.span);
	this.element.appendChild(this.canvas);

	this.context.translate( this.options.size / 2, this.options.size / 2 );
	this.context.rotate( (-1 / 2 + this.options.rotate / 180) * Math.PI );

	this.radius = ( this.options.size - this.options.lineWidth ) / 2;

	this.drawGraph();

}

CircularGraph.prototype.drawGraph = function() {

	if( !this.options.backgroundColor ) {

		this.options.backgroundColor = '#e3e3e3';

	}
	
	// Create background circle
	this.drawCircle(this.options.backgroundColor, this.options.lineWidth, 100 / 100);

	// Create actual circle
	this.drawCircle(this.options.color, this.options.lineWidth, this.options.percent / 100);

}

CircularGraph.prototype.drawCircle = function(color, lineWidth, percent) {

	var _percent = Math.min(Math.max(0, percent || 1), 1);

	this.context.beginPath();
	this.context.arc(0, 0, this.radius, 0, Math.PI * 2 * _percent, false);
	this.context.strokeStyle = color;
	this.context.lineCap = 'square';
	this.context.lineWidth = lineWidth;
	this.context.stroke();

}

module.exports = CircularGraph;