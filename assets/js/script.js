// Get references to the elements
var startScreen = document.getElementById("start-screen");
var gameScreen = document.getElementById("game-screen");
var resultsScreen = document.getElementById("results-screen");
var startButton = document.getElementById("start-button");
var question = document.getElementById("question");
var timerElement = document.getElementById("timer");
var answerButtons = document.getElementById("answer-buttons").children;
var answerResponse = document.getElementById("answer-response");


var gameTimeLeft = 60;  //timer will countdown from 60sec
var nextQuestion = 0;   //index of next question to be shown
var points = 0; //stores quiz points
var timer;


var quizKey = [ //object which holds the questions, list of answers and indedx of correct answer
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

function showResults(){
    clearInterval(timer); 
    gameScreen.classList.add("hide");   //hide questions and answers
    answerResponse.classList.add("hide");   //hide answer response 
    resultsScreen.classList.remove("hide");   //show results screen

    if (gameTimeLeft>0) resultsScreen.children[0].textContent = "All Done!";    //show "all done" if completed within time limit
    else resultsScreen.children[0].textContent = "Out of Time!";                //show "out of time" if exceeded time limit
    resultsScreen.children[1].textContent = "Your Final Score is " + points;    //show finally score
    

    console.log(points);
    console.log(gameTimeLeft);
}

function checkAnswer(event){
    var choosenAnswer = event.target.textContent;
    var correctAnswer = quizKey[nextQuestion].answerList[quizKey[nextQuestion].rightAnswer]
    if (choosenAnswer === correctAnswer){
      points += 20;
      answerResponse.textContent = "Right!";
    }
    else {
        gameTimeLeft -= 10;
        answerResponse.textContent = "Wrong!";
    }
    answerResponse.classList.remove("hide");
    
    nextQuestion++;
    if (nextQuestion < quizKey.length) showNextQuestion();
    else showResults();
}

function showNextQuestion(){
    question.textContent = quizKey[nextQuestion].questionList;  //load question text
    
    for (var i = 0; i < answerButtons.length; i++){ //load answer button text
        answerButtons[i].textContent = quizKey[nextQuestion].answerList[i];
    };
    answerButtons[0].addEventListener("click", checkAnswer); //checks which answer is being selected
    answerButtons[1].addEventListener("click", checkAnswer); 
    answerButtons[2].addEventListener("click", checkAnswer);
    answerButtons[3].addEventListener("click", checkAnswer);
}

function gameTimer(command){    //control the timer counting down and subtract 10 sec for wrong answer
    
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
  showNextQuestion();
}

//Add event listener to button
startButton.addEventListener("click", startQuiz);
