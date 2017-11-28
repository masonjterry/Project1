var poly;
var map;
var infoWindow

// Define the LatLng coordinates for the polygon's path.
var polygonCoords = [
    {lat: 30.2870379, lng: -97.7313409}
];

//find user location
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.2870379, lng: -97.7313409},
        zoom: 17
	});
	infoWindow = new google.maps.InfoWindow;

	//GEOLOCATION 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        	pos = {
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
        	};

        	infoWindow.setPosition(pos);
        	infoWindow.setContent('Location found.');
        	infoWindow.open(map);
        	map.setCenter(pos);
    	}, 

    	function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // PINS AND POLYGONS
    poly = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    poly.setMap(map);

	map.addListener('click', addLatLng);
};


//DROP PIN AND DRAW LINE ON CLICK
function addLatLng(event) {
    var path = poly.getPath();

    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);

    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
    	position: event.latLng,
        title: '#' + path.getLength(),
        map: map
    });
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};