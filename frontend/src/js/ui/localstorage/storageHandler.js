function storageHandler() {

    var _this = this;

    _this.infoboxes = [];

    _this.updateInfoBoxes = function() {
        var _infoboxes = document.querySelectorAll('.infobox');
		_this.infoboxes = [];

        for ( var i = 0; i < _infoboxes.length; i++ ) {
        	_this.infoboxes.push(_infoboxes[i]);	
        }
        
    }

    _this.getInfoboxes = function() {
    	return this.infoboxes;
    }

}

module.exports = storageHandler;