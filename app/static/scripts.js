import { WORDS } from "./words.js";
import { buildBoard, BOARD_SIZE, MAX_LENGTH } from "./build-board.js";

let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];
let minLengths = Array(BOARD_SIZE).fill(0);
let currentLength = 0;

let activeRow = null;
let activeRowID = 1;
let belowRow = parseInt(localStorage.getItem("belowRow"));
let won = parseFloat(localStorage.getItem("won"));
let currRow = belowRow;
let winInput = document.getElementById("winCheckbox");
winInput.checked = false

function initGame() {
    if (localStorage.getItem("date") != strDate) {
        belowRow = 1;
        localStorage.setItem('belowRow', belowRow);
        localStorage.setItem('date', strDate);
        localStorage.setItem('won', false);
    }

    if (won) {
        winInput.checked = true;
    }

    buildBoard()

    for (let r=0; r<BOARD_SIZE; r++){
        let row = document.querySelectorAll("input[name='row']")[r].parentElement.getElementsByTagName('div');
        let word = words[r]
        if (r < belowRow) {
            for (let i = 0; i < word.length; i++) {
                row[i].textContent = word[i];
              } 
        }
    }

    selectRow();
    
    if (belowRow >= BOARD_SIZE) {
        winGame();
    }
};

function winGame() {
    console.log("YOU WIN");
    winInput.checked = true;
    localStorage.setItem("won", true);
    activeRow = null;
    let row = document.querySelector('input[name="row"]:checked');
    if (row) {
        row.checked = false;
    }
};

function insertLetter(key) {
    if (currentLength == MAX_LENGTH) {
        return;
    }

    let pressedKey = key.toUpperCase();
    let box = activeRow.getElementsByTagName('div')[currentLength];
    box.textContent = pressedKey
    currentLength += 1;
};

function addLetter(help=true) {
    if (belowRow >= BOARD_SIZE) {
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
    console.log('test')
    let box = activeRow.getElementsByTagName('div')[currentLength];
    if (help) {
        box.classList.add("text-error")
    } else{
        box.classList.add("text-success")
    }


    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    minLengths[activeRowID] += 1;
    currentLength = minLengths[activeRowID];
    document.activeElement.blur();
};

function deleteAllLetters(){
    let l = currentLength;
    for (let i = 0; i < l; i++) {
        deleteLetter();
    } 
}

function checkGuess() {
    let guess = activeRow.textContent.replace(/\W/g, "")
    let correctWord = words[activeRowID] 
    if (guess == correctWord) {

        for (let i=minLengths[activeRowID]; i<=correctWord.length; i++) {
            let box = activeRow.getElementsByTagName('div')[i];
            box.classList.add("text-success");
        }

        belowRow += 1;
        localStorage.setItem('belowRow', belowRow);

        selectRow();

        if (belowRow >= BOARD_SIZE) {
            winGame();
        }

        return;

    } else {
        deleteAllLetters();
        addLetter();
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

function selectRow() {
    if (belowRow >= BOARD_SIZE) {
        return;
    }

    currRow = belowRow;
    
    let row = document.querySelectorAll('input[name="row"]')[currRow];
    row.checked = true;
    activeRow = row.parentElement;
    activeRowID = currRow;
    currentLength = minLengths[activeRowID];
    addLetter(false);
};

document.addEventListener("keyup", (e) => {
    if (belowRow >= BOARD_SIZE) {
        return;
    }
    let pressedKey = e.key;

    if (pressedKey === "Backspace" && currentLength > 0) {
        deleteLetter();
        return;
      }
    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }
    if (/^[a-z]$/i.test(pressedKey)) {
        insertLetter(pressedKey);
        return;
    }
    else {
        return;
    }
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

document.getElementById('addLetter').addEventListener("click", addLetter);

initGame();
