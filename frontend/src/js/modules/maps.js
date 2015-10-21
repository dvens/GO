var maps = require('google-maps');

function Maps() {

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
            center: {lat: 52.310539, lng: 4.768273},
            styles: styleArray,
            zoom: 2,
            // Remove Default UI Controls
            disableDefaultUI: true
          });
      });

    }
  
  initMap();


}

module.exports = Maps;
