import { createButon } from "../misc/createButton.js";

createButon('Example', main);

// SVG-Namensraum verwenden, um das SVG und die Kreis-Elemente zu erstellen
const svgNamespace = "http://www.w3.org/2000/svg";

export function main() {
    let game = new Game();
};

class Game {
    constructor() {
        this.gameField = document.querySelector('#game');
        this.gameField.innerHTML = 'Example work in Progress';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.append(this.ctx);
        this.gameField.append(this.canvas);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}