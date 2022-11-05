// Get references to the #generate element
var startButton = document.querySelector("#start-button");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to button
startButton.addEventListener("click", startQuiz);
