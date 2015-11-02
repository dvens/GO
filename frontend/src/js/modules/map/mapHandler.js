var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var InfoWindow = require('./../../ui/maps/infoWindow');
var Peach = require('./../../vendor/peach-min');
var config = require('./config');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);

  _loader.load('./src/data/places.json', setMarkers);

  function setMarkers() {

    var _markers = this;

    _markers.forEach(function(marker) {

      var _infowindowOptions = {
        position: {lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}
      }

      var _options = {
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        title: marker.city,
        weather: marker.weather,
        cost: marker['cost-of-living'], 
        icon: './assets/images/circle.svg',
        infowindow: new InfoWindow(_infowindowOptions),
        click: openWindow,
        mouseover: mouseover,
        mouseout: mouseout
      };

      var _marker = new GeoMarker(_options);
      _map.addMarker(_marker.element);

    });

  }

  function openWindow() {

    var _content = '<section class"test">' + '<h1>' + this.title + '</h1>' + '<span>' + this.weather + '°C' + '</span>' + '<span>' + '€' + this.cost + '</span>' + '</section>';
    var _lat = this.position.lat();
    var _lng = this.position.lng();

    var data = {
      title: this.title,
      weather: this.weather
    };

    Peach.render('.infobox-template', { data: data }, true);

    _map.panTo(_lat, _lng);
    this.infowindow.setContent(_content);
    this.infowindow.open(_map.map);

  }

  function mouseover() {

    var _content = '<section class"test">' + '<h1>' + this.title + '</h1>' + '</section>';
    this.infowindow.setContent(_content);
    this.infowindow.open(_map.map);

  }

  function mouseout() {

    this.infowindow.close(_map.map);


  }

}

module.exports = Maps;



