import { Circle } from './circle.js';

export class CircleRow {
    constructor({ colors = new Array(6).fill('lightgray') }) {
        this.circles = [];
        this.circleRowDiv = document.createElement('div');

        this.colors = colors;

        this.init();
    }

    init() {
        this.styleDiv();
        this.drawCode(this.colors);
    }

    changeColor(index, color) {
        this.circles[index].changeColor(color);
    }

    drawCode(colors) {
        for (let i = 0; i < this.colors.length; i++) {
            this.circles.push(new Circle({ color: colors[i], size: '50' }));
            this.circleRowDiv.append(this.circles[i].circleSVG);
        }
    }

    styleDiv() {
        this.circleRowDiv.style.display = 'flex';
        this.circleRowDiv.style.justifyContent = 'center';
        this.circleRowDiv.style.alignItems = 'center';
        this.circleRowDiv.style.border = '1px solid black';
        this.circleRowDiv.style.borderRadius = '5px';
        this.circleRowDiv.style.margin = 'auto';
        this.circleRowDiv.style.marginTop = '20px';
        this.circleRowDiv.style.marginBottom = '20px';
        this.circleRowDiv.style.backgroundColor = 'white';
    }

}