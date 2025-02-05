import { svgNamespace } from "./constants.js";

export class Circle {
    constructor({
        color = 'lightgray',
        size = '50',
        strokeColor
    }) {
        this.parent = parent;
        this.color = color;
        this.size = size;
        this.pos = size / 2;
        this.r = size / 2 - 2;

        this.strokeColor = strokeColor;
        this.circleSVG
        this.circle
        this.strokeWidth = '2';

        this.init();
    }

    init() {
        this.generateCircle();
    }

    changeColor(color) {
        this.circle.setAttribute('fill', color);
    }

    generateCircle() {
        // Neues SVG-Element erstellen
        this.circleSVG = document.createElementNS(svgNamespace, 'svg');
        this.circleSVG.setAttribute('width', this.size);
        this.circleSVG.setAttribute('height', this.size);

        // Neuen Kreis erstellen
        this.circle = document.createElementNS(svgNamespace, 'circle');
        this.circle.setAttribute('cx', this.pos);
        this.circle.setAttribute('cy', this.pos);
        this.circle.setAttribute('r', this.r);
        if (this.strokeColor) {
            this.circle.setAttribute('stroke', this.strokeColor);
            this.circle.setAttribute('stroke-width', this.strokeWidth);
        }
        this.circle.setAttribute('fill', this.color);
        this.circleSVG.append(this.circle);

        this.circleSVG.style.margin = '5px';
    }

}