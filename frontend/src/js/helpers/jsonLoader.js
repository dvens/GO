function JSONLoader (url) {
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);
	return JSON.parse(request.responseText);
}

module.exports = JSONLoader;