var maps = require('google-maps');
var JSONLoader = require('./../helpers/jsonLoader');
//var test = require('./../ui/maps/mapps');

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

      // Create a map object and specify the DOM element for display.
      maps.load(function(google) {
          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.310539, lng: 4.768273},
            styles: styleArray,
            zoom: 2,
            minZoom: 2,
            maxZoom: 15,
            disableDefaultUI: true
          });

          // check the current Latt and Lang
          // if you reached the top of the map -> dont let the y-as go above the top of the map
          var checkBounds = (function() {
            var mapBounds = map.getBounds();
            var currLat = map.getCenter().lat();
            var currLng = map.getCenter().lng();
            var newLat = currLat;
            var newLng = currLng;
            if(mapBounds.getNorthEast().lat() > 84) {
              newLat = currLat - (mapBounds.getNorthEast().lat() - 84);
            } else if(mapBounds.getSouthWest().lat() < -84) {
              newLat = currLng + (-84 - mapBounds.getSouthWest().lat());
            }
            if((newLat != currLat) || (newLng != currLng)) {
              var newCenter = new google.maps.LatLng(newLat, newLng, true);
              map.panTo(newCenter);
            }
          });
          // If the center of the map changes, run checkBounds
          map.addListener('center_changed', function() {
            checkBounds();
          });



          var loader = new JSONLoader('./src/data/places.json');
          var markers = [];

          loader.forEach(function(item) {
              var lng = parseFloat(item.lng);
              var lat = parseFloat(item.lat);
              var city = item.city;
              var weather = item.weather;
              var cost = item['cost-of-living'];
              var icon = '/assets/images/circle.svg';

              var marker = new google.maps.Marker({
                position: {lat: lat, lng: lng},
                map: map,
                title: city,
                weather: weather,
                cost: cost,
                icon: icon
              });

              markers.push(marker);
          });

          var infowindow = new google.maps.InfoWindow();
          var click;

          infowindow.classList = "infowindow";

          for (var i = 0; i < markers.length; i++) {
            markers[i].addListener('mouseover', function() {
              var title = this.title;
              var pos = this.getPosition();
              // moet nog met css in px/em gebeuren. Nu pakken we de lang/latt en dat wil je niet
              var lat = pos.lat() + 2;
              var lng = pos.lng();
              click = false;
              var smallContent = '<section class"test">' + '<h1>' + title + '</h1>' + '</section>';

              if (click != true) {
                infowindow.setContent(smallContent);
                infowindow.setPosition({lat: lat, lng: lng});
                infowindow.open(map);
              }
            });

            markers[i].addListener('mouseout', function() {
              if (click != true) {
                infowindow.close(map);
              }
            });

            markers[i].addListener('click', function() {
              var title = this.title;
              var weather = this.weather;
              var cost = this.cost;
              click = true;
              var largeContent = '<section class"test">' + '<h1>' + title + '</h1>' + '<span>' + weather + '°C' + '</span>' + '<span>' + '€' + cost + '</span>' + '<a href="/">' + "view" + '</a>' + '</section>';

              infowindow.setContent(largeContent);
            });
          }
      });
    }
  initMap();
}

module.exports = Maps;
