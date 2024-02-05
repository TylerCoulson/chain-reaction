import { saveJson } from "./save-load.js";

export function winGame(date, data, boardSize, maxLength, winInput) {
    winInput.checked = true;
    data["won"] = true;
    let row = document.querySelector('input[name="row"]:checked');
    if (row) {
        row.checked = false;
    }

    saveJson(date, data);
    buildBoard(data, boardSize, maxLength, "win-output")
}

function buildCell(rowID, minLength, column) {
    let cell = document.createElement("div");
    cell.className = "flex items-center w-full min-w-[1em] rounded aspect-square justify-center";
    if (rowID == 0) {
        cell.classList.add("bg-warning")
    } else if (column > 0 && column < minLength) {
        cell.classList.add("bg-error");
    } else if (column == 0 ) {
        cell.classList.add("bg-warning");
    } else {
        cell.classList.add("bg-success");
    }
    return cell
}
function buildRow(rowID, minLength, maxLength) {
    let row = document.createElement("div");
    row.className = "contents";

    for (let c = 0; c < maxLength; c++ ) {
        let cell = buildCell(rowID, minLength, c);
        row.appendChild(cell);
    }
    
    return row; 
};

export function buildBoard(data, boardSize, maxLength, idName) {
    let board = document.getElementById(idName)
    let minLengths = data['minLengths']
    for (let r=0; r < boardSize; r++ ) {
        let row = buildRow(r, minLengths[r], maxLength);
        board.appendChild(row);
    }
};