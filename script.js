const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = 'X'; // Player always X

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !gameActive) return;

  makeMove(index, 'X');
  checkGameStatus();

  if (gameActive) {
    statusText.textContent = "Computer's Turn (O)";
    setTimeout(computerMove, 500); // delay for realism
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = document.querySelector(`.cell[data-index='${index}']`);
  cell.textContent = player;
  cell.classList.add(player);
}

function computerMove() {
  let emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyIndices.length === 0) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');
  checkGameStatus();
  if (gameActive) {
    statusText.textContent = "Your Turn (X)";
  }
}

function checkGameStatus() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${board[a] === 'X' ? "You Win!" : "Computer Wins!"}`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Your Turn (X)";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
