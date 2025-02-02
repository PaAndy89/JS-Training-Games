import { createButon } from "../misc/createButton.js";

createButon('Mastermind', main);

// SVG-Namensraum verwenden, um das SVG und die Kreis-Elemente zu erstellen
const svgNamespace = "http://www.w3.org/2000/svg";

export function main() {
    let gameField = document.querySelector('#game');
    gameField.innerHTML = '';

    gameField.innerText = 'Mastermind work in Progress';

    // Neues SVG-Element erstellen
    let kreis = document.createElementNS(svgNamespace, 'svg');
    kreis.setAttribute('width', '100');
    kreis.setAttribute('height', '100');
    gameField.append(kreis);

    // Neuen Kreis erstellen
    let circle = document.createElementNS(svgNamespace, 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '40');
    circle.setAttribute('stroke', 'red');
    circle.setAttribute('stroke-width', '1');
    circle.setAttribute('fill', 'blue');

    // Kreis zum SVG hinzufügen
    kreis.append(circle);
};