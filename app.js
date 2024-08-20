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
let direction = {x: 0, y: 0};


// ===== FUNCTIONS =====
// Core functions

window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    spawnSnake();
    generateApple();
    requestAnimationFrame(update);
}

function update() {
    moveSnake();
    requestAnimationFrame(update);
} 


// Functions to move the snake:
// Direction handler
function changeDirection(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            if (direction.y === 0) {
                direction = {x: 0, y: -1};
            } break;
        case 'ArrowDown':
        case 's':
            if (direction.y === 0) {
                direction = {x: 0, y: 1};
            } break;
        case "ArrowLeft":
        case "a":
            if (direction.x === 0) {
                direction = {x: -1, y: 0};
            } break;
        case "ArrowRight":
        case "d":
            if (direction.x === 0) {
                direction = {x: 1, y: 0};
            } break;
    }
}
// Move the body with the direction handler
function moveSnake () {

    let newHead = {
        x: snake[0].x + direction.x * cellSize,
        y: snake[0].y + direction.y * cellSize
    };

    snake.unshift(newHead);
    snake.pop();

    drawGame(); //todo
}

// Function to randomly generate an apple, in the unit grid
function generateApple () {
    let appleX = (Math.round(Math.random() * (nCells - 1)) * units);
    let appleY = (Math.round(Math.random() * (nCells - 1)) * units);

    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY , cellSize-1, cellSize-1);

    console.log('Apple X: ' + appleX + ' Apple Y: ' + appleY);
}

// Function to spawn the snake in the middle of the Canvas
function spawnSnake () {
    let initialX = Math.round((nCells / 2) * units);
    let initialY = Math.round((nCells / 2) * units);

    ctx.fillStyle = 'green';
    snake.forEach(pieceOfSnake => {
        ctx.fillRect(initialX-(pieceOfSnake.x * units), initialY, cellSize-1, cellSize-1);
    });
}

// TODO FUNCTIONS
function startGame() {}
function increaseScore () {}
function resetScore () {}
function isGameOver () {}
function borderCollision () {}
function increaseLength () {}
function eatApple () {}




