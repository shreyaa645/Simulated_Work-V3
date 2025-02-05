const board = document.querySelector('.board');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-btn');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let currentPlayer = 'player-one';
let gameActive = true;
let scores = { 'player-one': 0, 'player-two': 0 };
let timer;

// Create the board
const cells = [];
for (let i = 0; i < 42; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-id', i);
  board.appendChild(cell);
  cells.push(cell);
}

// Winning combinations
const winningArrays = [
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
  [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24],
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
      clearTimeout(timer);
      return;
    }
  }

  if (cells.every(cell => cell.classList.contains('player-one') || cell.classList.contains('player-two'))) {
    message.textContent = 'It\'s a Draw! 🤝';
    gameActive = false;
    clearTimeout(timer);
  }
}

function updateScores() {
  player1Score.textContent = scores['player-one'];
  player2Score.textContent = scores['player-two'];
}

function dropPiece(column) {
  if (!gameActive) return;

  let availableCell = null;
  for (let i = column + 35; i >= 0; i -= 7) {
    if (!cells[i].classList.contains('player-one') && !cells[i].classList.contains('player-two')) {
      availableCell = cells[i];
      break;
    }
  }

  if (availableCell) {
    availableCell.classList.add(currentPlayer);
    availableCell.style.animation = "dropPiece 0.5s ease-in-out";
    checkBoard();

    if (gameActive) {
      currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
      message.textContent = `${currentPlayer === 'player-one' ? 'Player 1' : 'Player 2'}'s turn`;
      
      resetTimer();
      if (currentPlayer === 'player-two') {
        setTimeout(aiMove, 700);
      }
    }
  }
}

// AI Player (Basic Random Move)
function aiMove() {
  let availableColumns = [];
  for (let i = 0; i < 7; i++) {
    if (!cells[i].classList.contains('player-one') && !cells[i].classList.contains('player-two')) {
      availableColumns.push(i);
    }
  }

  if (availableColumns.length > 0) {
    let randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    dropPiece(randomColumn);
  }
}

// Timer for Turns
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (gameActive) {
      message.textContent = `${currentPlayer === 'player-one' ? 'Player 1' : 'Player 2'} ran out of time!`;
      currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
      resetTimer();
      if (currentPlayer === 'player-two') {
        setTimeout(aiMove, 700);
      }
    }
  }, 5000);
}

// Handle player clicks
board.addEventListener('click', (e) => {
  if (!gameActive) return;
  const id = parseInt(e.target.getAttribute('data-id'));
  if (!isNaN(id)) {
    dropPiece(id % 7);
  }
});

// Reset game
resetButton.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.classList.remove('player-one', 'player-two');
    cell.style.animation = "";
  });
  currentPlayer = 'player-one';
  message.textContent = 'Player 1\'s turn';
  gameActive = true;
  resetTimer();
});
resetTimer();
