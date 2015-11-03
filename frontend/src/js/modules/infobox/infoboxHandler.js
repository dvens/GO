var CircularGraph = require('./../../ui/canvas/circulargraph');
var RangeSlider = require('./../../ui/form/rangeslider');
var range;

function infoboxhandler() {

    var _this = this;
    var _boxContainer = document.querySelector('[data-peach-container="main"]');

    _this.loadCirclegraphs = function() {  

        var _charts = document.querySelectorAll('.chart');

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

    _this.loadRange = function() {

        var _range = document.querySelectorAll('.range');

        for( var i = 0; i < _range.length; i++ ) {

            var rangeslider = new RangeSlider(_range[i]);

        }

    }

}

module.exports = infoboxhandler;