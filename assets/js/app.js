let infoWindow;
let map;
let pos;
let poly;
let polygonCoords = [];
let polyMarkers = [];
let weatherPos;
let area;
let posInterval;
let currentCondition;
let currentCity;

//FIND USER
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20
    });
    infoWindow = new google.maps.InfoWindow;

    //GEOLOCATION
    if (navigator.geolocation) {
        getPos();
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    $("#logo").on("click", getNewPos);

        function getNewPos() {
          posInterval = setInterval(getLocation, 5000);
        }

        function getLocation() {
          getPos();
          addMarker();
          addToCompute();
        }
};

//FUNCTIONS
function addMarker() {
    let path = poly.getPath();

    path.push(new google.maps.LatLng(pos));
    // Add a new marker at the new plotted point on the polyline.
    let marker = new google.maps.Marker({
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
    area = Math.floor(google.maps.geometry.spherical.computeArea(polygonCoords));
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};

function getPos() {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        let lat = pos.lat;
        let lng = pos.lng;
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=5a7c8dc5e0729631e1b2797c906928ed";

        $.ajax({
          url: weatherURL,
          method: "GET"
        }).done(function(response) {
          currentCondition=(response.weather[0].main);
          currentCity=(response.name);

          let icon = "https://openweathermap.org/img/w/"+response.weather[0].icon+".png";
          let iconImg = $("<img src=\""+icon+"\">");
          let mainDiv = $("<div>").attr("id", "city");
          let iconDiv = $("<div>").attr("id", "icon");
          let tempDiv = $("<div>").attr("id", "temp");
          $("#conditions").append(mainDiv);
          $("#city").append(response.name + ", " + response.sys.country);
          $("#conditions").append(iconDiv);
          $("#icon").append(iconImg);
          $("#conditions").append(tempDiv);
          $("#temp").append(Math.floor(response.main.temp * 9/5 - 459.67)+ "°F");
        });

        polyMarkers.push(pos);

        //Pushes geolocation coords to polygonCoords array in area readable format
        polygonCoords.push(new google.maps.LatLng(pos.lat, pos.lng));

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


 $(document).ready(function() {

  let config = {
    apiKey: "AIzaSyCBOUMDSCm0TrHG0vmNwZJC7rAxSizcM2A",
    authDomain: "street-tron.firebaseapp.com",
    databaseURL: "https://street-tron.firebaseio.com",
    projectId: "street-tron",
    storageBucket: "",
    messagingSenderId: "346019655912"
  };

firebase.initializeApp(config);

let database = firebase.database();

// Initialize letiables

let score;
let currentTemp = 0;
let currentCond = currentCondition;
let currentPlace = currentCity;
let scorearray = [];
let highscorearray = [];
let newscorearray = [];

// Function to determine the correct order of the high scores
function bubbleSort(arr) {

  let end = arr.length - 1;

  sorted = true;
  for (let i = 0; i < end; i++) {

    if (arr[i] < arr[i + 1]) {

      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }
}

let clockRunning = false;
let time = 60;

// funtion to finish the game gets called by either a timeout or a submit
function endgame(){
  score = area;
  // hide the questions
  $(".wrapper").addClass("hidden");
  //show the results by removing them from the hidden class
  $(".results").removeClass("hidden");
  //Remove the restart button from the hidden class
  $(".reinit").removeClass("hidden");

      // Stop the counter
      clearInterval(posInterval);
      clearInterval(intervalId);
    clockRunning = false;
   $("#display").text("Over");

let localhighscore=(localStorage.getItem("highscore"));

if (localhighscore == null){
  localhighscore = 0;
}

if (score > localhighscore){
         localStorage.setItem("highscore", score);
}
      // And display that name for the user using "localStorage.getItem"
      $("#localhigh").text(localStorage.getItem("highscore"));

    //Output the score to the html IDs
    $("#score").text(score);

// Assign the new score to the bottom core array if it is higher than the lowest in the list
if (score > scorearray[8]){

scorearray[8]=score;
    // Get the modal to enter the new user initials
let modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

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
  let highscorer = $("#highscore-name-input").val().trim();

  // // Creates local "temporary" object for holding new highscore data
  let newHigh = {
    name: highscorer,
    place: currentPlace,
    score: score,
    weathercond: currentCond
  };

// Sort the scorearray
do {
  bubbleSort(scorearray);
} while (!sorted);

let newindex=scorearray.indexOf(score);

// Delete the lowest score of the old table
highscorearray[8] = null;

//Add the new hig score to the correct element of the array
highscorearray.splice(newindex,0, newHigh);

let table = document.getElementById("score-table");

// Clear the old table in the HTML
while(table.rows.length > 0) {
  table.deleteRow(0);
}

for (let n = 0; n < 9; n++){
  // // Uploads highscore data to the database
newscorearray[n]=highscorearray[n];
}

// Reset the arrays
scorearray = [];
highscorearray = [];
// Clear database ahead of a write
database.ref().set(null);

for (let j = 0; j < 9; j++){
  // // Uploads highscore data to the database

  database.ref().push(newscorearray[j]);
}
});

// 3. Create Firebase event for adding hignhscore to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a letiable.
  let HighName = childSnapshot.val().name;
  let HighScore = childSnapshot.val().score;
  let HighPlace = childSnapshot.val().place;
  let HighCond = childSnapshot.val().weathercond;

//Save the highscores to a local array
  highscorearray.push(childSnapshot.val());
  scorearray.push(childSnapshot.val().score);


  // Add each highscorer's data into the table
  $("#score-table > tbody").append("<tr><td>" + HighName + "</td><td>" + HighScore + "</td><td>" +
  HighPlace + "</td><td>" + HighCond + "</td><td>");
});

function maingame(){

clockRunning = false;
time = 60;

// Get the modal
let modal = document.getElementById('instModal');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

 //Listen for the main click image to be pressed to initiate the game
      $(".initiate").on("click", function() {
      // Remove the questions from the hidden class so that the user can see them
      $(".wrapper").removeClass("hidden");
      //Hide the initiation elements by adding them to the hidden class
      $(".initiate").addClass("hidden");
      $("#init").addClass("hidden");
      $("#weather").addClass("hidden");
      $("#structions").addClass("hidden");

    //Setup the counter to count in seconds
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }

      });
//This is the re-init function to restart the game.
      $(".reinit").on("click", function() {
      location.reload();
      // $(".wrapper").removeClass("hidden");
      // $(".initiate").addClass("hidden");
      // $("#init").addClass("hidden");
      // $(".reinit").addClass("hidden");
      // $(".results").addClass("hidden");

//Reset letiables.
      clockRunning = false;
      time = 60;

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
    if (time == 0){
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
