var poly;
var map;
var infoWindow;
var polygonCoords = [{lat: 30.2870379, lng: -97.7313409}];
var pos = {};

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

          polygonCoords = [{
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
        	}];

        var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lng+"&appid=5a7c8dc5e0729631e1b2797c906928ed";

        $.ajax({
          url: weatherURL,
          method: "GET"
        }).done(function(response) {
          console.log("response", response);
          console.log("main", response.weather[0].main);
          console.log("temperature", Math.floor(response.main.temp * 9/5 - 459.67));
          console.log("icon", response.weather[0].icon);
          var icon = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png";
          var iconImg = $("<img src=\""+icon+"\">");
          var mainDiv = $("<div>").attr("id", "city");
          var iconDiv = $("<div>").attr("id", "icon");
          var tempDiv = $("<div>").attr("id", "temp");
          $("#weather").append(mainDiv);
          $("#city").append(response.name + ", " + response.sys.country);
          $("#weather").append(iconDiv);
          $("#icon").append(iconImg);
          $("#weather").append(tempDiv);
          $("#temp").append(Math.floor(response.main.temp * 9/5 - 459.67)+ "°F");
        });

        	infoWindow.setPosition(pos);
        	infoWindow.setContent('Start');
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
