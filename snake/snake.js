import { createButon } from "../createButton.js";

createButon('Snake', snake);

// SVG-Namensraum verwenden, um das SVG und die Kreis-Elemente zu erstellen
const svgNamespace = "http://www.w3.org/2000/svg";

export function snake() {
    let gameField = document.querySelector('#game');
    gameField.innerHTML = '';

    gameField.innerText = 'Snake work in Progress';
};