var infoWindow;
var map;

var trail;

var pos;
var poly;

var polygonCoords = [];
var polyMarkers =[{lat: 30.287200799999997, lng: -97.7288768}]; //THIS DOES THE JOB OF 26

//FIND USER
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { 
        zoom: 20
<<<<<<< HEAD
	});
	infoWindow = new google.maps.InfoWindow;
    
	//GEOLOCATION 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        	pos = {
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
        	};
=======
    });
    infoWindow = new google.maps.InfoWindow;
    
    //GEOLOCATION 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
>>>>>>> 88543b8681593a2a03bf6b775a975a8e20eb15b6
            //pushes geolocation to array for markers readabale format
            // polyMarkers.push(pos); ---CURRENTLY DOESN'T WORK

            //Pushes geolocation coords to polygonCoords array in area readable format
            polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));

            //Shows map over geolocation coordinates
<<<<<<< HEAD
        	infoWindow.setPosition(pos);
        	infoWindow.setContent('Start');
        	infoWindow.open(map);
        	map.setCenter(pos);
            poly.setMap(map);
    	}, 
    	function() {
=======
            infoWindow.setPosition(pos);
            infoWindow.setContent('Start');
            infoWindow.open(map);
            map.setCenter(pos);
            poly.setMap(map);
        }, 
        function() {
>>>>>>> 88543b8681593a2a03bf6b775a975a8e20eb15b6
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // PINS AND POLYGONS
    poly = new google.maps.Polygon({
        paths: polyMarkers,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    poly.setMap(map);

<<<<<<< HEAD
	map.addListener('click', addMarker);
=======
    map.addListener('click', addMarker);
>>>>>>> 88543b8681593a2a03bf6b775a975a8e20eb15b6
    map.addListener('click', addToCompute);
    map.addListener('click', getArea);
};

//COMPUTES AREA EVERY TIME A NEW PIN IS ADDED 
function getArea() {
    var area = google.maps.geometry.spherical.computeArea(polygonCoords);
    console.log(area);
}

//GET PIN LOCATION AND ADD COORDIINATES TO AREA ARRAY
function addToCompute(event) {
    polygonCoords = poly.getPath();
    polygonCoords.push(event.latLng)
};

//DROP PIN AND DRAW LINE ON CLICK
function addMarker(event) {
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 88543b8681593a2a03bf6b775a975a8e20eb15b6
