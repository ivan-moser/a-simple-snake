const gameBoard = document.querySelector('#gameBoard');
const scoreText = document.getElementById('scoreText');
const buttons = document.querySelectorAll('.colors');
const resetBtn = document.querySelector('#resetBtn');
const ctx = gameBoard.getContext('2d');

let isGameOver = false;
let isPause = false;

//  DEFAULT WINDOW PARAMETERS
const boardWidth = gameBoard.width;

// IN-GAME PARAMETERS
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let rainbowIndex = 0;

const units = 25;
const nCells = 20;
const cellSize = boardWidth / nCells;
const drawSize = cellSize - 1;
let intervalTime = 200;
let gameInterval = setInterval(update, intervalTime); 

let color = 'green';

// SNAKE
let snake = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0}
];
let direction = {x: 1, y: 0};

// APPLE
let apple = {x: 0, y: 0};


// ===== FUNCTIONS =====
// Core functions

window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    document.addEventListener('keydown', pause);
    resetBtn.addEventListener('click', resetGame);
    spawnSnake();
    generateApple();
    updateGameSpeed(200);
}

function update() {
    if (isGameOver) return; 

    moveSnake();
    borderCollision();
    updateScore();

    if (isGameOverFunc(snake, direction)) {
        gameOver();
    }
} 

// Update the speed of the game
function updateGameSpeed(newIntervalTime) {
    clearInterval(gameInterval);
    intervalTime = newIntervalTime;
    gameInterval = setInterval(update, intervalTime); 
}

function drawGame() {
    ctx.clearRect(0, 0, boardWidth, boardWidth);

    if (color === 'rainbow') {
        snake.forEach((part, index) => {
            ctx.fillStyle = rainbowColors[(rainbowIndex + index) % rainbowColors.length];
            ctx.fillRect(part.x, part.y, drawSize, drawSize);
        });
    } else {
        ctx.fillStyle = color;
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, drawSize, drawSize);
        });
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, drawSize, drawSize);
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    scoreText.style.fontSize = '50px';
    resetBtn.style.color = 'hsl(0, 75%, 90%)';
    scoreText.textContent = 'GAME OVER';
    resetBtn.background = 'rgb(170, 34, 34)';
}

function resetGame() {
    isGameOver = false;
    direction = {x: 1, y: 0};
    resetColors();
    spawnSnake();
    generateApple();
    updateScore();
    updateGameSpeed(200);
}

function pause (event) {
    if ((event.key === 'Space' || event.key === ' ') && isPause === false) {
        clearInterval(gameInterval);
        pauseScreen();
        isPause = true;
    } else if ((event.key === 'Space' || event.key === ' ') && isPause === true) {
        updateGameSpeed(200);
        isPause = false;
    }
}

function pauseScreen () {
    ctx.font = '70px Comic Sans MS'
    ctx.fillStyle = 'lightgreen'

    ctx.fillText('PAUSE', (boardWidth / 2) - 110, boardWidth / 2);
    
}

function resetColors() {
    resetBtn.style.color = 'hsl(0, 55%, 33%)';
    resetBtn.background = 'rgb(102, 19, 19)';
    
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
        if (!(newHead.x === apple.x && newHead.y === apple.y)) {

            snake.unshift(newHead);
            snake.pop();

            drawGame();
        } else {
            eatApple();
            console.log(snake.length);
    }
}

// Border collision effect Function
function borderCollision () {
    if((snake[0].x) > boardWidth) {
        snake[0].x = 0;
    } else if ((snake[0].x) < 0) {
        snake[0].x = boardWidth;
    } else if ((snake[0].y) > boardWidth) {
        snake[0].y = 0;
    } else if ((snake[0].y) < 0) {
        snake[0].y = boardWidth;
    }
}

// Function to randomly generate an apple, in the unit grid
function generateApple () {
    apple.x = (Math.round(Math.random() * (nCells - 1)) * units);
    apple.y = (Math.round(Math.random() * (nCells - 1)) * units);
}

// Function to spawn the snake in the middle of the Canvas
function spawnSnake () {
    let initialX = Math.floor((nCells / 2) * units);
    let initialY = Math.floor((nCells / 2) * units);

    snake = [];
    for (let i = 0; i < 5; i++) {
        snake.push({
            x: initialX - (i * cellSize),
            y: initialY
        });
    }

    drawGame();
}

// Eating functions
function increaseLength () {
    let newHead = {
        x: snake[0].x + direction.x * cellSize,
        y: snake[0].y + direction.y * cellSize
    };

    snake.unshift(newHead);

    drawGame();
}
function eatApple () {
        generateApple();
        increaseLength();
        rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        drawGame();
}

// Update the score
function updateScore () {
    scoreText.textContent = snake.length - 5;
}

// Function to check the game over
function isGameOverFunc(snake, direction) {
    const nextHeadX = snake[0].x;
    const nextHeadY = snake[0].y;

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === nextHeadX && snake[i].y === nextHeadY) {
            return true; 
        }
    }

    return false;
}

// ==== BUTTONS ====

// PULSANTE RESET
resetBtn.addEventListener('click', resetGame => {
    event.target.blur(); 
});

function handleGreen() {
    color = 'green';
}

function handlePink() {
    color = 'pink';
}

function handleBlue() {
    color = 'lightskyblue';
}

function handleRainbow() {
    color = 'rainbow';
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        event.target.blur(); 
        const id = this.id;

        switch(id) {
            case 'green':
                handleGreen();
                break;
            case 'pink':
                handlePink();
                break;
            case 'blue':
                handleBlue();
                break;
            case 'rainbow':
                handleRainbow();
                break;
        }
    });
});











