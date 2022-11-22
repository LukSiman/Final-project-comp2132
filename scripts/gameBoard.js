//variables
let playerTotalScore = document.getElementById("humanScore");
let computerTotalScore = document.getElementById("computerScore");

let playerRoundScore = document.getElementById("humanRound");
let computerRoundScore = document.getElementById("computerRound");

const rollButton = document.getElementById("roll");
const newGameButton = document.getElementById("newGame");

const humanPlayer = new Player("Lukas");
const computerPlayer = new Player("Computer");

const humanName = document.getElementById("humanName");
const computerName = document.getElementById("computerName");

humanName.innerHTML = humanPlayer.getName();
computerName.innerHTML = computerPlayer.getName();

const diceOne = new Dice();
const diceTwo = new Dice();

const humanDiceOne = document.getElementById("humanDiceOne");
const humanDiceTwo = document.getElementById("humanDiceTwo");

const computerDiceOne = document.getElementById("computerDiceOne");
const computerDiceTwo = document.getElementById("computerDiceTwo");

let roundNumber = 0;

rollButton.addEventListener("click", rollGameDice);

function rollGameDice() {
    let diceOneResult = diceOne.rollDice();
    humanDiceOne.src = `images/${diceOne.getFaceImage(diceOneResult)}`;

    let diceTwoResult = diceTwo.rollDice();
    humanDiceTwo.src = `images/${diceTwo.getFaceImage(diceTwoResult)}`;

    let totalDiceResult = checkDiceRoll(diceOneResult, diceTwoResult);

    humanPlayer.scoreRound(totalDiceResult)
    humanPlayer.scoreTotal(totalDiceResult)

    playerRoundScore.innerHTML = `Round score: ${humanPlayer.getRoundScore()}`;
    playerTotalScore.innerHTML = `Total score: ${humanPlayer.getTotalScore()}`;

    diceOneResult = diceOne.rollDice();
    computerDiceOne.src = `images/${diceOne.getFaceImage(diceOneResult)}`;

    diceTwoResult = diceTwo.rollDice();
    computerDiceTwo.src = `images/${diceTwo.getFaceImage(diceTwoResult)}`;

    totalDiceResult = checkDiceRoll(diceOneResult, diceTwoResult);

    computerPlayer.scoreRound(totalDiceResult)
    computerPlayer.scoreTotal(totalDiceResult)

    computerRoundScore.innerHTML = `Round score: ${computerPlayer.getRoundScore()}`;
    computerTotalScore.innerHTML = `Total score: ${computerPlayer.getTotalScore()}`;
}

function checkDiceRoll(diceOne, diceTwo) {
    if(diceOne == 1 || diceTwo == 1){
        return 0;
    } else if (diceOne == diceTwo){
        return (diceOne + diceTwo) * 2;
    } else {
        return diceOne + diceTwo;
    }
}

newGameButton.addEventListener("click", resetGame);

function resetGame() {
    humanPlayer.reset();
    computerPlayer.reset();

    playerRoundScore.innerHTML = `Round score: ${humanPlayer.getRoundScore()}`;
    playerTotalScore.innerHTML = `Total score: ${humanPlayer.getTotalScore()}`;

    computerRoundScore.innerHTML = `Round score: ${computerPlayer.getRoundScore()}`;
    computerTotalScore.innerHTML = `Total score: ${computerPlayer.getTotalScore()}`;
}