class Dice {
    constructor() {
        this.diceFaceImages = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"];
    }

    rollDice() {
        const diceFaceValue = Math.round(Math.random() * 5) + 1;
        return diceFaceValue;
    }

    getFaceImage(value) {
        return this.diceFaceImages[value - 1];
    }
}