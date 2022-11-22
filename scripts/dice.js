class Dice {
    constructor() {
        //array that holds images for the dice faces
        this.diceFaceImages = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"];
    }

    //returns a random number from 1 to 6
    rollDice() {
        const diceFaceValue = Math.round(Math.random() * 5) + 1;
        return diceFaceValue;
    }

    //returns the correct dice face based on value
    getFaceImage(value) {
        return this.diceFaceImages[value - 1];
    }
}