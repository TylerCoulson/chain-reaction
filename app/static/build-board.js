function buildBox(c=0) {
    let box = document.createElement("div");
    box.className = "flex items-center w-full min-w-[1em] rounded text-[2em] aspect-square justify-center border-2 border-primary peer-checked:border-none peer-checked:group-[]:border-neutral-content group";
    let cell = document.createElement("div");
    cell.className = "flex items-center justify-center border-0 w-full h-full rounded peer-checked:group-[]:border-2 peer-checked:group-[]:border-secondary";
    box.appendChild(cell)
    return box; 
};

function buildRow(maxLength, idName) {
    let row = document.createElement("div");
    row.className = "contents row";
    if (idName == "game-board") {
        let input = document.createElement("input");
        input.className = "hidden peer";
        input.setAttribute('type', 'radio');
        input.setAttribute('name', "row");
        row.appendChild(input)
    }

    for (let r = 0; r < maxLength; r++ ) {
        let box = buildBox(r);
        row.appendChild(box);
    }
    
    return row; 
};

export function buildBoard(boardSize, maxLength, idName) {
    let board = document.getElementById(idName)

    for (let r=0; r < boardSize; r++ ) {
        let row = buildRow(maxLength, idName);
        board.appendChild(row);
    }
};

export function populateBoard(words, data, maxLength) {
    for (let rowID=0; rowID<=data['currRow']; rowID++) {
        if (rowID >= data["minLengths"].length) {
            break;
        };

        let word = words[rowID];
        let rowInput = document.querySelectorAll("input[name='row']")[rowID]
        if (rowID == data['currRow']) {
            rowInput.checked = true;
        }

        let row = rowInput.parentElement.querySelectorAll('.row>div');
        
        for (let column=0; column<maxLength; column++) {
            if (rowID <= data["currRow"]) {
                row[column].classList.add("animate-flip");
            }
            if (column < data["minLengths"][rowID] || rowID < data["currRow"]) {
                row[column].textContent = word[column]
            }
            if (column == 0) {
                row[column].classList.add("bg-warning")
            }
            if (column > 0 && column < data['minLengths'][rowID]) {
                row[column].classList.add("bg-error")
            }
            if (column >= data["minLengths"][rowID] && rowID < data['currRow']) {
                row[column].classList.add("bg-success")
            }
        }
    }
};