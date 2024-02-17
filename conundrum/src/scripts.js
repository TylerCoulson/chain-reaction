import { WORDS } from "./words.js";
import {getSystemDate} from "./utils.js";
import { saveJson, loadJson } from "./save-load.js";

const MICRO_DAY = 1000 * 60 * 60 * 24
const START_DATE = Date.parse("01 Jan 2024 00:00:00 GMT");
const CURRENT_DATE = Date.parse(`${getSystemDate()} 00:00:00 GMT`);
const DAYS_BETWEEN = (CURRENT_DATE - START_DATE)/MICRO_DAY;

const WORD_SIZE = 9

let todaysWord = WORDS[DAYS_BETWEEN%WORDS.length];
let sortedWord = Object.keys(todaysWord)[0]
document.getElementById("date").textContent = getSystemDate()

function initGame(startWord) {
    let row = document.getElementById("letters");
    let guess = document.getElementById("guess");
    for (let i=0; i<WORD_SIZE; i++) {
        let l = createCell(startWord[i], i);
        l.style.order = i;
        row.appendChild(l);

        let g = createCell();
        guess.append(g);
    }
    let loadData = loadJson(CURRENT_DATE)? loadJson(CURRENT_DATE):{"win":false}

    if (loadData['win'] == true) {
        winGame(loadData['guess']);

        for (let i of loadData['guess']) {
            addLetter(guess, i)
        }
    }
};

function shuffleLetters() {
    let row = document.getElementById("letters").children;
    let arr = Array.from({length: WORD_SIZE}, (_, index) => index);

    for (let c=arr.length-1; c>0; c--) {
        const j = Math.floor(Math.random() * (c+1));
        [arr[c], arr[j]] = [arr[j], arr[c]];
        row[c].style.order = arr[c]
        row[j].style.order = arr[j]
    }
}


function checkGuess() {
    let guess = document.getElementById("guess")
    let text = guess.textContent.replace(/\W/g, "");
    let error = document.getElementById("incorrect")
    guess.classList.remove('animate-shake');
    void guess.offsetWidth;

    if (text.length != WORD_SIZE) {
        let err = document.createElement("div")
        err.classList = "animate-appear px-2 py-1 m-1 text-lg rounded bottom-4 bg-info text-base-100"
        err.textContent = "Not Long Enough"
        error.prepend(err)
        setTimeout((e) => err.remove(), 1000)
        guess.classList.add("animate-shake")
        return;
    }
    if (!todaysWord[sortedWord].includes(text)){
        let err = document.createElement("div")
        err.classList = "animate-appear px-2 py-1 m-1 text-lg rounded bottom-4 bg-info text-base-100"
        err.textContent = "Not in List"
        error.prepend(err)
        setTimeout((e) => err.remove(), 1000)
        guess.classList.add("animate-shake")
        return;
    }

    winGame(text);
}

function winGame(guess){
    let winCheckbox = document.getElementById("win");
    winCheckbox.checked = true;

    let enterGuess = document.getElementById("check");
    enterGuess.disabled = true;
    let clearGuess = document.getElementById("clear");
    clearGuess.disabled = true;
    let shuffle = document.getElementById("shuffle");
    shuffle.disabled = true;

    let row = document.getElementById("letters").children;
    for (let c of row) {
        c.children[0].disabled = true;
    }
    console.log("win guess", guess)
    saveJson(CURRENT_DATE, {"win":true, "guess":guess, "date":CURRENT_DATE});
};

function createCell(letter) {

    if (letter === undefined) {
        let l = document.createElement("div")
        l.classList = "flex items-center w-full min-w-[1em] rounded text-[2em] aspect-square justify-center border-2 border-primary peer-checked:group-[]:border-success peer-checked:group-[]:bg-warning"
        l.textContent = letter
        return l;
    }

    let l = document.createElement("label")
    l.classList = "flex hover:bg-opacity-75 hover:border-opacity-75 bg-base-300 cursor-pointer select-none items-center w-full min-w-[1em] rounded text-[2em] aspect-square justify-center border-2 border-primary has-[:checked]:bg-secondary has-[:checked]:animate-scale-up peer-checked:group-[]:border-success peer-checked:group-[]:bg-warning peer-checked:group-[]:cursor-default"
    l.textContent = letter


    let checked = document.createElement("input");
    checked.className = "hidden";
    checked.type = "checkbox";
    checked.addEventListener("change", alterGuess);
    l.appendChild(checked);

    return l;
};

function alterGuess(e) {
    let guess = document.getElementById("guess");
    let text = e.target.previousSibling.textContent;
    let checked = e.target.checked;
    if (checked === true) {
        addLetter(guess, text);

    } else {
        removeLetter(guess, text);
        e.target.parentElement.classList.add("animate-scale-down");
    }


    return
};

function clearGuess(e) {
    let guess = document.getElementById("guess").children;
    for (let w of guess){
        w.textContent = ""
    }

    let row = document.getElementById("letters").children;
    for (let c of row) {
        c.children[0].checked = false;
    }

    return;
}

function addLetter(guess, letter) {
    for (let i=0; i<=guess.children.length; i++){
        if (guess.children[i].innerHTML == "") {
            guess.children[i].textContent = letter
            return;
        }
    }
    return;
}

function removeLetter(guess, letter) {
    for (let i=0; i<=guess.children.length; i++){
        if (guess.children[i].innerHTML == letter) {
            guess.children[i].textContent = ""
            return;
        }
    }
    return;
}

initGame(sortedWord);
document.addEventListener("keyup", (e) => {
    let pressedKey = e.key;

    if (pressedKey === "Enter") {
        let guess = document.getElementById("guess").value;
        checkGuess(guess);
        return;
    }
});

document.getElementById("check").addEventListener("click", checkGuess) 
document.getElementById("clear").addEventListener("click", clearGuess)
document.getElementById("shuffle").addEventListener("click", shuffleLetters)