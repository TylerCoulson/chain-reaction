export const MAX_LENGTH = 10;
export const BOARD_SIZE = 9;

function buildBox() {
    let box = document.createElement("div");
    box.className = "flex items-center w-full h-full justify-center border-2 border-primary peer-checked:border-[oklch(var(--s))] peer-checked:group-[]:border-[oklch(var(--a))]";
    return box; 
};

function buildRow() {
    let row = document.createElement("div");
    row.className = "contents";
    
    let input = document.createElement("input");
    input.className = "hidden peer";
    input.setAttribute('type', 'radio');
    input.setAttribute('name', "row");
    row.appendChild(input)

    for (let r = 0; r < MAX_LENGTH; r++ ) {
        let box = buildBox();
        row.appendChild(box);
    }
    
    return row; 
};

export function buildBoard() {
    let board = document.getElementById("game-board")

    for (let r =0; r < BOARD_SIZE; r++ ) {
        let row = buildRow();
        board.appendChild(row);
    }
};