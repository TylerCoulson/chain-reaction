import { WORDS } from "./words.js";


let currentDate = new Date();
let strDate = `${currentDate.getFullYear()}-${('0'+currentDate.getMonth()+1).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;
let words = WORDS[strDate];

const MAX_LENGTH = 10;
let minLengths = Array(9).fill(0);
let currentLength = 0;

let activeRow = null;
let activeRowID = 1
let belowRow = 1;
let aboveRow = 7;


function initGame() {
    let topRow = document.getElementsByClassName("word-checkbox")[belowRow-1].parentElement.getElementsByTagName('div');
    let topWord = words[0]
    for (let i = 0; i < topWord.length; i++) {
        topRow[i].textContent = topWord[i];
      } 
    let bottomRow = document.getElementsByClassName("word-checkbox")[aboveRow+1].parentElement.getElementsByTagName('div');
    let bottomWord = words[words.length - 1]
    for (let i = 0; i < bottomWord.length; i++) {
        bottomRow[i].textContent = bottomWord[i];
    } 
    selectBelow();
};

function winGame() {
    console.log("YOU WIN");
    let rows = document.querySelectorAll(".border-primary");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("border-primary")
        rows[i].classList.add("border-accent")
    }
    activeRow = null;
    let row = document.querySelector('input[name="row"]:checked');
    row.checked = false;
};

function insertLetter(key) {
    if (currentLength == MAX_LENGTH) {
        return
    }

    let pressedKey = key.toUpperCase();
    let box = activeRow.getElementsByTagName('div')[currentLength];
    box.textContent = pressedKey
    currentLength += 1;
};

function addLetter() {
    deleteAllLetters();
    let word = words[activeRowID];
    if (minLengths[activeRowID] == word.length - 1){
        console.log("FINAL LETTER")
        document.activeElement.blur();
        return;
    }
    let key = word[minLengths[activeRowID]];
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    minLengths[activeRowID] += 1;
    currentLength = minLengths[activeRowID];
    document.activeElement.blur();
};

function deleteAllLetters(){
    let l = currentLength
    for (let i = 0; i < l; i++) {
        deleteLetter()
    } 
}

function checkGuess() {
    let guess = activeRow.textContent.replace(/\s/g, "")

    if (guess == words[activeRowID]) {
        console.log("correct guess");

        if (activeRowID === belowRow) {
            belowRow += 1;
            selectBelow();
        } else {
            aboveRow -= 1;
            selectAbove();
        }
        if (belowRow > aboveRow) {
            winGame();
        }
        return;

    } else {
        deleteAllLetters();
    }
};

function deleteLetter() {
    if (minLengths[activeRowID] >= currentLength) {
        return;
    }
    let box = activeRow.getElementsByTagName('div')[currentLength-1];
    box.textContent = ""
    currentLength -= 1;
};

function selectBelow() {
    if (belowRow > aboveRow) {
        return;
    }
    let row = document.getElementsByClassName("word-checkbox")[belowRow];
    row.checked = true;
    activeRow = row.parentElement;
    activeRowID = belowRow;
    currentLength = minLengths[activeRowID];

};

function selectAbove() {
    if (belowRow > aboveRow) {
        return;
    }
    let row = document.getElementsByClassName("word-checkbox")[aboveRow];
    row.checked = true;
    activeRow = row.parentElement;
    activeRowID = aboveRow;
    currentLength = minLengths[activeRowID];

};

document.addEventListener("keyup", (e) => {
    if (belowRow > aboveRow) {
        console.log("You Win");
        activeRow = null;
        return;
    }
    let pressedKey = e.key;

    if (pressedKey === "Backspace" && currentLength > 0) {
        deleteLetter();
        return;
      }
    if (pressedKey === "Enter") {
        checkGuess();
        return
    }
    if (/^[a-z]$/i.test(pressedKey)) {
        insertLetter(pressedKey);
        return
    }
    else {
        return
    }
});

document.getElementById("select-below").addEventListener("click", selectBelow);
document.getElementById("select-above").addEventListener("click", selectAbove);
document.getElementById("add-letter").addEventListener("click", addLetter);

initGame();