const words = ["JAVASCRIPT", "HANGMAN", "DEVELOPER", "BROWSER", "FUNCTION"];
let secretWord ="";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("letter-input");
const hangmanImg = document.getElementById("hangman-image");
const message = document.getElementById("message");
const wrongCount = document.getElementById("wrong-guesses");
const guessButton = document.getElementById("guess-button");
const surrenderButton = document.getElementById("surrender-button");


function updateWordDisplay() {
  const display = secretWord
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

  wordDisplay.textContent = display;
}
function updateHangmanImage() {
  const imageIndex = wrongGuesses + 1;
  hangmanImg.src = `${imageIndex}.png`;
}

function checkWin() {
  const won = secretWord
    .split("")
    .every(letter => guessedLetters.includes(letter));

  if (won) {
    message.textContent = "You win. The stick man lives. 🏆";
    disableInput();
    surrenderButton.disabled = true;
  }
}

function checkLose() {
  if (wrongGuesses == maxWrongGuesses) {
    updateHangmanImage();
    wordDisplay.textContent = secretWord.split("").join(" ");
    message.textContent = "You lost. Gravity wins. ☠️";
    disableInput();
    surrenderButton.disabled = true;
  }
}
function handleGuess() {
  let letter = guessInput.value.toUpperCase();
  guessInput.value ="";
  
  if (!/^[A-Z]$/.test(letter)) return;
  if (guessedLetters.includes(letter)) {
  message.textContent = `You already guessed "${letter}"! Try another.`;
  return;
}
  guessedLetters.push(letter);

  if (secretWord.includes(letter)) {
    updateWordDisplay();
    checkWin();
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    updateHangmanImage();
    checkLose();
  }
  guessInput.focus()
}

function surrender() {
  wrongGuesses = maxWrongGuesses;
  updateHangmanImage();
  wordDisplay.innerHTML = `<span style="color:red">${secretWord.split("").join(" ")}</span>`;
  message.textContent = "You Died. The stick man falls. ☠️";
  disableInput();

}


function resetGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  wrongCount.textContent = "0";
  message.textContent = "";
  hangmanImg.src = "1.png";

  enableInput();
  updateWordDisplay();
  guessInput.focus();
  surrenderButton.disabled = false;
}

function disableInput() {
  guessInput.disabled = true;
}

function enableInput() {
  guessInput.disabled = false;
}

document.getElementById("guess-button").addEventListener("click", handleGuess);
document.getElementById("surrender-button").addEventListener("click", surrender);
document.getElementById("reset-button").addEventListener("click", resetGame);


guessInput.addEventListener("input", () => {
  guessButton.disabled = guessInput.disabled || !/^[A-Z]$/i.test(guessInput.value);
});
;



resetGame();
