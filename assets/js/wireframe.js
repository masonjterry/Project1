var infoWindow;
var map;

var trail;

var pos;
var poly;

var area;
var locationArr = [];
var polygonCoords = [];
var polyMarkers =[{lat: 30.287200799999997, lng: -97.7288768}]; //THIS DOES THE JOB OF 26

//FIND USER
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;

    //GEOLOCATION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //Pushes geolocation coords to polygonCoords array in area readable format
            polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lng+"&appid=5a7c8dc5e0729631e1b2797c906928ed";

    $.ajax({
      url: weatherURL,
      method: "GET"
    }).done(function(response) {
      var icon = "https://openweathermap.org/img/w/"+response.weather[0].icon+".png";
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
            //infoWindow.setContent('Start');
            //infoWindow.open(map);
            map.setCenter(pos);
            poly.setMap(map);
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
        paths: polyMarkers,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    poly.setMap(map);

    map.addListener('click', addMarker);
    map.addListener('click', addToCompute);
    map.addListener('click', getArea);
};

//COMPUTES AREA EVERY TIME A NEW PIN IS ADDED
function getArea() {
    area = google.maps.geometry.spherical.computeArea(polygonCoords);
    console.log("area", Math.floor(area));
}

//GET PIN LOCATION AND ADD COORDIINATES TO AREA ARRAY
function addToCompute(event) {
    polygonCoords = poly.getPath();
    polygonCoords.push(event.latLng);
};

//DROP PIN AND DRAW LINE ON CLICK
function addMarker(event) {
  // console.log("event.fa.x", event.fa.x);
  // console.log("event.fa.y", event.fa.y);
    // Because path is an MVCArray, we can simply append a new coordinate
    var path = poly.getPath();
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

$(document).ready(function() {


  var config = {
    apiKey: "AIzaSyBVKQZeo1H6cABaYb09pdm4Ez2ZXhhSY_A",
    authDomain: "streettron-1d8c5.firebaseapp.com",
    databaseURL: "https://streettron-1d8c5.firebaseio.com",
    projectId: "streettron-1d8c5",
    storageBucket: "",
    messagingSenderId: "679629315262"
};

firebase.initializeApp(config);

var database = firebase.database();

// Initialize Variables

var score=area;
var currentTemp=0;
var currentCond="";
var currentPlace="";
var scorearray=[];
var highscorearray=[];
var newscorearray=[];

// Function to determine the correct order of the high scores
function bubbleSort(arr) {
  // everytime we iterate over the array, we know at least the last value has
  // been sorted, so we don't have to iterate to that index again
  var end = arr.length - 1;
  // set flag to true, if we have to swap any values, the flag will be then set
  // to false
  sorted = true;
  for (var i = 0; i < end; i++) {
    // if the value of the current index is less than the next index, we know
    // the list is not properly sorted and swap their positions.
    if (arr[i] < arr[i + 1]) {
      // we have to create a temporary variable to hold a value, so we can swap
      // the values of the two positions
      var temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }
}

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
    $("#score").text(score);

// Assign the new score to the bottom core array if it is higher than the lowest in the list
if (score > scorearray[8]){

scorearray[8]=score;
    // Get the modal to enter the new user initials
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

}

}
// This code runs after the user submits his name

$(".close").on("click", function(event) {
  event.preventDefault();

  // Grabs new Highscorer initials
  var highscorer = $("#highscore-name-input").val().trim();

  // // Creates local "temporary" object for holding new highscore data
  var newHigh = {
    name: highscorer,
    place: currentPlace,
    score: score,
    weathercond: currentCond
  };

// Sort the scorearray
do {
  bubbleSort(scorearray);
} while (!sorted);

var newindex=scorearray.indexOf(score);

// Delete the lowest score of the old table
highscorearray[8]=null;

//Add the new hig score to the correct element of the array
highscorearray.splice(newindex,0, newHigh);

var table = document.getElementById("score-table");

// Clear the old table in the HTML
while(table.rows.length > 0) {
  table.deleteRow(0);
}

for (var n=0; n<9; n++){
  // // Uploads highscore data to the database
newscorearray[n]=highscorearray[n];

}

// Reset the arrays

scorearray=[];
highscorearray=[];
// Clear database ahead of a write

database.ref().set(null);

for (var j=0; j<9; j++){
  // // Uploads highscore data to the database

  database.ref().push(newscorearray[j]);

}

});


// 3. Create Firebase event for adding hignhscore to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var HighName = childSnapshot.val().name;
  var HighScore = childSnapshot.val().score;
  var HighPlace = childSnapshot.val().place;
  var HighCond = childSnapshot.val().weathercond;

//Save the highscores to a local array
  highscorearray.push(childSnapshot.val());
  scorearray.push(childSnapshot.val().score);


  // Add each highscorer's data into the table
  $("#score-table > tbody").append("<tr><td>" + HighName + "</td><td>" + HighScore + "</td><td>" +
  HighPlace + "</td><td>" + HighCond + "</td><td>");
});


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
    getUserLocation();
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

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };
      console.log("pos", pos);
      $('#location').html(
        '<div style="color:white;text-align:center;"> lat: ' +
          pos.lat +
          ', lng: ' +
          pos.lng +
        '</div>'
      );
      //Pushes geolocation coords to polygonCoords array in area readable format
      polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));
          });
      };
