 $(document).ready(function() {


// var map, infoWindow;
  // function initMap() {
   //  map = new google.maps.Map(document.getElementById('map'), {
   //    center: {lat: 30.267153, lng: -97.7430608},
   //    zoom: 18
   //  });
   //  infoWindow = new google.maps.InfoWindow;

   // if (navigator.geolocation) {
   //    navigator.geolocation.getCurrentPosition(function(position) {
   //      var pos = {
   //        lat: position.coords.latitude,
   //        lng: position.coords.longitude
   //      };
var lat=30.26715;
var lng=-97.7430608;
       var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=5a7c8dc5e0729631e1b2797c906928ed";

       $.ajax({
          url: weatherURL,
          method: "GET"
        }).done(function(response) {
          // console.log("response", response);
          // console.log("main", response.weather[0].main);
          // console.log("temperature", Math.floor(response.main.temp * 9/5 - 459.67));
          // console.log("icon", response.weather[0].icon);
          var icon = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png";
          var iconImg = $("<img src=\""+icon+"\">");
          var mainDiv = $("<div>").attr("id", "city");
          var iconDiv = $("<div>").attr("id", "icon");
          var tempDiv = $("<div>").attr("id", "temp");
          $("#conditions").append(mainDiv);
          $("#city").append(response.name + ", " + response.sys.country);
          $("#conditions").append(iconDiv);
          $("#icon").append(iconImg);
          $("#conditions").append(tempDiv);
          $("#temp").append(Math.floor(response.main.temp * 9/5 - 459.67)+ "°F");
        });

 //       infoWindow.setPosition(pos);
 //        infoWindow.setContent('Location found.');
 //        infoWindow.open(map);
 //        map.setCenter(pos);
 //      }, function() {
 //        handleLocationError(true, infoWindow, map.getCenter());
 //      });
 //    } else {
 //      // If Browser doesn't support Geolocation
 //      handleLocationError(false, infoWindow, map.getCenter());
 //    }
 //  }

 // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 //    infoWindow.setPosition(pos);
 //    infoWindow.setContent(browserHasGeolocation ?
 //                          'Error: The Geolocation service failed.' :
 //                          'Error: Your browser doesn\'t support geolocation.');
 //    infoWindow.open(map);
 //  // }



var clockRunning = false;
var time=30;


// funtion to finish the game gets called by either a timeout or a submit
function endgame(){
  // hide the questions
  $(".wrapper").addClass("hidden");
  //show the results by removing them from the hidden class
  $(".results").removeClass("hidden");
  //Remove the restart button from the hidden class
  $(".reinit").removeClass("hidden");

      // Stop the counter
	    clearInterval(intervalId);
    clockRunning = false;
	 $("#display").text("Over");

    //Output the score to the html IDs
    $("#score").text("0000");

}



function maingame(){
  console.log("start of game")

clockRunning = false;
time=30;
 //Listen for the main click image to be pressed to initiate the game
      $(".initiate").on("click", function() {    
      // Remove the questions from the hidden class so that the user can see them
      $(".wrapper").removeClass("hidden");
      //Hide the initiation elements by adding them to the hidden class
      $(".initiate").addClass("hidden");
      $("#init").addClass("hidden");
      $("#weather").addClass("hidden");

    //Setup the counter to count in seconds
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }

      });
//This is the re-init function to restart the game.
      $(".reinit").on("click", function() {    

      $(".wrapper").removeClass("hidden");
      $(".initiate").addClass("hidden");
      $("#init").addClass("hidden");
      $(".reinit").addClass("hidden");
      $(".results").addClass("hidden");


//Reset variables.

      clockRunning = false;
      time=30;

//Initialize clock to 1 second intervals
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }

      });

//Counting function...run the endgame function when the time reaches 0
    function count() {
    time--;
    $("#display").text(time);
    if (time==0){
      endgame();
    }
  }

//Once the user is happy with the performance the submit button ends the game
      $("#submit").on("click", function() {    
endgame();

      });

}
     


maingame();


    });
