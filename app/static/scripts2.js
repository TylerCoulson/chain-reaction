import { WORDS } from "./words.js";
import { buildBoard, populateBoard } from "./build-board.js";

export const MAX_LENGTH = 10;
export const BOARD_SIZE = 9;

let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];

let data = {"won":false, "minLengths":[1, 1, 1, 1, 1, 1, 1, 1, 1], "currRow":1};
let currentLength = data['minLengths'][data['currRow']]

function initGame(words, data) {

    buildBoard(BOARD_SIZE, MAX_LENGTH);
    
    populateBoard(words, data);
    
    if (data["won"]) {
        winInput.checked = true;
        winGame();
    }
}

function insertLetter(letter, cell) {
    if (currentLength >= MAX_LENGTH) {
        return;
    }
    cell.textContent = letter.toUpperCase();
    currentLength += 1;
};

function deleteLetter(cell) {
    if (data["minLengths"][data['currRow']] > currentLength) {
        return;
    }
    cell.textContent = ""
    currentLength -= 1;
};

document.addEventListener("keyup", (e) => {
    let pressedKey = e.key;
    let cell = document.querySelector('input[name="row"]:checked').parentElement.getElementsByTagName('div')[currentLength];
    

    if (pressedKey === "Backspace" && currentLength > 0) {
        deleteLetter(cell);
        return;
    }

    if (/^[a-z]$/i.test(pressedKey)) {
        insertLetter(pressedKey, cell);
        return;
    }
    else {
        return;
    }
});


document.getElementById('addLetter').addEventListener("click", addLetter);

initGame(words, data);