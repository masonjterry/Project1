// Google Map
var map, infoWindow;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.267153, lng: -97.7430608},
      zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

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
          $("#main").append(response.weather[0].main);
          $("#icon").append(iconImg);
          $("#temp").append(Math.floor(response.main.temp * 9/5 - 459.67));
        });

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // If Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
