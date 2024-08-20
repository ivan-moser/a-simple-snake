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
    spawnSnake();
    generateApple();
}

function update() {
    requestAnimationFrame(update);
} 


function startGame() {}

// Function to randomly generate an apple, in the unit grid
function generateApple () {
    let appleX = (Math.round(Math.random() * (nCells - 1)) * units);
    let appleY = (Math.round(Math.random() * (nCells - 1)) * units);

    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY , cellSize, cellSize);

    console.log('Apple X: ' + appleX + ' Apple Y: ' + appleY);
}

function increaseScore () {}
function resetScore () {}

// Function to spawn the snake in the middle of the Canvas
function spawnSnake () {
    let initialX = Math.round((nCells / 2) * units);
    let initialY = Math.round((nCells / 2) * units);

    ctx.fillStyle = 'green';
    /* ctx.fillRect(initialX, initialY, cellSize, cellSize); */
    snake.forEach(pieceOfSnake => {
        ctx.fillRect(initialX-(pieceOfSnake.x * units), initialY, cellSize, cellSize);
    });

    console.log('X: ' + initialX + ' Y: ' + initialY);
}

function moveSnake () {}
function isGameOver () {}
function borderCollision () {}
function increaseLength () {}
function eatApple () {}




