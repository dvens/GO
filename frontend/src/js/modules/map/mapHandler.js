// UI 
var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var OverlayView = require('./../../ui/maps/overlayView');
var Infobox = require('./../../ui/maps/infobox');
var StorageHandler = require('./../../ui/localstorage/storageHandler');

// Helpers
var JSONLoader = require('./../../helpers/jsonLoader');
var Utils = require('./../../helpers/utils');

// Other
var Peach = require('./../../vendor/peach-min');
var config = require('./config');

function Maps() {

  var _loader = new JSONLoader();
  var _map = new GeoMap('#map', config);
  var _storageHandler = new StorageHandler();
  var _current = 'Amsterdam';
  var _storageBoxes;
  var _overlayviews = [];

  _loader.load('./src/data/places.json', setMarkers);

  function setMarkers() {

    var _markers = this;
    var _maxValues = {
      apartment: Utils.getMax(this, 'apartment'),
      airbnb: Utils.getMax(this, 'airbnb'),
      hotel: Utils.getMax(this, 'hotel'),
    };

    _markers.forEach(function(marker) {

      function currentCheck() {
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
          url: currentCheck()
        },
        audio: './assets/images/button.mp3',
        title: marker.city,
        weather: marker.weather,
        climate: marker.climate,
        wifi: marker.wifi,
        currency: marker['kind-of-valuta'],
        hotel: marker.hotel,
        airbnb: marker.airbnb,
        apartment: marker.apartment,
        developers: marker.developers,
        designers: marker.designers,
        coworking: marker['co-workingspaces'],
        infobox: new Infobox(_maxValues),
        cost: marker['cost-of-living'],
        click: openWindow,
        mouseover: mouseover,
        mouseout: mouseout,
      };

      // add the marker
      var _marker = new GeoMarker(_options);
      _map.addMarker(_marker.element);

      var _dataOverlayView = {
        title: marker.city,
        cost: marker['cost-of-living'],
        weather: marker.weather,
        wifi: marker.wifi,
        img: marker.img,
        climate: marker.climate
      }

      var _template = '.overlayviewTemp';
      var content = Peach.render(_template, { data: _dataOverlayView }, 'render');

      var _templateSmall = '.overlayviewTempSmall';
      var contentSmall = Peach.render(_templateSmall, { data: _dataOverlayView.title }, 'render');

      var _overlayviewoptions = {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        content: content,
        templateType: _template,
        click: openInfobox,
        hide: closeOverlay,
        marker: _marker.element,
        map: _map.map
      }

      var _overlayviewoptionsSmall = {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        content: contentSmall,
        templateType: _templateSmall,
        click: openInfobox,
        hide: closeOverlay,
        marker: _marker.element,
        map: _map.map
      }

      var overlayview = new OverlayView(_overlayviewoptions);
      _marker.setOverlayView(overlayview);
      
      var smallOverlayview = new OverlayView(_overlayviewoptionsSmall);
      _marker.setSmallOverlayView(smallOverlayview);

      _overlayviews.push(overlayview);

    });
    
    // Search for current and load current
    _map.markers.forEach(function(marker) {

      if(marker.title === _current) {
        openInfobox(marker);
      }

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

    _overlayviews.forEach(function(overlay) {
      
      overlay.hideClick();

    });

    this.overlayview.click();

    var _lat = this.position.lat();
    var _lng = this.position.lng();

    _map.panTo(_lat, _lng);

  }

  function openInfobox(marker) {
    
    var _this = this;
    var _tmpl = '.infobox-template';

    if(marker) {
      _this = marker;
      _tmpl = '.infobox-template-current';
    } 

    if( this.overlayview ) {

      this.overlayview.hideClick();

    }
    
    var _data = {
      title: _this.title,
      weather: _this.weather,
      wifi: _this.wifi,
      climate: _this.climate,
      currency: _this.currency,
      airbnb: _this.airbnb,
      hotel: _this.hotel,
      apartment: _this.apartment,
      developers: _this.developers,
      designers: _this.designers,
      coworking: _this.coworking
    };

    _this.infobox.render(_tmpl, _data);

    _storageHandler.updateInfoBoxes();
    _storageBoxes = _storageHandler.getInfoboxes();
    setCompareSlider();

  }

  function closeOverlay () {

    this.overlayview.hideClick();

  }

  function setCompareSlider() {

    if(_storageBoxes.length >= 2) {

      _storageBoxes.forEach(function(storagebox, key) {

        var _buttons = [].slice.call(storagebox.querySelectorAll('.infobox__bar'));
        var _boxkey = key;
        var _storageBox = storagebox;
        
        var _slider = _storageBox.querySelector('.infobox__slider');
        var _span = _storageBox.querySelector('span');

        _buttons.forEach(function(button, key) {

          button.addEventListener('mouseover', function() {

            var _class = this.classList;

            if(_boxkey == 0) {

              var element = _class[1];
              moveSlider(element, 1);

            }

            if(_boxkey == 1) {

              console.log('boxkey is 1');

            }

            if(_boxkey == 2) {

              console.log('boxkey is 2');

            }

          });

        });


      });  

      // var _slider = this.querySelector('.infobox__slider');
      // var _span = this.querySelector('span');
      
      // _slider.classList.add('active');
      // _slider.style.left = _span.style.width;

    }
    
  }

  function moveSlider(element, key1, key2) {

    var _firstEl;
    
    // if( element == 'hotel' ) {
      _firstEl = _storageBoxes[key1].querySelector('.infobox__bar.hotel');
    //}
    
    console.log(_firstEl); 

    //var _firstSecond = _storageBoxes[key2].querySelector('.infobox__slider');
  }

}



module.exports = Maps;