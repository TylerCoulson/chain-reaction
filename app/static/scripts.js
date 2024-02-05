import { WORDS } from "./words.js";
import { buildBoard, populateBoard } from "./build-board.js";
import { saveJson, loadJson } from "./save-load.js";

export const MAX_LENGTH = 10;
export const BOARD_SIZE = 9;

let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];

let data = loadJson(strDate) ? loadJson(strDate) : {"won":false, "minLengths":Array(BOARD_SIZE).fill(1), "currRow":1};
let currentLength = data['minLengths'][data['currRow']];
let winInput = document.getElementById("winCheckbox");

function initGame(words, data) {

    buildBoard(BOARD_SIZE, MAX_LENGTH);
    
    populateBoard(words, data);
    
    if (data["won"]) {
        winInput.checked = true;
        winGame(strDate, data);
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
        nextRow(date, data);
        saveJson(date, data);
        return;
    }
    let letterID = data["minLengths"][data['currRow']]
    let key = word[letterID] 

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    data["minLengths"][data['currRow']] += 1;
    getCell(letterID).classList.add("bg-red-700")
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
        cell.classList.add("bg-green-700");
    }

    nextRow(date, data);
    saveJson(date, data);
};

function nextRow(date, data) {
    data["currRow"] += 1;
    if (data["currRow"] >= BOARD_SIZE) {
        data["currRow"] = BOARD_SIZE;
        winGame(date, data);
        return;
    }
    
    let rowInput = document.querySelectorAll("input[name='row']")[data["currRow"]]
    rowInput.checked = true;
    currentLength = 0;
    let word = words[data["currRow"]];
    let key = word[0] 
    getCell(0).classList.add("bg-green-700")
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
};
function winGame(date, data) {
    console.log("YOU WIN");
    winInput.checked = true;
    data["won"] = true;
    let row = document.querySelector('input[name="row"]:checked');
    if (row) {
        row.checked = false;
    }
    saveJson(date, data);
};

document.addEventListener("keyup", (e) => {
    let howToModal = document.getElementById("how-to-play");

    if (howToModal.checked) {
        return;
    }
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
    if (data["won"]) {
        return;
    }
    addLetter(strDate, data);
});

let keys = document.querySelectorAll('button[name="key"]');
for (let i=0; i<keys.length; i++) {
    keys[i].addEventListener("click", (e) => {
        
        let key = e.target.textContent;
        
        if (key === "Del") {
            key = "Backspace";
        }
    
        document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  });
};

initGame(words, data);