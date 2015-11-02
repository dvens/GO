var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var OverlayView = require('./../../ui/maps/overlayView');
var Peach = require('./../../vendor/peach-min');
var config = require('./config');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);

  _loader.load('./src/data/places.json', setMarkers);

  function setMarkers() {

    var _markers = this;

    _markers.forEach(function(marker) {


      var _options = {
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        icon: {
            url: './assets/images/circle.svg',
            size: new google.maps.Size(10, 10),
            class: 'markerIcon'
        },
        title: marker.city,
        weather: marker.weather,
        cost: marker['cost-of-living'],
        click: openWindow,
        mouseover: mouseover,
        mouseout: mouseout
      };

      // add the marker
      var _marker = new GeoMarker(_options);
      _map.addMarker(_marker.element);

      // Content calc
      var weatherCheck = parseFloat(marker.weather);
      function weatherIcon(marker) {

        if ( weatherCheck <= 20 ) {

            return '../assets/images/icons/ice.svg';

        } else if ( weatherCheck >= 20 && weatherCheck < 25 ) {


            return '../assets/images/icons/rain.svg';


        } else if ( weatherCheck >= 25 && weatherCheck < 30 ) {

            return '../assets/images/icons/cloud.svg';

          
        } else if ( weatherCheck >= 30 ) {
          
            return '../assets/images/icons/sun.svg';

        }

      }
      var wifiCheck = parseFloat(marker.wifi);
      function wifiIcon(marker) {

        if ( wifiCheck < 20 ) {

            return '../assets/images/icons/wifi.svg';

        } else if ( wifiCheck >= 20 ) {

            return '../assets/images/icons/wifi-sm.svg';
        }

      }

      // Content
      var overlayviewBoxTemp = document.querySelector('.overlayviewTemp');
      var overlayviewBox = overlayviewBoxTemp.content.querySelector('.overlayview');
      overlayviewBoxTemp.content.querySelector('.title').innerHTML = marker.city;
      overlayviewBoxTemp.content.querySelector('.cost').innerHTML = marker['cost-of-living'];
      overlayviewBoxTemp.content.querySelector('.weather').src = weatherIcon();
      overlayviewBoxTemp.content.querySelector('.wifi__icon').src = wifiIcon();
      overlayviewBoxTemp.content.querySelector('.wifi').innerHTML = marker.wifi;
      // clone the contentBlock above
      var content = document.importNode(overlayviewBoxTemp.content.querySelector('.overlayview'), true);
      content.style.background = 'url(' +  marker.img + ')';

      // Overlayview options
      var _overlayviewoptions = {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        content: content,
        marker: _marker.element,
        map: _map.map
      }

      var overlayview = new OverlayView(_overlayviewoptions);

      _marker.setOverlayView(overlayview);

    });
  }

  function mouseout () {

    this.overlayview.hide();
    //_this.marker.icon.size = new google.maps.Size(50, 50);
    
  }

  function mouseover () {

    this.overlayview.show();
    
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

  }

}



module.exports = Maps;