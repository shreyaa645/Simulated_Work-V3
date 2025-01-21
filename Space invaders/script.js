// Constants
const gridSize = 15;
const invaderIndices = [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 45, 46, 47, 48, 49];
let currentShooterIndex = 217; // Bottom-center cell of the grid

// DOM Elements
const gameBoard = document.getElementById('gameBoard');

// Create grid cells
for (let i = 0; i < gridSize * gridSize; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  gameBoard.appendChild(cell);
}

const cells = Array.from(document.querySelectorAll('.cell'));

// Add invaders
invaderIndices.forEach(index => {
  cells[index].classList.add('invader');
});

// Add shooter
cells[currentShooterIndex].classList.add('shooter');

// Shooter movement
document.addEventListener("keydown", (e) => {
  cells[currentShooterIndex].classList.remove("shooter");

  if (e.key === "ArrowLeft" && currentShooterIndex % gridSize !== 0) {
    currentShooterIndex -= 1;
  } else if (e.key === "ArrowRight" && currentShooterIndex % gridSize < gridSize - 1) {
    currentShooterIndex += 1;
  }

  cells[currentShooterIndex].classList.add("shooter");
});
