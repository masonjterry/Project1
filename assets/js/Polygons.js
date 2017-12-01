var infoWindow;
var map;
var trail;
var pos;
var poly;
var polygonCoords = [];
var polyMarkers = [];

//FIND USER
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20
    });
    infoWindow = new google.maps.InfoWindow;

    //GEOLOCATION
    if (navigator.geolocation) {
<<<<<<< HEAD
        getPos();
=======
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Pushes geolocation coords to polygonCoords array in area readable format
            polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));

    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lng+"&appid=5a7c8dc5e0729631e1b2797c906928ed";

    $.ajax({
      url: weatherURL,
      method: "GET"
    }).done(function(response) {
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

            //Shows map over geolocation coordinates
            infoWindow.setPosition(pos);
            infoWindow.setContent('Start');
            infoWindow.open(map);
            map.setCenter(pos);
            poly.setMap(map);
        },
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
>>>>>>> a28c728b075f2917f0587dd645736e023dbb69e3
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    map.addListener('click', addMarker);
    map.addListener('click', addToCompute);
    map.addListener('click', getArea);
};

<<<<<<< HEAD
$("#button").on("click", function() {
    getPos();
    addMarker();
    addToCompute();
});
    
//FUNCTIONS
function addMarker() {
=======
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
>>>>>>> a28c728b075f2917f0587dd645736e023dbb69e3
    var path = poly.getPath();
        console.log(pos);
    path.push(new google.maps.LatLng(pos));
    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
        position: (new google.maps.LatLng(pos)),
        title: '#' + path.getLength(),
        map: map
    });
};

function addToCompute() {
    polygonCoords = poly.getPath();
    polygonCoords.push(new google.maps.LatLng(pos));
};

function getArea() {
    var area = google.maps.geometry.spherical.computeArea(polygonCoords);
    console.log(Math.floor(area));
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};
<<<<<<< HEAD

function getPos() {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        polyMarkers.push(pos);
     
        //Pushes geolocation coords to polygonCoords array in area readable format
        polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));

        //Shows map over geolocation coordinates
        infoWindow.setPosition(pos);
        infoWindow.setContent('Start');
        infoWindow.open(map);
        map.setCenter(pos);

        getArea();

        poly = new google.maps.Polygon({
            paths: polyMarkers,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        poly.setMap(map);
    }, 

    function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
}    
// //COORDIINATES TO AREA ARRAY
// function addToCompute(event) {
//     polygonCoords = poly.getPath();
//     polygonCoords.push(pos);
// }

// function addMarker(event) {
//     var path = poly.getPath();
//     path.push(event.latLng);

//     var marker = new google.maps.Marker({
//         position: pos,
//         title: "#" + path.getLength(),
//         map: map
//     })
// }
=======
>>>>>>> a28c728b075f2917f0587dd645736e023dbb69e3
