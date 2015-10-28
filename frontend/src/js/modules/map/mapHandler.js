var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var config = require('./config');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);
  var _infowindow = new google.maps.InfoWindow();

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
        icon: './assets/images/circle.svg'
      };

      var _marker = new GeoMarker(_options);
      _map.addMarker(_marker.element);

    });

  }

  _map.markers.forEach(function(marker) {

      marker.addListener('mouseover', function() {
        
        var title = this.title;
        var pos = this.getPosition();

        // // moet nog met css in px/em gebeuren. Nu pakken we de lang/latt en dat wil je niet
        var lat = pos.lat();
        var lng = pos.lng();
        _click = false;

        var smallContent = '<section class"test">' + '<h1>' + title + '</h1>' + '</section>';

        if ( _click != true ) {

          _infowindow.setContent(smallContent);
          _infowindow.setPosition({lat: lat, lng: lng});
          _infowindow.open(_map.map);

        }

      });

      marker.addListener('mouseout', function() {
        
        if ( _click != true ) {
          
          _infowindow.close(_map.map);

        }

      });

      marker.addListener('click', function() {
        
        var title = this.title;
        var weather = this.weather;
        var cost = this.cost;
        
        _click = true;
        
        var largeContent = '<section class"test">' + '<h1>' + title + '</h1>' + '<span>' + weather + '°C' + '</span>' + '<span>' + '€' + cost + '</span>' + '</section>';

        _infowindow.setContent(largeContent);

      });

  });

}

module.exports = Maps;
