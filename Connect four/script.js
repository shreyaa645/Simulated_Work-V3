const board = document.querySelector('.board');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-btn');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let currentPlayer = 'player-one';
let gameActive = true;
let scores = { 'player-one': 0, 'player-two': 0 };

// Create the board
const cells = [];
for (let i = 0; i < 42; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-id', i);
  board.appendChild(cell);
  cells.push(cell);
}

// Check for winning combinations
const winningArrays = [
  /* Horizontal */
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
  /* Vertical */
  [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24],
  /* Diagonal */
  [3, 9, 15, 21], [2, 8, 14, 20], [1, 7, 13, 19], [0, 8, 16, 24]
];

function checkBoard() {
  for (let combo of winningArrays) {
    const [a, b, c, d] = combo;

    if (
      cells[a].classList.contains(currentPlayer) &&
      cells[b].classList.contains(currentPlayer) &&
      cells[c].classList.contains(currentPlayer) &&
      cells[d].classList.contains(currentPlayer)
    ) {
      message.textContent = `${currentPlayer === 'player-one' ? 'Player 1' : 'Player 2'} Wins! 🎉`;
      gameActive = false;
      scores[currentPlayer]++;
      updateScores();
      return;
    }
  }

  // Check for draw
  if (cells.every(cell => cell.classList.contains('player-one') || cell.classList.contains('player-two'))) {
    message.textContent = 'It\'s a Draw! 🤝';
    gameActive = false;
  }
}

function updateScores() {
  player1Score.textContent = scores['player-one'];
  player2Score.textContent = scores['player-two'];
}

// Handle clicks
board.addEventListener('click', (e) => {
  if (!gameActive) return;

  const id = parseInt(e.target.getAttribute('data-id'));
  if (isNaN(id)) return;

  // Find the lowest available cell in the column
  let availableCell = null;
  for (let i = id % 7 + 35; i >= 0; i -= 7) {
    if (!cells[i].classList.contains('player-one') && !cells[i].classList.contains('player-two')) {
      availableCell = cells[i];
      break;
    }
  }

  if (availableCell) {
    availableCell.classList.add(currentPlayer);
    checkBoard();
    if (gameActive) {
      currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
      message.textContent = `${currentPlayer === 'player-one' ? 'Player 1' : 'Player 2'}'s turn`;
    }
  }
});

// Reset the game
resetButton.addEventListener('click', () => {
  cells.forEach(cell => cell.classList.remove('player-one', 'player-two'));
  currentPlayer = 'player-one';
  message.textContent = 'Player 1\'s turn';
  gameActive = true;
});
