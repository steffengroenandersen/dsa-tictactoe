"use strict";

/* ##########  CONTROLLER  ########## */

window.addEventListener("load", start);

function start() {
  console.log("JAVASCRIPT LOADED...");
  makeBoardClickable();
}

function selectCell(row, col) {
  console.log("Controller says: selectCell()");

  writeToCell(row, col, 1);
  console.table(board);

  displayBoard();
}

/* ##########  MODEL  ########## */

/* BOARD CLASS */
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function writeToCell(row, col, value) {
  console.log("writeToCell()");
  board[row][col] = value;
}

function readFromCell(row, col) {
  console.log("readFromCell()");
  return board[row][col];
}

/* ##########  VIEW  ########## */

function makeBoardClickable() {
  document.querySelector("#board").addEventListener("click", boardClicked);
}
function boardClicked(event) {
  console.log("Board was clicked!");
  const cell = event.target;

  if (!cell.classList.contains("cell")) {
    console.log("Didn't click on a cell...");
    return;
  }

  const row = cell.dataset.row;
  const col = cell.dataset.col;

  console.log("Clicked on row " + row + " and col: " + col);
  selectCell(row, col);
}

function displayBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const value = readFromCell(row, col);
      console.log(value);

      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

      cell.textContent = value;
    }
  }
}

/* GAME OF LIFE */

function countNeighbors(row, col) {
  let count = 0;

  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      // avoid counting myself

      if (x != 0 && y != 0) {
        count += readFromCell(row + y, col + x);
      }
    }
  }
  return count;
}

// Vi kender row og col,
// neighbors = countNeighbours
// if neighbors < 2 || > 3 : die (equal 0)
// if neighbors === 3 : spawn ( equal 1)
