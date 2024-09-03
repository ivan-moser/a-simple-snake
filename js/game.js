import { drawGame, resetColors, pauseScreen } from './utils.js';
import { moveSnake, changeDirection, spawnSnake, isGameOverFunc } from './snake.js';
import { generateApple, eatApple } from './food.js';

const gameBoard = document.querySelector('#gameBoard');
const scoreText = document.getElementById('scoreText');
const resetBtn = document.querySelector('#resetBtn');
const ctx = gameBoard.getContext('2d');

let isGameOver = false;
let isPause = false;

let intervalTime = 200;
let gameInterval;

function initializeGame() {
    document.addEventListener('keydown', changeDirection);
    document.addEventListener('keydown', pause);
    resetBtn.addEventListener('click', resetGame);
    
    spawnSnake();
    generateApple();
    updateGameSpeed(intervalTime);
}

function update() {
    if (isGameOver) return;

    moveSnake();
    borderCollision();
    updateScore();

    if (isGameOverFunc()) {
        gameOver();
    }
}

function updateGameSpeed(newIntervalTime) {
    clearInterval(gameInterval);
    intervalTime = newIntervalTime;
    gameInterval = setInterval(update, intervalTime);
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
    resetColors();
    spawnSnake();
    generateApple();
    updateScore();
    updateGameSpeed(200);
}

function pause(event) {
    if ((event.key === 'Space' || event.key === ' ') && !isPause) {
        clearInterval(gameInterval);
        pauseScreen();
        isPause = true;
    } else if ((event.key === 'Space' || event.key === ' ') && isPause) {
        updateGameSpeed(200);
        isPause = false;
    }
}

function borderCollision() {
    const boardWidth = gameBoard.width;
    const head = snake[0];
    if (head.x > boardWidth) {
        head.x = 0;
    } else if (head.x < 0) {
        head.x = boardWidth;
    } else if (head.y > boardWidth) {
        head.y = 0;
    } else if (head.y < 0) {
        head.y = boardWidth;
    }
}

function updateScore() {
    scoreText.textContent = snake.length - 5;
}

export { initializeGame, updateGameSpeed, gameOver, resetGame };

