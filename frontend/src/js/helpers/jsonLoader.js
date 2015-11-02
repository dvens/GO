function JSONLoader () {
	
	var _this = this;
	var _url;
	var _xRequest;
	var _callback;


	_this.load = function(url, callback) {

		_url = url;
		_callback = callback;

		_xRequest = new XMLHttpRequest();
		_xRequest.open('GET', _url, false);
		_xRequest.send(null);
		
		if (typeof callback === 'function') {
 
        	_callback.call(JSON.parse(_xRequest.responseText));

   	 	} else {

   	 		return JSON.parse(_xRequest.responseText);

   	 	}

	}
	
}

module.exports = JSONLoader;