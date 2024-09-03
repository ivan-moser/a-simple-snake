import { drawGame } from './utils.js';
import { eatApple } from './food.js';

let snake = [];
let direction = { x: 1, y: 0 };
const cellSize = gameBoard.width / 20;

function spawnSnake() {
    const initialX = Math.floor(10 * cellSize);
    const initialY = Math.floor(10 * cellSize);

    snake = [];
    for (let i = 0; i < 5; i++) {
        snake.push({
            x: initialX - i * cellSize,
            y: initialY
        });
    }

    drawGame();
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * cellSize,
        y: snake[0].y + direction.y * cellSize
    };
    if (newHead.x !== apple.x || newHead.y !== apple.y) {
        snake.unshift(newHead);
        snake.pop();
        drawGame();
    } else {
        eatApple();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
        case 's':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
        case 'a':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

function isGameOverFunc() {
    const nextHeadX = snake[0].x;
    const nextHeadY = snake[0].y;

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === nextHeadX && snake[i].y === nextHeadY) {
            return true;
        }
    }

    return false;
}

export { spawnSnake, moveSnake, changeDirection, isGameOverFunc };

