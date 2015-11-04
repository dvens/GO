var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var OverlayView = require('./../../ui/maps/overlayView');
var Peach = require('./../../vendor/peach-min');
var config = require('./config');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);
  var _current = 'Amsterdam';
  var _overlayviews = [];

  _loader.load('./src/data/places.json', setMarkers);

  function setMarkers() {

    var _markers = this;

    _markers.forEach(function(marker) {

      function currentIcon() {
        // Change to currentLocation
        if (marker.city === _current) {

          return './assets/images/circleCurrent.svg';

        } else {

          return './assets/images/circle.svg';

        }

      }

      var _options = {
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        icon: {
          url: currentIcon()
        },
        audio: './assets/images/button.mp3',
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
      var _weatherCheck = parseFloat(marker.weather);
      function weatherIcon(marker) {

        if ( _weatherCheck <= 20 ) {

            return '../assets/images/icons/ice.svg';

        } else if ( _weatherCheck >= 20 && _weatherCheck < 25 ) {


            return '../assets/images/icons/rain.svg';


        } else if ( _weatherCheck >= 25 && _weatherCheck < 30 ) {

            return '../assets/images/icons/cloud.svg';

          
        } else if ( _weatherCheck >= 30 ) {
          
            return '../assets/images/icons/sun.svg';

        }

      }
      var _wifiCheck = parseFloat(marker.wifi);
      function wifiIcon(marker) {

        if ( _wifiCheck < 20 ) {

            return '../assets/images/icons/wifi.svg';

        } else if ( _wifiCheck >= 20 ) {

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

      // ContentSmall
      var overlayviewBoxTempSmall = document.querySelector('.overlayviewTempSmall');
      var overlayviewBoxSmall = overlayviewBoxTemp.content.querySelector('.overlayviewSmall');
      overlayviewBoxTempSmall.content.querySelector('.title').innerHTML = marker.city;
      // clone the contentBlock above
      var contentSmall = document.importNode(overlayviewBoxTempSmall.content.querySelector('.overlayviewSmall'), true);

      var _coWorking = marker['co-workingspaces'];

      for (i = 0; i < _coWorking.length; i++) { 

        // console.log(_coWorking[i]);

        // for ( i = 0; i < _coWorking[i].name; i++ ) {


          // ContentCo
          var overlayviewBoxTempCo = document.querySelector('.overlayviewTempCo');
          var overlayviewBoxCo = overlayviewBoxTempCo.content.querySelector('.overlayviewCo');
          overlayviewBoxTempCo.content.querySelector('.titleCo').innerHTML = _coWorking[i].name;
          // clone the contentBlock above
          var contentCo = document.importNode(overlayviewBoxTempCo.content.querySelector('.overlayviewCo'), true);

          latCo = _coWorking[i].lat;
          lngCo = _coWorking[i].lng;


        // }

      }

      // console.log(contentCo);


      // Overlayview options
      var _overlayviewoptions = {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        // latCo: latCo,
        // lngCo: lngCo,
        // contentCo: contentCo,
        co: allCo,
        content: content,
        contentSmall: contentSmall,
        click: openInfobox,
        hide: closeOverlay,
        marker: _marker.element,
        map: _map.map
      }

      var overlayview = new OverlayView(_overlayviewoptions);

      _overlayviews.push(overlayview);
      _marker.setOverlayView(overlayview);

    });
  }


  function mouseout () {

    this.overlayview.hide();

    if (this.title === _current) {

      this.setIcon({ url: './assets/images/circleCurrent.svg' });

    } else {

      this.setIcon({ url: './assets/images/circle.svg' });

    }
    
  }

  function mouseover () {

    this.overlayview.show();
    
    if (this.title === _current) {

      this.setIcon({ url: './assets/images/circleCurrentLarge.svg' });

    } else {

      this.setIcon({ url: './assets/images/circle-large.svg' });

    }

  }

  function openWindow() {

    for (i = 0; i < _overlayviews.length; i++) { 

        _overlayviews[i].hideClick();

    }

    this.overlayview.click();

    var _lat = this.position.lat();
    var _lng = this.position.lng();

    _map.panTo(_lat, _lng);

  }

  function openInfobox() {
    
    this.overlayview.hideClick();

    var data = {
      title: this.title,
      weather: this.weather
    };

    Peach.render('.infobox-template', { data: data }, true);

  }

  function closeOverlay () {

    this.overlayview.hideClick();

  }

}



module.exports = Maps;