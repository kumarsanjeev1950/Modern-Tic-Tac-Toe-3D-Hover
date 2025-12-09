const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

let currentPlayer = Math.random() < 0.5 ? "X" : "O";
statusText.textContent = `Player ${currentPlayer}'s Turn`;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || isGameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `${currentPlayer} Wins!`;
      isGameOver = true;
      return;
    }

    if (board.every((cell) => cell !== "")) {
      statusText.textContent = "It's a Draw!";
      isGameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  });
});

function checkWinner() {
  return winPatterns.some((pattern) => {
    return (
      board[pattern[0]] &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[0]] === board[pattern[2]]
    );
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = Math.random() < 0.5 ? "X" : "O"; // RANDOM START
  isGameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}

// 3D hover floating effect
const card = document.querySelector(".game-container");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left; // Position inside card
  const y = e.clientY - rect.top;

  const rotateX = (y / rect.height - 0.5) * -15; // Tilt up/down
  const rotateY = (x / rect.width - 0.5) * 15; // Tilt left/right

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});


