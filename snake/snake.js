import { createButon } from "../misc/createButton.js";

createButon('Snake', main);

export function main() {
    let game = new Game();
    game.startGame();
};

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

class Game {
    constructor() {
        this.gameField = document.querySelector('#game');
        this.gameField.innerHTML = '';
        this.highScoreField = document.createElement('div');
        this.highScoreField.innerHTML = 'HighScore: 0';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.size = { canvasX: 800, canvasY: 600, move: 20, apple: 20, snake: 16 };
        this.gameSpeed = 100;
        this.interval = null;
        this.applePos = {};
        this.snakePos = { x: 2, y: 4 };
        this.snakeTail = [];
        this.SnakeLength = 4;
        this.direction = '';
        this.highScoreValue = 0;
        this.directionChange = false;
        this.init();
    }

    init() {
        this.canvas.width = this.size.canvasX;
        this.canvas.height = this.size.canvasY;
        this.canvas.append(this.ctx);
        this.gameField.append(this.highScoreField);
        this.gameField.append(this.canvas);
        this.fillBlanc();
        this.placeApple();
        addEventListener('keydown', this.controls);
    }

    startGame() {
        this.interval = setInterval(this.gamecycle, this.gameSpeed);
    }

    gamecycle = () => {
        this.moveSnake();
        if (this.isGameover()) {
            this.gameover();
            return;
        }
        this.eatApple();
        this.fillBlanc();
        this.drawApple(this.applePos);
        this.drawTail();
        this.drawSnake(this.snakePos);
        this.highScore();
        this.directionChange = false;
    }

    highScore() {
        if (this.direction !== '') {
            this.highScoreValue = Math.round(this.highScoreValue + this.SnakeLength / 4);
            this.highScoreField.textContent = `HighScore: ${this.highScoreValue}`;
        }
    }

    eatApple() {
        if (this.snakePos.x === this.applePos.x && this.snakePos.y === this.applePos.y) {
            this.SnakeLength++;
            this.placeApple();
        }
    }

    placeApple() {
        this.applePos.x = Math.floor(Math.random() * this.size.canvasX / this.size.move);
        this.applePos.y = Math.floor(Math.random() * this.size.canvasY / this.size.move);
    }

    isGameover = () => {
        let gameover = false;
        this.snakeTail.forEach(tail => {
            if (this.snakePos.x === tail.x && this.snakePos.y === tail.y) {
                gameover = true;
            }
        });
        if (gameover) return true;
        if (this.snakePos.x * this.size.move >= this.size.canvasX) {
            return true;
        }
        if (this.snakePos.y * this.size.move >= this.size.canvasY) {
            return true;
        }
        if (this.snakePos.x * this.size.move < 0) {
            return true;
        }
        if (this.snakePos.y * this.size.move < 0) {
            return true;
        }
    }

    gameover() {
        console.log('gameover');
        this.direction = '';
        let gameOverDiv = document.createElement('div');
        gameOverDiv.textContent = 'Game Over';
        gameOverDiv.style.width = '100%';
        gameOverDiv.style.height = '100%';
        gameOverDiv.style.position = 'absolute';
        gameOverDiv.style.top = '0';
        gameOverDiv.style.left = '0';
        gameOverDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
        gameOverDiv.style.color = 'white';
        gameOverDiv.style.fontSize = '50px';
        gameOverDiv.style.textAlign = 'center';
        gameOverDiv.style.lineHeight = '600px';
        let restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.style.position = 'absolute';
        restartButton.style.top = '50%';
        restartButton.style.left = '50%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.padding = '10px';
        restartButton.style.fontSize = '20px';
        restartButton.style.backgroundColor = 'green';
        restartButton.style.color = 'white';
        restartButton.style.border = 'none';
        restartButton.style.cursor = 'pointer';
        restartButton.addEventListener('click', () => {
            this.snakePos = { x: 2, y: 4 };
            this.snakeTail = [];
            this.SnakeLength = 4;
            this.direction = '';
            this.highScoreValue = 0;
            this.highScoreField.textContent = `HighScore: ${this.highScoreValue}`;
            this.placeApple();
            this.startGame();
            this.gameField.removeChild(gameOverDiv);
        });
        gameOverDiv.append(restartButton);
        this.gameField.append(gameOverDiv);
        clearInterval(this.interval);
    }

    controls = (event) => {
        switch (event.key) {
            // case ' ':
            //     console.log('DebugBreak');
            //     console.log({ snakePos: this.snakePos });
            //     console.log({ applePos: this.applePos });
            //     this.direction = "";
            //     break;
            case 'ArrowUp':
                if (this.direction === Direction.DOWN) return;
                if (this.directionChange) return;
                this.directionChange = true;
                this.direction = Direction.UP;
                break;
            case 'ArrowDown':
                if (this.direction === Direction.UP) return;
                if (this.directionChange) return;
                this.directionChange = true;
                this.direction = Direction.DOWN;
                break;
            case 'ArrowLeft':
                if (this.direction === Direction.RIGHT) return;
                if (this.directionChange) return;
                this.directionChange = true;
                this.direction = Direction.LEFT;
                break;
            case 'ArrowRight':
                if (this.direction === Direction.LEFT) return;
                if (this.directionChange) return;
                this.directionChange = true;
                this.direction = Direction.RIGHT;
                break;
        }
    }

    moveSnake = () => {
        if (this.direction === '') {
            return;
        }
        if (this.direction === Direction.DOWN) {
            this.snakePos.y += 1;
        }
        if (this.direction === Direction.LEFT) {
            this.snakePos.x -= 1;
        }
        if (this.direction === Direction.RIGHT) {
            this.snakePos.x += 1;
        }
        if (this.direction === Direction.UP) {
            this.snakePos.y -= 1;
        }
    }

    fillBlanc() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSnake(pos) {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect((pos.x * this.size.move) + 2, (pos.y * this.size.move) + 2, this.size.snake, this.size.snake);
    }

    drawTail() {
        if (this.direction !== '') this.snakeTail.push({ x: this.snakePos.x, y: this.snakePos.y });
        if (this.snakeTail.length > this.SnakeLength) {
            this.snakeTail.shift();
        }
        this.snakeTail.forEach(tail => {
            this.ctx.fillStyle = 'lightgreen';
            this.ctx.fillRect((tail.x * this.size.move) + 2, (tail.y * this.size.move) + 2, this.size.snake, this.size.snake);
        });
    }

    drawApple(pos) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(pos.x * this.size.move, pos.y * this.size.move, this.size.apple, this.size.apple);
    }

}