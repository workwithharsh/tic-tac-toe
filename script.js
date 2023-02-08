const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset");
const turnInfo = document.querySelector("#turn-info");

// Store the current turn and game status
let turn = "X";
let gameOver = false;

// Create audio objects for sound effects
let turnbg = new Audio("./music/ting.mp3");
let gameover = new Audio("./music/gameover.mp3");

// Attach click event listeners to each box
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    // Check if the game is over or the box is already filled
    if (!gameOver && !boxes[i].innerHTML) {
      boxes[i].innerHTML = turn;
      turnbg.play();

      // Check if the current turn wins or the game is a draw
      if (checkWin()) {
        gameOver = true;
        gameover.play();
        turnInfo.innerHTML = `${turn} wins!`;
      } else if (checkDraw()) {
        gameOver = true;
        turnInfo.innerHTML = "Draw!";
      } else {
        turn = turn === "X" ? "O" : "X";
        turnInfo.innerHTML = `${turn}'s turn`;
      }
    }
  });
}

// Attach a click event listener to the reset button
resetButton.addEventListener("click", reset);

// Check if the current turn wins the game
function checkWin() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each win line
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      boxes[a].innerHTML === turn &&
      boxes[b].innerHTML === turn &&
      boxes[c].innerHTML === turn
    ) {
      boxes[a].style.backgroundColor = "lightgreen";
      boxes[b].style.backgroundColor = "lightgreen";
      boxes[c].style.backgroundColor = "lightgreen";
      return true;
    }
  }
  return false;
}

// Check if the game is a draw
function checkDraw() {
  for (let i = 0; i < boxes.length; i++) {
    if (!boxes[i].innerHTML) {
      return false;
    }
  }
  return true;
}

// Reset the game to its initial state
function reset() {
  gameOver = false;
  turn = "X";
  turnInfo.innerHTML = `${turn}'s turn`;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "";
  }
}
