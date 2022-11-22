//html elements for score
const playerRoundScore = document.getElementById("humanRound");
const playerTotalScore = document.getElementById("humanScore");
const computerRoundScore = document.getElementById("computerRound");
const computerTotalScore = document.getElementById("computerScore");

//html elements for buttons
const rollButton = document.getElementById("roll");
const newGameButton = document.getElementById("newGame");
const changeCharacter = document.getElementById("changeCharacter");
const selectCharacter = document.getElementById("select");

//html elements for the player names
const humanName = document.getElementById("humanName");
const computerName = document.getElementById("computerName");

//html elements for the player's dice
const humanDiceOne = document.getElementById("humanDiceOne");
const humanDiceTwo = document.getElementById("humanDiceTwo");
const computerDiceOne = document.getElementById("computerDiceOne");
const computerDiceTwo = document.getElementById("computerDiceTwo");

//creates 2 player objects
const humanPlayer = new Player("Unknown");
const computerPlayer = new Player("Computer");

//sets the player names
humanName.innerHTML = humanPlayer.getName();
computerName.innerHTML = computerPlayer.getName();

//creates a pair of dice objects
const diceOne = new Dice();
const diceTwo = new Dice();

//variables for round number tracking
const round = document.getElementById("round");
let roundNumber = 0;
const lastRound = 3;

//html elements for the popup windows
const endGamePopup = document.getElementById("endGamePopup");
const characterSelectScreen = document.getElementById("characterSelect");

//variables for character selection
const characters = document.getElementById("characterOptions").childNodes;
let newCharacterImage;

//enables character image changing
characters.forEach(element => {
    element.addEventListener("click", function () {
        //clears selection mark from the images
        clearImageSelection();

        //adds selection mark to the selected character image
        element.classList.add("selectedImage");

        //tracks the value of the selected image
        newCharacterImage = element.src;
    });
});

//clears selection mark from the character images
function clearImageSelection() {
    characters.forEach(element => {
        if (element.classList != undefined) {
            element.classList.remove("selectedImage");
        }
    });
}

//prevent default enter submit functionality
document.getElementById("form").onkeydown = function (e) {
    if (e.key == 13 || e.key == "Enter") {
        e.preventDefault();
    }
}

//selects the character
selectCharacter.addEventListener("click", selectCharacterConfirmation);

//changes character name and image 
function selectCharacterConfirmation() {
    const nameField = document.getElementById("name");
    let warning = document.getElementById("warning");

    //checks if name field is valid, if not display warning
    if (nameField.value.trim().length == 0) {
        warning.style.display = "block";
        warning.innerHTML = "Name cannot be blank!"
    } else if (nameField.value.trim().length > 10) {
        warning.style.display = "block";
        warning.innerHTML = "Name cannot be longer than 10 characters!"
    } else {
        warning.innerHTML = "";
        warning.style.display = "none";
        humanPlayer.setName(nameField.value);
        humanName.innerHTML = humanPlayer.getName();

        //change image to new selected image
        if (newCharacterImage != undefined) {
            document.querySelectorAll(".portrait")[0].src = newCharacterImage;
        }

        //TODO: CHANGE TO ANIMATION!!!!!!!!!!!
        characterSelectScreen.style.transition = "opacity 1s";
        characterSelectScreen.style.opacity = 0;
        characterSelectScreen.style.display = "none";

        //enable buttons
        enableAllGameButtons();
    }
}

//enables buttons
function enableAllGameButtons() {
    document.querySelectorAll(".disabled").forEach(element => {
        element.disabled = false;
        element.classList.remove("disabled");
    });
}

//disables buttons
function disableAllGameButtons() {
    rollButton.disabled = true;
    rollButton.classList.add("disabled");
    newGameButton.disabled = true;
    newGameButton.classList.add("disabled");
    changeCharacter.disabled = true;
    changeCharacter.classList.add("disabled");
}

//changes character after start of game
changeCharacter.addEventListener("click", changePlayerCharacter);

//open the character select menu
function changePlayerCharacter() {
    disableAllGameButtons();

    //TODO: CHANGE TO ANIMATION!!!!!!!!!!!
    characterSelectScreen.style.transition = "opacity 1s";
    characterSelectScreen.style.opacity = 1;
}

//rolls the dice
rollButton.addEventListener("click", rollGameDice);

//rolls the dice and computes the scores
function rollGameDice() {
    //roll player's dice and change dice face image
    let diceOneResult = diceOne.rollDice();
    humanDiceOne.src = `images/${diceOne.getFaceImage(diceOneResult)}`;
    let diceTwoResult = diceTwo.rollDice();
    humanDiceTwo.src = `images/${diceTwo.getFaceImage(diceTwoResult)}`;

    //check for special dice result rules
    let totalDiceResult = checkDiceRoll(diceOneResult, diceTwoResult);

    //update the player's score
    humanPlayer.scoreRound(totalDiceResult)
    humanPlayer.scoreTotal(totalDiceResult)

    //update the player's score html
    playerRoundScore.innerHTML = `Round score: ${humanPlayer.getRoundScore()}`;
    playerTotalScore.innerHTML = `Total score: ${humanPlayer.getTotalScore()}`;

    //roll computer's dice and change dice face image
    diceOneResult = diceOne.rollDice();
    computerDiceOne.src = `images/${diceOne.getFaceImage(diceOneResult)}`;
    diceTwoResult = diceTwo.rollDice();
    computerDiceTwo.src = `images/${diceTwo.getFaceImage(diceTwoResult)}`;

    //check for special dice result rules
    totalDiceResult = checkDiceRoll(diceOneResult, diceTwoResult);

    //update the computer's score
    computerPlayer.scoreRound(totalDiceResult)
    computerPlayer.scoreTotal(totalDiceResult)

    //update the computer's score html
    computerRoundScore.innerHTML = `Round score: ${computerPlayer.getRoundScore()}`;
    computerTotalScore.innerHTML = `Total score: ${computerPlayer.getTotalScore()}`;

    //increment round number
    roundNumber++;
    round.innerHTML = `Round: ${roundNumber}`;

    //ends game if the last round
    if (roundNumber == lastRound) {
        endGame();
    }
}

//checks if dice values match any of the special rules
function checkDiceRoll(diceOne, diceTwo) {
    if (diceOne == 1 || diceTwo == 1) {
        return 0;
    } else if (diceOne == diceTwo) {
        return (diceOne + diceTwo) * 2;
    } else {
        return diceOne + diceTwo;
    }
}

//ends the game and computer the victor
function endGame() {
    //disable the roll and change buttons
    rollButton.disabled = true;
    rollButton.classList.add("disabled");
    changeCharacter.disabled = true;
    changeCharacter.classList.add("disabled");

    //TODO: CHANGE TO ANIMATION!!!!!!!!!!!
    endGamePopup.style.transition = "opacity 2s";
    endGamePopup.style.opacity = 1;

    //determines who won or if it was a draw
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

//starts a new game
newGameButton.addEventListener("click", resetGame);

//resets all values to default and starts a new game
function resetGame() {
    //resets scores and round
    humanPlayer.reset();
    computerPlayer.reset();
    playerRoundScore.innerHTML = `Round score: ${humanPlayer.getRoundScore()}`;
    playerTotalScore.innerHTML = `Total score: ${humanPlayer.getTotalScore()}`;
    computerRoundScore.innerHTML = `Round score: ${computerPlayer.getRoundScore()}`;
    computerTotalScore.innerHTML = `Total score: ${computerPlayer.getTotalScore()}`;
    roundNumber = 0;
    round.innerHTML = `Round: ${roundNumber}`;

    //enables roll and change buttons
    rollButton.disabled = false;
    rollButton.classList.remove("disabled");
    changeCharacter.disabled = false;
    changeCharacter.classList.remove("disabled");

    //reset end game window
    endGamePopup.innerHTML = "";

    //TODO: CHANGE TO ANIMATION!!!!!!!!!!!
    endGamePopup.style.transition = "opacity 0s";
    endGamePopup.style.opacity = 0;
    endGamePopup.style.display = "none";
}