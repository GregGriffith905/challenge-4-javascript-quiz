// Get references to the elements
var startScreen = document.getElementById("start-screen");
var gameScreen = document.getElementById("game-screen");
var resultsScreen = document.getElementById("results-screen");
var startButton = document.getElementById("start-button");
var question = document.getElementById("question");
var timerElement = document.getElementById("timer");
var answerButtons = document.getElementById("answer-buttons").children;
var answerResponse = document.getElementById("answer-response");
var submitButton = document.getElementById("submit-button");


var gameTimeLeft = 60;        //timer will countdown from 60sec
var questionIndex = 0;         //index of next question to be shown
var points = 0;               //stores quiz points
var timer;                    //countdown  
var getName;                  //stores name from textbox  
var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")); //


var quizKey = [ //object which holds the questions, lists of answers and index of correct answer
    {questionList: "Commonly used data types DO NOT include:",
     answerList: ["Strings","Booleans","Alerts","Numbers"],
     rightAnswer: 2
    },
    {questionList: "The condition in an if/else statement is enclosed with",
     answerList: ["Quotes","Curly Brackets","Parethesis","Square Brackets"],
     rightAnswer: 2
    },
    {questionList: "Arrays in JavaScript can be used to store:",
     answerList: ["Numbers and Strings","Other Arrays","Booleans","All of the above"],
     rightAnswer: 3
    },
    {questionList: "String values must be enclosed within ______ when being assigned to variables",
     answerList: ["Commas","Curly Brackets","Quotes","Parenthesis"],
     rightAnswer: 2
    },
    {questionList: "A very useful tool used during development and debugging for printing content to the debugger is ______.",
     answerList: ["JavaScript","Terminal/Bash","For loops","console.log"],
     rightAnswer: 3
    }
]

function submitScores(){    //adds new score to high score list and sorts lists
    getName = document.getElementById("get-name").value;                          //gets name from textbox
    if (getName === "") getName = "Anon.";                                        //assign name "Anon." if name field is blank

    if (highScoreArray==null) highScoreArray = [{ name: getName, score: points}]; //initial value in localStorage array
    else highScoreArray.push({ name: getName, score: points});                    //subsequent values
    highScoreArray.sort((a,b) => b.score - a.score);                              //sort the array after adding new value
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));       //save the new array
}

function showResults(){ 
    gameScreen.classList.add("hide");   //hide questions and answers
    answerResponse.classList.add("hide");   //hide answer response 
    resultsScreen.classList.remove("hide");   //show results screen

    if (gameTimeLeft>0) resultsScreen.children[0].textContent = "All Done!";    //show "all done" if completed within time limit
    else resultsScreen.children[0].textContent = "Out of Time!";                //show "out of time" if exceeded time limit
    resultsScreen.children[1].textContent = "Your final score is " + points + "%";    //show final score
      
    console.log(points);
    console.log(gameTimeLeft);

    submitButton.onclick = submitScores;
}

function checkAnswer(event){
    var choosenAnswer = event.target.textContent;   //gets user selection from button click
    var correctAnswer = quizKey[questionIndex].answerList[quizKey[questionIndex].rightAnswer] //gets correct answer from quizKey
    if (choosenAnswer === correctAnswer){   //check if selection is correct
      points += 20;                         //add 20 point for correct selection
      answerResponse.textContent = "Right!";    
    }
    else {
        gameTimeLeft -= 10;                     //subtract 10sec from timer for incorrect selection
        answerResponse.textContent = "Wrong!";
    }
    answerResponse.classList.remove("hide");
    
    questionIndex++;
    if (questionIndex < quizKey.length) showNextQuestion(); //check if there are more questions 
    else{
        clearInterval(timer);
        showResults();  //showResults is called when all questions are answered(or when time is up in another function)
    }
}

function showNextQuestion(){
    question.textContent = quizKey[questionIndex].questionList;  //load question text
    
    for (var i = 0; i < answerButtons.length; i++){ //load answer button text
        answerButtons[i].textContent = quizKey[questionIndex].answerList[i];
    };
    answerButtons[0].addEventListener("click", checkAnswer); //checks which answer is being selected
    answerButtons[1].addEventListener("click", checkAnswer); 
    answerButtons[2].addEventListener("click", checkAnswer);
    answerButtons[3].addEventListener("click", checkAnswer);
}

function gameTimer(){    //control the timer counting down and subtract 10 sec for wrong answer
    
    timer = setInterval (function (){   
        if (gameTimeLeft < 0) gameTimeLeft = 0; //dont let timer below 0 when 10 is subtracted    
        timerElement.textContent = "Timer: " + gameTimeLeft; //display time remaining
        gameTimeLeft--; //decrement time remaining after displaying so timer starts at 60
        
        if (gameTimeLeft < 0) showResults();// if out of time, go to results screen
    }, 1000)   
}

function startQuiz() {  //Start the quiz when "start quiz" button is pressed
  startScreen.classList.add("hide");    //hide start screen
  gameScreen.classList.remove("hide");    //show question and answer choices
  gameTimer();  //call timer function
  console.log(highScoreArray);
  console.log(JSON.parse(localStorage.getItem("highScoreArray")));
  showNextQuestion();
}

//Add event listener to button
startButton.addEventListener("click", startQuiz);
