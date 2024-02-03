import { WORDS } from "./words.js";
import { buildBoard, BOARD_SIZE, MAX_LENGTH } from "./build-board.js";
import { loadJson, saveJson, baseData } from "./save-load.js";

let currentDate = new Date();
let currMonth = currentDate.getMonth()+1;
let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;

let words = WORDS[strDate];

let data = {"won":false, "minLengths":[words[0].length, 2, 4, 2, 0, 0, 0, 0, 0], "currRow":3};
// let data = loadJson(strDate);

let activeRowID = data['currRow']
data["minLengths"][0] = words[0].length
let currentLength = data['minLengths'][activeRowID];
let activeRow = null;

let winInput = document.getElementById("winCheckbox");
winInput.checked = false

function initGame() {
    if (data["won"]) {
        winInput.checked = true;
        winGame();
    }

    buildBoard()

    for (let r=0; r<=data['currRow']; r++) {
        let word = words[r];
        let rowInput = document.querySelectorAll("input[name='row']")[r]
        if (r == activeRowID) {
            rowInput.checked = true;
            activeRow = rowInput.parentElement
        }
        let row = rowInput.parentElement.getElementsByTagName('div');
        
        for (let cell=0; cell<words[r].length; cell++) {

                row[cell].textContent = word[cell]
        }
    }
};

function winGame() {
    winInput.checked = true;
    activeRow = null;
    let row = document.querySelector('input[name="row"]:checked');
    if (row) {
        row.checked = false;
    }
    data["won"] = true;
    saveJson(strDate, data);
    console.log("YOU WIN");

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
    if (activeRowID >= BOARD_SIZE) {
        return;
    }
    deleteAllLetters();
    let word = words[activeRowID];
    if (data["minLengths"][activeRowID] == word.length - 1){
        console.log("FINAL LETTER")
        document.activeElement.blur();
        return;
    }
    let key = word[data["minLengths"][activeRowID]];

    let box = activeRow.getElementsByTagName('div')[currentLength];
    if (help) {
        box.classList.add("text-error")
    } else{
        box.classList.add("text-success")
    }


    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    currentLength += 1;
    data["minLengths"][activeRowID] += 1;
    saveJson(strDate, data);
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
        data["minLengths"][activeRowID] = correctWord.length;

        for (let i=data["minLengths"][activeRowID]; i<=correctWord.length; i++) {
            let box = activeRow.getElementsByTagName('div')[i];
            box.classList.add("text-success");
        }

        activeRowID += 1;
        data['currRow'] = activeRowID;
        data["minLengths"][activeRowID] = correctWord.length1;
        selectRow();
        if (activeRowID >= BOARD_SIZE) {
            winGame();
        }
        addLetter(false);

        return
    } else {
        deleteAllLetters();
        addLetter();
    }
    saveJson(strDate, data);
};

function deleteLetter() {
    if (data["minLengths"][activeRowID] >= currentLength) {
        return;
    }
    let box = activeRow.getElementsByTagName('div')[currentLength-1];
    box.textContent = ""
    currentLength -= 1;
};

function selectRow() {
    if (activeRowID >= BOARD_SIZE) {
        return;
    }

    
    let row = document.querySelectorAll('input[name="row"]')[activeRowID];
    row.checked = true;
    activeRow = row.parentElement;

    currentLength = data["minLengths"][activeRowID];
};

document.addEventListener("keyup", (e) => {
    if (activeRowID >= BOARD_SIZE) {
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
