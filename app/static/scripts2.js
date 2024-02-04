import { WORDS } from "./words.js";
import { buildBoard, populateBoard } from "./build-board.js";
import { saveJson, loadJson } from "./save-load.js";

export const MAX_LENGTH = 10;
export const BOARD_SIZE = 9;

let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];

let data = loadJson(strDate) ? loadJson(strDate) : {"won":false, "minLengths":[1, 1, 1, 1, 1, 1, 1, 1, 1], "currRow":1};
let currentLength = data['minLengths'][data['currRow']];

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

function deleteLetter(cell, data) {
    if (data["minLengths"][data['currRow']] >= currentLength) {
        return;
    }
    cell.textContent = ""
    currentLength -= 1;
};

function deleteAllLetters(data){
    for (let i = currentLength; i >= data["minLengths"][data["currRow"]]; i--) {
        let cell = getCell(i-1);
        deleteLetter(cell, data);
    }

};

function addLetter(date, data) {

    deleteAllLetters(data);
    let word = words[data["currRow"]];
    if (currentLength >= word.length) {
        return;
    }
    let letterID = data["minLengths"][data['currRow']]
    let key = word[letterID] 

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    data["minLengths"][data['currRow']] += 1;
    getCell(letterID).classList.add("text-warning")
    saveJson(date, data);
};

function getRow() {
    return document.querySelector('input[name="row"]:checked').parentElement
};

function getCell(id){
    let row = getRow();
    let cell = row.getElementsByTagName('div')[id];
    return cell
};

function checkGuess(date, data) {
    let row = getRow();
    let guess = row.textContent.replace(/\W/g, "");
    let correctWord = words[data["currRow"]];

    if (guess != correctWord) {
        addLetter(strDate, data);
        return
    }
    for (let c = data["minLengths"][data["currRow"]]; c<=correctWord.length; c++ ) {

        let cell = row.getElementsByTagName('div')[c]
        cell.classList.add("text-success");
    }

    data["currRow"] += 1;
    let rowInput = document.querySelectorAll("input[name='row']")[data["currRow"]]
    rowInput.checked = true;
    currentLength = 0;
    let word = words[data["currRow"]];
    let key = word[0] 
    getCell(0).classList.add("text-success")
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    saveJson(date, data);



};

document.addEventListener("keyup", (e) => {
    let pressedKey = e.key;

    if (pressedKey === "Backspace" && currentLength > 0) {
        let cell = getCell(currentLength-1)
        deleteLetter(cell, data);
        return;
    }
    if (pressedKey === "Enter") {
        checkGuess(strDate, data);
        return;
    }
    if (/^[a-z]$/i.test(pressedKey)) {

        let cell = getCell(currentLength)
        insertLetter(pressedKey, cell);
        return;
    }
    else {
        return;
    }
});


document.getElementById('addLetter').addEventListener("click", (e) => {
    
    addLetter(strDate, data);
});

initGame(words, data);