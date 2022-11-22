class Player{
    constructor(name){
        //name of the player
        this.name = name;

        this.roundScore = 0;

        this.totalScore = 0;
    }

    getName(){
        return this.name;
    }

    getRoundScore(){
        return this.roundScore;
    }

    scoreRound(number){
        this.roundScore = number;
    }

    getTotalScore(){
        return this.totalScore;
    }

    scoreTotal(number){
        this.totalScore += number;
    }

    reset(){
        this.totalScore = 0;
        this.roundScore = 0;
    }
}