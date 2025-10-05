const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const pvpBtn = document.getElementById("pvp-btn");
const aiBtn = document.getElementById("ai-btn");
let currentPlayer = "X"; // Avengers
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;
let gameMode = null;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
pvpBtn.addEventListener("click", () => startGame("PVP"));
aiBtn.addEventListener("click", () => startGame("AI"));
resetBtn.addEventListener("click", resetGame);
function startGame(mode) {
  gameMode = mode;
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  currentPlayer = "X";
  statusText.textContent = `Avengers Assemble! Player ${currentPlayer}'s Turn`;
  running = true;
}
cells.forEach(cell => cell.addEventListener("click", cellClicked));
function cellClicked() {
  const index = this.getAttribute("data-index");
  if (board[index] !== "" || !running) return;
  updateCell(this, index);
  checkWinner();
  if (gameMode === "AI" && running && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase()); // adds .x or .o class
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = currentPlayer === "X" 
    ? "Avengers' Move " 
    : "Villains' Move ";
}
function checkWinner() {
  let roundWon = false;
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      highlightWinner(pattern);
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = currentPlayer === "X"
      ? "Avengers Win the Battle! "
      : "Villains Prevail! ";
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Stalemate! ⚡";
    running = false;
  } else {
    changePlayer();
  }
}
function highlightWinner(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add("winner");
  });
}
function aiMove() {
  let available = board.map((val, idx) => (val === "" ? idx : null)).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  let cell = cells[move];
  updateCell(cell, move);
  checkWinner();
}
function resetGame() {
  startGame(gameMode);
}
