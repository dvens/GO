var GeoMap = require('./../ui/maps/maps');

function Maps() {

    // Load the Google Maps into your Page
    function initMap() {

      // Specify features and elements to define styles.
      var styleArray = [{
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.locality",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": "-100"
                  },
                  {
                      "lightness": 45
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#feca08"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ]

      //Create a map object and specify the DOM element for display.
      // maps.load(function(google) {
      //     var map = new google.maps.Map(document.getElementById('map'), {
      //       center: {lat: 52.310539, lng: 4.768273},
      //       styles: styleArray,
      //       zoom: 2,
      //       minZoom: 2,
      //       maxZoom: 15,
      //       disableDefaultUI: true
      //     });
      // });

      var options = {
        center: { lat: 52.310539, lng: 4.768273 },
        styles: styleArray,
        zoom: 2,
        minZoom: 2,
        maxZoom: 15,
        disableDefaultUI: true
      }

      var loader = new JSONLoader('voorbeeldurl');
      var map = new GeoMap('#map', options);

      loader.forEach(function(item){

        var _options = {
          position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
          title: item.city,
          weather: item.weather,
          cost: item['cost-of-living'], 
          icon: item.icon
        };

        var marker = new GeoMarker(options);
        map.addMarkers(marker);

      });

      map.markers.forEach(function(marker) {

        marker.click(showContent());
        marker.mouseout(showContent());
        marker.mouseover(showContent());

      });

      // Load JSON 
      // For each item create new marker
      // Add marker to map
      // Add infowindow data.

    }

  initMap();
}

module.exports = Maps;
