function buildBox() {
    let box = document.createElement("div");
    box.className = "flex items-center w-full min-w-[1em] text-[2em] aspect-square justify-center border-2 border-primary peer-checked:border-[oklch(var(--s))] peer-checked:group-[]:border-[oklch(var(--a))]";
    return box; 
};

function buildRow(maxLength) {
    let row = document.createElement("div");
    row.className = "contents";
    
    let input = document.createElement("input");
    input.className = "hidden peer";
    input.setAttribute('type', 'radio');
    input.setAttribute('name', "row");
    row.appendChild(input)

    for (let r = 0; r < maxLength; r++ ) {
        let box = buildBox();
        row.appendChild(box);
    }
    
    return row; 
};

export function buildBoard(boardSize, maxLength) {
    let board = document.getElementById("game-board")

    for (let r =0; r < boardSize; r++ ) {
        let row = buildRow(maxLength);
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

        let row = rowInput.parentElement.getElementsByTagName('div');
        
        for (let cell=0; cell<maxLength; cell++) {
            if (cell < data["minLengths"][rowID] || rowID < data["currRow"]) {
                row[cell].textContent = word[cell]
            }
            if (rowID==0 || cell == 0) {
                row[cell].classList.add("bg-green-700")
            }
            if (cell > 0 && cell < data['minLengths'][rowID]) {
                row[cell].classList.add("bg-red-700")
            }
            if (cell >= data["minLengths"][rowID] && rowID < data['currRow']) {
                row[cell].classList.add("bg-green-700")
            }
        }
    }
};