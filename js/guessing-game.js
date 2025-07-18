/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
};


function shuffle(arr) {
    let m = arr.length, temp, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        // swap the arr element 
        temp = arr[m];
        arr[m] = arr[i];
        arr[i] = temp;
    }

    return arr;
};

class Game {
    constructor(playersGuess = null, pastGuesses = []) {
        this.playersGuess = playersGuess;
        this.pastGuesses = pastGuesses;
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    isLower() {
        if (this.playersGuess < this.winningNumber) {
            return true;
        } else {
            return false;
        }
    }

    playersGuessSubmission(value) {
        if (typeof value !== 'number' || (value < 1 || value > 100)) {
            throw 'That is an invalid guess.'
        } else {
            this.playersGuess = value;
        }
        return this.checkGuess();
    }

    checkGuess() {
        if (this.difference() === 0) {
            return 'You Win!';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.'
        } else {
            this.pastGuesses.push(this.playersGuess);
        }

        if (this.pastGuesses.length === 5) {
            return 'You Lose.';
        } else if (this.difference() >= 1 && this.difference() < 10) {
            return 'You\'re burning up!';
        } else if (this.difference() >= 10 && this.difference() < 25) {
            return 'You\'re lukewarm.'
        } else if (this.difference() >= 25 && this.difference() < 50) {
            return 'You\'re a bit chilly.'
        } else if (this.difference() >= 50 && this.difference() < 100) {
            return 'You\'re ice cold!';
        }
    }

    provideHint() {
        let hintArray = [];

        hintArray.push(generateWinningNumber());
        hintArray.push(generateWinningNumber());
        hintArray.push(this.winningNumber);
        return shuffle(hintArray)
    }


};

let newGame = () => {
    return new Game();
}


