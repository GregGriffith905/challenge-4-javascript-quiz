// Get references to the elements
var startScreen = document.getElementById("start-screen");
var gameScreen = document.getElementById("game-screen");
var resultsScreen = document.getElementById("results-screen");

var startButton = document.getElementById("start-button");

var question = document.getElementById("questions");
var timerElement = document.getElementById("timer");


var gameTimeLeft = 60;  //timer will countdown from 60sec


function gameTimer(command){    //control the timer counting down and subtract 10 sec for wrong answer
    
    timer = setInterval (function (){
        if (command === "decrease") gameTimeLeft -= 10; //subtract 10secs
        if (gameTimeLeft < 0) gameTimeLeft = 0;         //dont let timer below 0 when 10 is subtracted    
        timerElement.textContent = "Timer: " + gameTimeLeft; //display time remaining
        gameTimeLeft--; //decrement time remaining after displaying so timer starts at 60

        if (gameTimeLeft < 0) { //stop timer and go to results screen
            clearInterval(timer); 
            gameScreen.classList.add("hide");
            resultsScreen.classList.remove("hide");//go to final screen
        }

        
        
        
    }, 1000)
    
}

// Start the quiz when "start quiz" button is pressed
function startQuiz() {
  
  startScreen.classList.add("hide");    //hide start screen
  gameScreen.classList.remove("hide");    //show question and answer choices
  gameTimer();
  nextQuestion();


}

// Add event listener to button
startButton.addEventListener("click", startQuiz);
