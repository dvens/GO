function Filter(element, markers) {

	var _this = this;
	var _element = document.querySelector(element);
	var _markers = markers;
	var _wifiFilters;
	var _climateFilters;
	var _costFilters;
	var _filteredMarkers = [];

	function init() {

		_allFilters = [].slice.call(_element.querySelectorAll('.filter__item-options input'));
		initEvents();

	}	

	function initEvents() {
		
		_allFilters.forEach(function(filter) {

			filter.addEventListener('change', function() {

				console.log("Checked: " + this.checked );
				filterMarker(this.value, this.checked);

			});

		});

	}

	// for each this.checked = vergelijk alleen deze met elkaar, dus laat alle unchecked filters buiten beschouwing 

	// Derde parameter toevoegen of er al gefilterd is!!
		// all false = 

	function filterMarker(value, checked) {

		if( value == 20 ) {

				if( checked === true && _filteredMarkers.length === 0 ) {

					_markers.forEach(function(marker) {

						if( marker.wifi >= 20 && marker.wifi < 50) {
							// If wifi is higher or equal to 20 show
							marker.setVisible(true);

							_filteredMarkers.push(marker);

						} else {
							// If wifi is lower to 20 hide
							marker.setVisible(false);
						}

					});	

				} else if ( checked === true && _filteredMarkers.length > 0 ) {

					_filteredMarkers.forEach(function(filterdMarker) {

						if( filterdMarker.wifi >= 20 && filterdMarker.wifi < 50 ) {
							// If wifi is higher or equal to 20 show
							filterdMarker.setVisible(true);

							_filteredMarkers.push(filterdMarker);

						} else {
							// If wifi is lower to 20 hide
							filterdMarker.setVisible(false);
						}

						filterdMarker.setVisible(true);

					});	

				} else if (checked === false && _filteredMarkers.length > 0) {

						for(var i = _filteredMarkers.length; i--;){
							if (_filteredMarkers[i].wifi >= 20 && _filteredMarkers[i].wifi < 50 ){

								_filteredMarkers.splice(i, 1);

							}

							_filteredMarkers.forEach(function(marker) {
							// Als de checkbox uit is
								marker.setVisible(true);
							});
						}

					if (_filteredMarkers.length === 0) {
						_markers.forEach(function(marker) {
						// Als de checkbox uit is
							marker.setVisible(true);
						});
					}

				} else {

					_markers.forEach(function(marker) {
					// Als de checkbox uit is
						marker.setVisible(true);
					});

				}

		} 	

		if ( value == 50 ) {

			if( checked === true && _filteredMarkers.length === 0 ) {

					_markers.forEach(function(marker) {

						if( marker.wifi >= 50 ) {
							// If wifi is higher or equal to 50 show

							_filteredMarkers.push(marker);

							marker.setVisible(true);

						} else {
							// If wifi is lower to 50 hide
							marker.setVisible(false);
						}

					});	

				} else if ( checked === true && _filteredMarkers.length > 0 ) {

					_filteredMarkers.forEach(function(filterdMarker) {

						if( filterdMarker.wifi >= 50 ) {
							// If wifi is higher or equal to 50 show

							_filteredMarkers.push(filterdMarker);

							filterdMarker.setVisible(true);

						} else {
							// If wifi is lower to 50 hide
							filterdMarker.setVisible(false);
						}

						filterdMarker.setVisible(true);

					});	

				} else if (checked === false && _filteredMarkers.length > 0) {

						for(var i = _filteredMarkers.length; i--;){
							if (_filteredMarkers[i].wifi >= 50 ){

								_filteredMarkers.splice(i, 1);

								console.log(_filteredMarkers);
							}

							_filteredMarkers.forEach(function(marker) {
							// Als de checkbox uit is
								marker.setVisible(true);
							});
						}


					if (_filteredMarkers.length === 0) {
						_markers.forEach(function(marker) {
						// Als de checkbox uit is
							marker.setVisible(true);
						});
					}

				} else {

					_markers.forEach(function(marker) {
					// Als de checkbox uit is
						marker.setVisible(true);
					});

				}

				console.log(_filteredMarkers);

		}

		if( value == 1499 ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.cost <= 1499 ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 1500 ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.cost >= 1500 && marker.cost <= 2000 ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 2000 ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.cost >= 2000 ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 'sun' ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.climate == 'sun' ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 'rain' ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.climate == 'rain' ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 'cloudy' ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.climate == 'cloudy' ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		if( value == 'snow' ) {

			_markers.forEach(function(marker) {

				if( checked === true ) {
					
					if( marker.climate == 'snow' ) {
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}

				} else {
				
					marker.setVisible(true);

				}

			});

		}

		/*if( value == 1499 ) {

			console.log('1499');
			_markers.forEach(function(marker) {


			});

		}*/

	}

	init();

}

module.exports = Filter;