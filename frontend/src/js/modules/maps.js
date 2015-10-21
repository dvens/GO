var maps = require('google-maps');

function MapsClass() {

    // Load the Google Maps into your Page
    function initMap() {

      // Specify features and elements to define styles.
      var styleArray = [
        {
          featureType: "all",
          stylers: [
           { saturation: -80 }
          ]
        },{
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            { hue: "#00ffee" },
            { saturation: 50 }
          ]
        },{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

      // Create a map object and specify the DOM element for display.
     

      maps.load(function(google) {
          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            scrollwheel: false,
            // Apply the map style array to the map.
            styles: styleArray,
            zoom: 8
          });
      });

    }
  
  initMap();


}

module.exports = MapsClass;