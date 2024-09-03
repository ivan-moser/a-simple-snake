const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let rainbowIndex = 0;
let color = 'green';

function drawGame(snake, apple) {
    const boardWidth = gameBoard.width;
    const cellSize = boardWidth / 20;
    const drawSize = cellSize - 1;

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

function resetColors() {
    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.style.color = 'hsl(0, 55%, 33%)';
    resetBtn.background = 'rgb(102, 19, 19)';
}

function pauseScreen() {
    const boardWidth = gameBoard.width;
    ctx.font = '70px Comic Sans MS';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText('PAUSE', (boardWidth / 2) - 110, boardWidth / 2);
}

export { drawGame, resetColors, pauseScreen };

