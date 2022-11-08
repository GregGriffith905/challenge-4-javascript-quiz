var startScreen = document.getElementById("start-screen");  // Get references to the elements
var gameScreen = document.getElementById("game-screen");
var resultsScreen = document.getElementById("results-screen");
var scoresScreen = document.getElementById("scores-screen");
var startButton = document.getElementById("start-button");
var question = document.getElementById("question");
var timerElement = document.getElementById("timer");
var answerButtonsElement = document.getElementById("answer-buttons"); 
var answerResponse = document.getElementById("answer-response");
var submitButton = document.getElementById("submit-button");
var restartButton = document.getElementById("restart-button");
var clearScoresButton = document.getElementById("clear-scores-button");
var list = document.getElementById("list");
var viewHighScores = document.getElementById("view-high-scores");

var gameTimeLeft = 60;        //timer will countdown from 60sec
var questionIndex = 0;        //index of next question to be shown
var points = 0;               //stores quiz points
var timer;                    //countdown  
var getName;                  //stores name from textbox  
var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")); //gets value from localStorage0 

var quizKey = [ //object which holds the questions, lists of answers and index of correct answer
    {questionList: "Commonly used data types DO NOT include:",                  //quiz question
     answerList: ["1. Strings","2. Booleans","3. Alerts","4. Numbers"],                     //answer choices
     rightAnswer: 2                                                             //index of correct answer in answerList
    },
    {questionList: "The condition in an if/else statement is enclosed with",
     answerList: ["1. Quotes","2. Curly Brackets","3. Parethesis","4. Square Brackets"],
     rightAnswer: 2
    },
    {questionList: "Arrays in JavaScript can be used to store:",
     answerList: ["1. Numbers and Strings","2. Other Arrays","3. Booleans","4. All of the above"],
     rightAnswer: 3
    },
    {questionList: "String values must be enclosed within ______ when being assigned to variables",
     answerList: ["1. Commas","2. Curly Brackets","3. Quotes","4. Parenthesis"],
     rightAnswer: 2
    },
    {questionList: "A very useful tool used during development and debugging for printing content to the debugger is ______.",
     answerList: ["1. JavaScript","2. Terminal/Bash","3. For loops","4. console.log"],
     rightAnswer: 3
    }
]

function showScores(){  //display high scores screen
    startScreen.classList.add("hide");                 //hide start screen
    gameScreen.classList.add("hide");                  //hide game screen
    resultsScreen.classList.add("hide");               //hide results screen
    scoresScreen.classList.remove("hide");             //show scores screen
    timerElement.textContent = "Timer: ";              //clear timer text

    var entriesToDisplay = highScoreArray.length;      //get number of scores saved
    if (entriesToDisplay>5) entriesToDisplay = 5;      //only diplay upto 5 scores
    for (var i = 0; i < entriesToDisplay; i++){        //loop to display scores     
        var listItems = document.createElement("li");
        listItems.textContent = + highScoreArray[i].score + "%" + " - " + highScoreArray[i].name ;
        list.appendChild(listItems);
        console.log(listItems.textContent +"," + highScoreArray[i].score); 
    }
    return;

}
function submitScores(){    //adds new score to high score list and sorts lists
    getName = document.getElementById("get-name").value;                          //gets name from textbox
    if (getName === "") getName = "Anon.";                                        //assign name "Anon." if name field is blank

    if (highScoreArray==null) highScoreArray = [{ name: getName, score: points}]; //initial value in localStorage array
    else highScoreArray.push({ name: getName, score: points});                    //subsequent values
    highScoreArray.sort((a,b) => b.score - a.score);                              //sort the array after adding new value
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));       //save the new array
    
    showScores(); 
    return;                                                                
}

function showResults(){ //display results screen 
    gameScreen.classList.add("hide");               //hide questions and answers
    answerResponse.classList.add("hide");           //hide answer response 
    scoresScreen.classList.add("hide");             //hide scores 
    resultsScreen.classList.remove("hide");         //show results screen

    if (gameTimeLeft>0) resultsScreen.children[0].textContent = "All Done!";      //show "all done" if completed within time limit
    else resultsScreen.children[0].textContent = "Out of Time!";                  //show "out of time" if exceeded time limit
    resultsScreen.children[1].textContent = "Your final score is " + points + "%";//show final score

    submitButton.onclick = submitScores;
    return;
}

function checkAnswer(event){ //compares selection to correct answer
    var choosenAnswer = event.target.textContent;   
    console.log(event);                                          //gets user selection from button click
    var correctAnswer = quizKey[questionIndex].answerList[quizKey[questionIndex].rightAnswer] //gets correct answer from quizKey
    if (choosenAnswer === correctAnswer){                        //check if selection is correct
        points += 20;                                            //add 20 point for correct selection
        answerResponse.textContent = "Right!";                   //display "Right"
    }
    else {
        gameTimeLeft -= 10;                                  //subtract 10sec from timer for incorrect selection
        answerResponse.textContent = "Wrong!";               //display "Wrong"
    }
    answerResponse.classList.remove("hide");
    
    questionIndex++;

    if (questionIndex < quizKey.length) showNextQuestion();
    else {
        clearInterval(timer);
        showResults();
    }
    return;
    
}

function showNextQuestion(){    //populates question and answer screen 
    var answerButtons = answerButtonsElement.children;
    question.textContent = quizKey[questionIndex].questionList;               //load question text
    //question.style.fontSize = "20px";
    //question.style.fontWeight = "bold";
    for (var i = 0; i < answerButtons.length; i++){                           //load answer button text
        answerButtons[i].textContent = quizKey[questionIndex].answerList[i];  //loading answers from quizKey  
    };
    answerButtonsElement.onclick = checkAnswer;                               //checks which answer is being selected
    return;
}

function gameTimer(){    //control the timer counting down and subtract 10 sec for wrong answer
    timer = setInterval (function (){   
        if (gameTimeLeft < 0) gameTimeLeft = 0;              //dont let timer below 0 when 10 is subtracted    
        timerElement.textContent = "Timer: " + gameTimeLeft + "s remaining"; //display time remaining
        gameTimeLeft--;                                      //decrement time remaining after displaying so timer starts at 60
        
        if (gameTimeLeft < 0) {
            clearInterval(timer);
            showResults();                // if out of time, go to results screen
        }
    }, 1000) 
    return;  
}

function startQuiz() {  //Start the quiz when "start quiz" button is pressed  
  startScreen.classList.add("hide");        //hide start screen
  scoresScreen.classList.add("hide");       //hide scores screen
  resultsScreen.classList.add("hide");      //hide results screen
  gameScreen.classList.remove("hide");      //show gameScreen
  
  gameTimer();                              //call timer function
  showNextQuestion();                       //populate gameScreen 
  return;      
}

function restartQuiz() {  //restart quiz
    gameTimeLeft = 60;        //timer will countdown from 60sec
    questionIndex = 0;        //index of next question to be shown
    points = 0;               //stores quiz points
    list.innerHTML = "";
    
    startScreen.classList.remove("hide");           //show start screen
    gameScreen.classList.add("hide");               //hide game screen
    resultsScreen.classList.add("hide");            //hide results screen
    scoresScreen.classList.add("hide");             //hide scores screen 
    return;
}

function clearScores(){  //clear high scores from localStorage, variable and screen
    highScoreArray = [];
    localStorage.removeItem("highScoreArray");
    list.innerHTML = "";
    return;
}

//Add event listener to button
startButton.addEventListener("click", startQuiz);              //click event for start quiz button
viewHighScores.addEventListener("click", function(){           //click event for view high scores
    if (!startScreen.classList.contains("hide"))showScores();  //high scores only clickable from start screen
})
restartButton.addEventListener("click", restartQuiz);          //click event for start quiz button
clearScoresButton.addEventListener("click", clearScores);      //click event for clear scores button

