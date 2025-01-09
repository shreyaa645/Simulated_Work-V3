const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');

let result = 0;
let hitPosition;
let currentTime = 60; // Game duration in seconds
let timerId = null;

// Function to randomly place the mole in a square
function randomSquare() {
  squares.forEach(square => {
    const moleImg = square.querySelector('img');
    if (moleImg) moleImg.remove(); // Clear any existing mole image
  });

  // Select a random square
  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  const moleImg = document.createElement('img');
  moleImg.src = 'mole.jpg'; // Ensure this file is in the same folder
  moleImg.style.width = '100%';
  moleImg.style.height = '100%';
  randomSquare.appendChild(moleImg);

  hitPosition = randomSquare.id; // Save the ID of the square with the mole
}

// Add click event listener to detect hits
squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.id === hitPosition) {
      result++;
      scoreDisplay.textContent = result; // Update score display
      hitPosition = null; // Reset hitPosition after a successful hit
    }
  });
});

// Move the mole every second
function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

// Countdown timer
function countdown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId); // Stop mole movement
    clearInterval(countdownTimerId); // Stop the timer
    alert(`Game Over! Your final score is: ${result}`);
  }
}

// Start the game
let countdownTimerId = setInterval(countdown, 1000); // Start the countdown
moveMole(); // Start moving the mole
