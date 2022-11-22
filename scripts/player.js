class Player{
    constructor(name){
        //name of the player
        this.name = name;

        //round score
        this.roundScore = 0;

        //total score
        this.totalScore = 0;
    }

    //returns player's name
    getName(){
        return this.name;
    }

    //sets player's name
    setName(name){
        this.name = name;
    }

    //returns the round score
    getRoundScore(){
        return this.roundScore;
    }

    //sets the round score
    scoreRound(number){
        this.roundScore = number;
    }

    //returns the total score
    getTotalScore(){
        return this.totalScore;
    }

    //add the round score to total
    scoreTotal(number){
        this.totalScore += number;
    }

    //resets round and total score to 0
    reset(){
        this.totalScore = 0;
        this.roundScore = 0;
    }
}