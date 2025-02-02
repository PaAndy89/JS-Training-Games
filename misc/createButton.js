export function createButon(gameName, functionName) {
    let sidebar = document.querySelector('#buttons');
    let listItem = document.createElement('li');  
    let button = document.createElement('button');
    button.classList.add('gameSelector');
    button.textContent = gameName;
    button.addEventListener('click', functionName);
    sidebar.append(listItem);
    listItem.append(button);
}