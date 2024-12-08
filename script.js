const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Cria o tabuleiro
function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.addEventListener('click', handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (checkWin()) {
    status.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes(null)) {
    status.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWin() {
  return winningConditions.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}


resetButton.addEventListener('click', () => {
  gameState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Vez do jogador ${currentPlayer}`;
  createBoard();
});


createBoard();
status.textContent = `Vez do jogador ${currentPlayer}`;
