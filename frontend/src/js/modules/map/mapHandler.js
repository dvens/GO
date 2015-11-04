var GeoMap = require('./../../ui/maps/maps');
var GeoMarker = require('./../../ui/maps/marker');
var JSONLoader = require('./../../helpers/jsonLoader');
var Utils = require('./../../helpers/utils');
var OverlayView = require('./../../ui/maps/overlayView');
var Infobox = require('./../../ui/maps/infobox');
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
        type: 'normal'
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

      var _coWork = marker['co-workingspaces'];

      for ( i = 0; i < _coWork.length; i++ ) {

          if ( _coWork[i].name != '' ) {

              var _coOptions = {
                position: { lat: parseFloat(_coWork[i].lat), lng: parseFloat(_coWork[i].lng) },
                icon: {
                  url: './assets/images/circle.svg'
                },
                type: 'co',
                click: openWindow,
                mouseover: mouseover,
                mouseout: mouseout,
              };

              // add the marker
              var _coMarker = new GeoMarker(_coOptions);
              _map.addCoMarker(_coMarker.element);
            
              var _dataCoworking = {
                name: _coWork[i].name,
                distance: _coWork[i]['distance-airpot'],
                cost: _coWork[i].cost,
                lat: parseFloat(_coWork[i].lat),
                lng: parseFloat(_coWork[i].lng)
              }

              var _templateCo = '.overlayviewTempCo';
              var contentCo = Peach.render(_templateCo, { data: _dataCoworking }, 'render');

              var _overlayviewoptionsCo = {
                lat: parseFloat(_coWork[i].lat),
                lng: parseFloat(_coWork[i].lng),
                position: { lat: parseFloat(_coWork[i].lat), lng: parseFloat(_coWork[i].lng) },
                content: contentCo,
                templateType: _templateCo,
                click: openInfobox,
                hide: closeOverlay,
                marker: _coMarker.element,
                map: _map.map
              }

              var smallOverlayview = new OverlayView(_overlayviewoptionsSmall);
              _marker.setSmallOverlayView(smallOverlayview);

              var coOverlayview = new OverlayView(_overlayviewoptionsCo);
              _coMarker.setCoOverlayView(coOverlayview);   

          };
      } 

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
    
    if ( this.type === 'normal' ) {

      this.overlayview.hide();

    }

    if ( this.type === 'co' ) {

      this.coOverlayview.hide();
      
    }

    if (this.title === _current) {

      this.setIcon({ url: './assets/images/circleCurrent.svg' });

    } else {

      this.setIcon({ url: './assets/images/circle.svg' });

    }

    
  }

  function mouseover () {

    if ( this.type === 'normal' ) {

      this.overlayview.show();

    }

    if ( this.type === 'co' ) {

      this.coOverlayview.show();

    }

    
    if (this.title === _current) {

      this.setIcon({ url: './assets/images/circleCurrentLarge.svg' });

    } else {

      this.setIcon({ url: './assets/images/circle-large.svg' });

    }

  }

  function openWindow() {

    _overlayviews.forEach(function(overlay) {
      
      overlay.hideClick();
      if ( this.type === 'normal' ) {

        overlay.hideClick();

      }

      if ( this.type === 'co' ) {

        coOverlay.hideClick();

      }

    });

    if ( this.type === 'normal' ) {

      this.overlayview.click();

    }

    if ( this.type === 'co' ) {

      this.coOverlayview.click();

    }

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

      if ( this.type === 'normal' ) {

        this.overlayview.hideClick();

      }

      if ( this.type === 'co' ) {

        this.coOverlayview.hideClick();

      }

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

  }

  function closeOverlay () {

    if ( this.type === 'normal' ) {

      this.overlayview.hideClick();

    }

    if ( this.type === 'co' ) {

      this.coOverlayview.hideClick();

    }

  }

}



module.exports = Maps;