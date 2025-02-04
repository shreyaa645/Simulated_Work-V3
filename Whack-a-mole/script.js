const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let moleSpeed = 1000;

// Function to randomly place the mole in a square with different types
function randomSquare() {
  squares.forEach(square => square.innerHTML = '');

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  const moleImg = document.createElement('img');
  
  // Randomly assign a mole type
  if (Math.random() < 0.2) {
    moleImg.src = 'bonus-mole.jpg'; // Bonus mole image
    moleImg.dataset.type = 'bonus';
  } else {
    moleImg.src = 'mole.jpg'; // Normal mole image
    moleImg.dataset.type = 'normal';
  }
  
  moleImg.style.width = '100%';
  moleImg.style.height = '100%';
  randomSquare.appendChild(moleImg);
  hitPosition = randomSquare.id;

  // Adjust difficulty based on score
  adjustDifficulty();
}

// Add event listener to detect hits
squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.id === hitPosition) {
      const moleType = square.querySelector('img').dataset.type;
      if (moleType === 'bonus') {
        result += 3; // Bonus mole gives extra points
      } else {
        result++;
      }
      scoreDisplay.textContent = result;
      hitPosition = null;
    }
  });
});

// Function to move the mole at random intervals
function moveMole() {
  clearInterval(timerId);
  timerId = setInterval(randomSquare, moleSpeed);
}

// Countdown timer
function countdown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  
  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(countdownTimerId);
    alert(`Game Over! Your final score is: ${result}`);
  }
}

// Adjust difficulty based on score
function adjustDifficulty() {
  if (result >= 10) moleSpeed = 800;
  if (result >= 20) moleSpeed = 600;
  if (result >= 30) moleSpeed = 400;
  moveMole();
}

let countdownTimerId = setInterval(countdown, 1000);
moveMole();