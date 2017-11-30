 $(document).ready(function() {


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
