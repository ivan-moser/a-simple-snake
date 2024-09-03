import { increaseLength } from './snake.js';

let apple = { x: 0, y: 0 };
const nCells = 20;
const units = 25;

function generateApple() {
    apple.x = Math.round(Math.random() * (nCells - 1)) * units;
    apple.y = Math.round(Math.random() * (nCells - 1)) * units;
}

function eatApple() {
    generateApple();
    increaseLength();
}

export { generateApple, eatApple };

