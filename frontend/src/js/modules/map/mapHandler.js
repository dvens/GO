var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var config = require('./config');
var InfoWindow = require('./../../ui/maps/infoWindow');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);

  var _click;

  _loader.load('./src/data/places.json', setMarkers);

  function setMarkers() {

    var _markers = this;

    _markers.forEach(function(item) {

      var _options = {
        position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
        title: item.city,
        weather: item.weather,
        cost: item['cost-of-living'], 
        icon: './assets/images/circle.svg',
        click: openWindow,
        mouseover: mouseover,
        mouseout: mouseout
      };

      var _marker = new GeoMarker(_options);
      _map.addMarker(_marker.element);

    });

  }

  function openWindow() {
    console.log('openWindow', this.title);
  }

  function mouseover() {
    console.log('mouseover', this.title);
  }

  function mouseout() {
    console.log('mouseout', this.title); 
  }

  _map.markers.forEach(function(marker) {
      var _content = {
        title: marker.title,
        weather: marker.weather,
        cost: marker.cost,
      }

      var smallContentString = '<section class"small__section">' + '<h1>' + _content.title + '</h1>' + '</section>';
      var largeContentString = '<section class"large__section">' + '<h1>' + _content.title + '</h1>' + '<span>' + _content.weather + '°C' + '</span>' + '<span>' + '€' + _content.cost + '</span>' + '</section>';

      var _options = {
        smallContent: smallContentString,
        largeContent: largeContentString,
        clearstyle: true,
        position: {lat: marker.position.lat(), lng: marker.position.lng()}
      }

      // for each marker add a new infowindow
      var _infoWindow = new InfoWindow(_options);



  // on hover
      // put the infowindows on the map
      _infoWindow.open(_map.map);
      // put the infowindows on the good position
      _infoWindow.addPosition(_options.position);
      // ToDo: make an if statement of this!
        // add only the title to the infoWindow
        _infoWindow.addSmallContent(_options.smallContent);

  // on mouse out & if the marker is not clicked
      // close the windows on the map
      // _infoWindow.close(_map.map);

  // on Click
      // add the title, Weather and cost to the infowindow
      _infoWindow.addLargeContent(_options.largeContent);

  
     

  });




}

module.exports = Maps;



