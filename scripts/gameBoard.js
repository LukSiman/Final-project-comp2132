//variables
const playerTotalScore = document.getElementById("humanScore");
const computerTotalScore = document.getElementById("computerScore");

const playerRoundScore = document.getElementById("humanRound");
const computerRoundScore = document.getElementById("computerRound");

const rollButton = document.getElementById("roll");
const newGameButton = document.getElementById("newGame");
const changeCharacter = document.getElementById("changeCharacter");
const selectCharacter = document.getElementById("select");

const humanPlayer = new Player("???????");
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

const round = document.getElementById("round");
let roundNumber = 0;
const lastRound = 3;

const endGamePopup = document.getElementById("endGamePopup");
const characterSelectScreen = document.getElementById("characterSelect");

const characters = document.getElementById("characterOptions").childNodes;
let newCharacterImage;

characters.forEach(element => {
    element.addEventListener("click", function () {
        clearImageSelection();

        element.classList.toggle("selectedImage");
        newCharacterImage = element.src;
    });
});

function clearImageSelection() {
    characters.forEach(element => {
        if (element.classList != undefined) {
            element.classList.remove("selectedImage");
        }
    });
}

//prevent default enter submit functionality
document.getElementById("form").onkeydown = function (e) {
    if(e.key == 13 || e.key == "Enter"){
        e.preventDefault();
    }
}

selectCharacter.addEventListener("click", function () {
    const chosenName = document.getElementById("name");
    let warning = document.getElementById("warning");

    if (chosenName.value.trim().length == 0) {
        warning.style.display = "block";
        warning.innerHTML = "Name cannot be blank!"
    } else if (chosenName.value.trim().length > 12) {
        warning.style.display = "block";
        warning.innerHTML = "Name cannot be longer than 12 characters!"
    } else {
        warning.innerHTML = "";
        warning.style.display = "none";
        humanPlayer.setName(chosenName.value);
        humanName.innerHTML = humanPlayer.getName();

        if (newCharacterImage != undefined) {
            document.querySelectorAll(".portrait")[0].src = newCharacterImage;
        }

        characterSelectScreen.style.transition = "opacity 1s";
        characterSelectScreen.style.opacity = 0;

        document.querySelectorAll(".disabled").forEach(element => {
            element.disabled = false;
            element.classList.remove("disabled");
        });
    }
});


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

    roundNumber++;
    round.innerHTML = `Round: ${roundNumber}`;

    if (roundNumber == lastRound) {
        endGame();
    }
}

function checkDiceRoll(diceOne, diceTwo) {
    if (diceOne == 1 || diceTwo == 1) {
        return 0;
    } else if (diceOne == diceTwo) {
        return (diceOne + diceTwo) * 2;
    } else {
        return diceOne + diceTwo;
    }
}

function endGame() {
    rollButton.disabled = true;
    rollButton.classList.add("disabled");
    changeCharacter.disabled = true;
    changeCharacter.classList.add("disabled");

    endGamePopup.style.transition = "opacity 2s";
    endGamePopup.style.opacity = 1;

    if (humanPlayer.getTotalScore() > computerPlayer.getTotalScore()) {
        endGamePopup.innerHTML = `<h3>${humanPlayer.getName()} wins!</h3>`;
        endGamePopup.innerHTML += "<img id='victory' src='images/victory.gif' alt='man does a victory pump'>";
    } else if (humanPlayer.getTotalScore() < computerPlayer.getTotalScore()) {
        endGamePopup.innerHTML = `<h3 id='computerVictory' >${computerPlayer.getName()} wins!</h3>`;
        endGamePopup.innerHTML += "<img id='defeat' src='images/defeat.gif' alt='planet explodes'>";
    } else {
        endGamePopup.innerHTML = "<h3>Draw!</h3>";
        endGamePopup.innerHTML += "<img id='draw' src='images/draw.gif' alt='woman shaking hands with a computer'>";
    }
}

newGameButton.addEventListener("click", resetGame);

function resetGame() {
    humanPlayer.reset();
    computerPlayer.reset();
    roundNumber = 0;
    rollButton.disabled = false;
    rollButton.classList.remove("disabled");
    changeCharacter.disabled = false;
    changeCharacter.classList.remove("disabled");

    endGamePopup.innerHTML = "";
    endGamePopup.style.transition = "opacity 0s";
    endGamePopup.style.opacity = 0;

    playerRoundScore.innerHTML = `Round score: ${humanPlayer.getRoundScore()}`;
    playerTotalScore.innerHTML = `Total score: ${humanPlayer.getTotalScore()}`;

    computerRoundScore.innerHTML = `Round score: ${computerPlayer.getRoundScore()}`;
    computerTotalScore.innerHTML = `Total score: ${computerPlayer.getTotalScore()}`;

    round.innerHTML = `Round: ${roundNumber}`;
}

changeCharacter.addEventListener("click", changePlayerCharacter);

function changePlayerCharacter() {
    characterSelectScreen.style.transition = "opacity 1s";
    characterSelectScreen.style.opacity = 1;
}