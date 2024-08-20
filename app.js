const gameBoard = document.querySelector('#gameBoard');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const ctx = gameBoard.getContext('2d');

//  DEFAULT WINDOW PARAMETERS
const boardWidth = gameBoard.width;

// IN-GAME PARAMETERS
const units = 25;
const nCells = 20;
const cellSize = boardWidth / nCells;

// SNAKE
let snake = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0}
];

const Direction = {
    LEFT: {x: (-1 * units), y: 0},
    RIGHT: {x: units, y: 0},
    UP: {x: 0, y: (-1 * units)},
    DOWN: {x: 0, y: units},
}


// FUNCTIONS

window.onload = function() {
    context = gameBoard.getContext('2d');
    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);
} 


function generateApple () {
    ctx.rect((Math.round(Math.random() * (nCells - 1)) * units), 
            (Math.round(Math.random() * (nCells - 1)) * units),
            cellSize, cellSize);
    ctx.fill();
}

generateApple();


