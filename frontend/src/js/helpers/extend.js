// Help: https://gist.github.com/pbojinov/8f3765b672efec122f66
var Extend = function ( defaults, options ) {
    
    var extended = {};
    var prop;
    
    for (prop in defaults) {
    
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            
            extended[prop] = defaults[prop];

        }

    }
    
    for (prop in options) {
        
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            
            extended[prop] = options[prop];

        }

    }

    return extended;

};

module.exports = Extend;