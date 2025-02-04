import { createButon } from "../misc/createButton.js";

createButon('Mastermind', main);

// SVG-Namensraum verwenden, um das SVG und die Kreis-Elemente zu erstellen
const svgNamespace = "http://www.w3.org/2000/svg";

const colors = ['red', 'green', 'lightblue', 'blue', 'yellow', 'purple', 'orange'];

export function main() {
    let gameField = document.querySelector('#game');
    gameField.innerHTML = '';

    let mastermind = new Mastermind();

};

class Mastermind {
    constructor() {
        this.gameField = document.querySelector('#game');
        this.gameField.innerHTML = '';
        this.codeLength = 6;
        this.code = this.generateCode();
        this.activeGuess = 0;
        this.activeGuessRow = 0;

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
        this.gameField.append(this.drawCode(this.code));
        this.gameField.append(this.drawGuess());
        this.gameField.append(this.drawChooseColor());
    }

    generateCode() {
        let codeColors = colors;
        let code = [];
        for (let i = 0; i < this.codeLength; i++) {
            code.push(codeColors[Math.floor(Math.random() * codeColors.length)]);
            codeColors = codeColors.filter(color => color !== code[i]);
        }
        return code;
    }
    drawGuess() {
        let guessDiv = document.createElement('div');
        guessDiv.style.display = 'flex';
        guessDiv.style.justifyContent = 'center';
        guessDiv.style.alignItems = 'center';
        guessDiv.style.border = '1px solid black';
        guessDiv.style.borderRadius = '5px';
        guessDiv.style.margin = 'auto';
        guessDiv.style.marginTop = '20px';
        guessDiv.style.marginBottom = '20px';
        guessDiv.style.backgroundColor = 'white';
        guessDiv.id = `guessRow${this.activeGuessRow}`;
        for (let i = 0; i < this.codeLength; i++) {
            let circle = this.kreisErstellen({ size: '50', color: 'grey', strokeColor: 'black', id: `guess${i}` });
            circle.style.margin = '5px';
            guessDiv.append(circle);
        }
        return guessDiv;
    }
    drawChooseColor() {
        let chooseColorDiv = document.createElement('div');
        chooseColorDiv.style.display = 'flex';
        chooseColorDiv.style.justifyContent = 'center';
        chooseColorDiv.style.alignItems = 'center';
        chooseColorDiv.style.border = '1px solid black';
        chooseColorDiv.style.borderRadius = '5px';
        chooseColorDiv.style.margin = 'auto';
        chooseColorDiv.style.marginTop = '20px';
        chooseColorDiv.style.marginBottom = '20px';
        chooseColorDiv.style.backgroundColor = 'white';
        for (let i = 0; i < colors.length; i++) {
            let circle = this.kreisErstellen({ size: '50', color: colors[i] });
            circle.addEventListener('click', () => {
                let guess = document.querySelector(`#guess${this.activeGuess}`);
                guess.setAttribute('fill', colors[i]);
                guess.id = '';
                this.activeGuess++;
                if (this.activeGuess === this.code.length) {
                    this.checkGuess();
                }
            });
            chooseColorDiv.append(circle);
        }
        return chooseColorDiv;
    }

    checkGuess() {
        this.activeGuess = 0;
        let activeRow = document.querySelector(`#guessRow${this.activeGuessRow}`);
        let guessedCode = [];
        console.log(activeRow);
        activeRow.childNodes.forEach(element => {
            console.log(element);
            guessedCode.push(element.children[0].getAttribute('fill'));
        });
        let correct = 0;
        let correctPos = 0;
        for (let i = 0; i < this.code.length; i++) {
            if (this.code[i] === guessedCode[i]) {
                correctPos++;
            } else if (this.code.includes(guessedCode[i])) {
                correct++;
            }
        }
        for (let i = 0; i < correctPos; i++) {
            let circle = this.kreisErstellen({ size: '10', color: 'green' });
            activeRow.append(circle);
        }
        for (let i = 0; i < correct; i++) {
            let circle = this.kreisErstellen({ size: '10', color: 'yellow' });
            activeRow.append(circle);
        }
        this.activeGuessRow++;
        this.gameField.append(this.drawGuess());
    }

    drawCode(code) {
        let codeDiv = document.createElement('div');
        codeDiv.style.display = 'flex';
        codeDiv.style.justifyContent = 'center';
        codeDiv.style.alignItems = 'center';
        codeDiv.style.border = '1px solid black';
        codeDiv.style.borderRadius = '5px';
        codeDiv.style.margin = 'auto';
        codeDiv.style.marginTop = '20px';
        codeDiv.style.marginBottom = '20px';
        codeDiv.style.backgroundColor = 'white';
        for (let i = 0; i < code.length; i++) {
            let circle = this.kreisErstellen({ size: '50', color: code[i] });
            codeDiv.append(circle);
        }
        return codeDiv;
    }

    kreisErstellen({ size = '50', color, strokeColor, id }) {
        // Neues SVG-Element erstellen
        let circleSVG = document.createElementNS(svgNamespace, 'svg');
        circleSVG.setAttribute('width', size);
        circleSVG.setAttribute('height', size);

        let pos = size / 2;
        let r = size / 2 - 2;

        // Neuen Kreis erstellen
        let circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute('cx', pos);
        circle.setAttribute('cy', pos);
        circle.setAttribute('r', r);
        if (strokeColor) {
            circle.setAttribute('stroke', strokeColor);
            circle.setAttribute('stroke-width', '2');
        }
        circle.setAttribute('fill', color);
        if (id) {
            circle.setAttribute('id', id);
        }
        circleSVG.append(circle);

        circleSVG.style.margin = '5px';
        return circleSVG;
    }

}


setTimeout(() => { main(); }, 100);