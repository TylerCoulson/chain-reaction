import { WORDS } from "./words.js";


let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];

const MAX_LENGTH = 10;
const BOARD_SIZE = 9;
let minLengths = Array(BOARD_SIZE).fill(0);
let currentLength = 0;

let activeRow = null;
let activeRowID = 1;
let belowRow = parseInt(localStorage.getItem("belowRow"));
let aboveRow = parseFloat(localStorage.getItem("aboveRow"));


function buildBox() {
    let box = document.createElement("div");
    box.className = "flex items-center justify-center w-12 h-12 mx-1 text-2xl font-bold border-2 border-primary peer-checked:border-[oklch(var(--s))]";
    return box; 
}
function buildRow() {
    let row = document.createElement("div");
    row.className = "flex justify-center p-2";
    
    let input = document.createElement("input");
    input.className = "hidden peer word-checkbox";
    input.setAttribute('type', 'radio');
    input.setAttribute('name', "row");
    row.appendChild(input)

    for (let r =0; r < MAX_LENGTH; r++ ) {
        let box = buildBox();
        row.appendChild(box);
    }
    return row; 
};
function buildBoard() {
    let board = document.getElementById("game-board")

    for (let r =0; r < BOARD_SIZE; r++ ) {
        let row = buildRow();
        board.appendChild(row)
    }
};
function initGame() {
    if (localStorage.getItem("date") != strDate) {
        belowRow = 1;
        aboveRow = 7;
        localStorage.setItem('belowRow', belowRow);
        localStorage.setItem('aboveRow', aboveRow);
        localStorage.setItem('date', strDate);
    }
    
    buildBoard()

    for (let r=0; r<BOARD_SIZE; r++){
        let row = document.getElementsByClassName("word-checkbox")[r].parentElement.getElementsByTagName('div');
        let word = words[r]
        if (r < belowRow || r > aboveRow) {
            for (let i = 0; i < word.length; i++) {
                row[i].textContent = word[i];
              } 
        }
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
    if (belowRow > aboveRow) {
        return;
    }
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
            localStorage.setItem('belowRow', belowRow);
            selectBelow();
        } else {
            aboveRow -= 1;
            localStorage.setItem('aboveRow', aboveRow);
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