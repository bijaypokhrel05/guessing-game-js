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

function newGame() {
    return new Game();
}

let game = newGame();

const input = document.querySelector('#input');
const clickBtn = document.querySelector('#click');
const remarks = document.querySelector('.remarks');
const restart = document.querySelector('#restart');
const hintBtn = document.querySelector('.hint');
const hintText = document.querySelector('.guess');


let guessNum = 0;
input.addEventListener('input', (el) => {
    guessNum = parseInt(el.target.value);
})
clickBtn.addEventListener('click', (el) => {
    let val = game.playersGuessSubmission(guessNum);
    remarks.innerText = val;
})


restart.addEventListener('click', (el) => {
    game = new Game();
    remarks.innerText = '';
    input.value = '';
    remarks.innerText = 'Guess a number between 1 - 100';
    hintText.innerHTML = '<text id = "hint-text">Hint available after 4 guesses.</text>';
    console.log('restarting the game!');
})

hintBtn.addEventListener('click', (el) => {
    let hintArray;
    if (game.pastGuesses.length === 4) {
        hintText.innerHTML = `<text id="hint1">h1</text> <text id="hint2">h2</text> <text id ="hint3">h3</text>`;
        hintArray = game.provideHint();
        document.querySelector('#hint1').innerText = hintArray[0];
        document.querySelector('#hint2').innerText = hintArray[1];
        document.querySelector('#hint3').innerText = hintArray[2];
    } else {
        console.log('The hint works only after the fourth guesses!');
    }

    console.log(hint1, hint2, hint3);
})



