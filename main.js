//1. set the random number
let randomNumber = Math.floor(Math.random() * 100 + 1);
console.log(randomNumber)
//gives random number between 0 and 1; *100 ensures its a round number; +1 ensures range is 1-100 instead of 0-99;

const chanceArea = document.getElementById('chanceArea');
const resultArea = document.getElementById("resultArea"); //grabs the result area output
const resetButton = document.getElementById('resetButton');
const guessButton = document.getElementById("guessButton");
//2 Input box
const userGuess = document.getElementById("userInput"); //grabs the user input
const guessHistory = document.getElementById('history');

let chance = 3;
chanceArea.innerHTML = `Chances : ${chance}`; //ensures that initial value of 3 guesses is displayed
resetButton.addEventListener("click", resetAction);
guessButton.addEventListener("click", guess);

let gameHistory = [];
let time = 5; // time start from 5
let myTime; // timer will be assign to this variable

function guess() {
    chance = chance - 1;
    time = 5
    let message = ""
    //3.a. read the value from the input
    let userNumber = userGuess.value;
    gameHistory.push(userNumber);
    console.log("inserted number:", userNumber)
    //3.b compare with user typed number
    if (userNumber == randomNumber) {
        message = `correct!!!`;
        guessButton.disabled = true;
        guessButton.innerHTML = `You win!`;
    } else if (userNumber > randomNumber) {
        message = 'Too high!';
    } else if (userNumber < randomNumber) {
        message = `Too low!`
    }
    chanceArea.innerHTML = `Chances left : ${chance}`;//4. Show the number and ensure chances are decreasing by one every time
    if (chance === 0) {
        guessButton.disabled = true;
        message = `Game over - you loose`
    }
    //5. History of guessed numbers
    let html = `History: `
    for (let i = 0; i < gameHistory.length; i++) {
        html = html + gameHistory[i] + ", "
    }
    resultArea.innerHTML = message
    guessHistory.innerHTML = html
    userGuess.value = '' //clears input window after click
}

// 6. Restart the game after 3 trys. Every element needs to be reset to inital values and the change need to be shown (innerHTML)
function resetAction() {
    chance = 3;
    chanceArea.innerHTML = `Chances left : ${chance}`;
    gameHistory = [];
    guessHistory.innerHTML = "";
    resultArea.innerHTML = "";
    randomNumber = Math.floor(Math.random() * 100 + 1);
    userGuess.value = '';
    guessButton.disabled = false;
    timeOut();
    time = 5;

    timecounting()
}
//7. Counting game time
function timecounting() {
    myTime = setInterval(() => {
        time -= 1
        document.getElementById('timecount').innerHTML = time
        if (time === 0) {
            timeOut();
            guessButton.disabled = true;
        }
    }, 1000)// every 1 second, it will subtract 1 into time variable (computer use millisecond so 1000 is 1 second)
}
timecounting()

function timeOut() {
    clearInterval(myTime);
    document.getElementById("timecount").innerHTML = `You loose`;
    // guessButton.disabled = true;
}
