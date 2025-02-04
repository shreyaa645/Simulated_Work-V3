const cardsArray = [
  { name: 'cheeseburger', img: 'images/cheeseburger.png' },
  { name: 'fries', img: 'images/fries.png' },
  { name: 'hotdog', img: 'images/hotdog.png' },
  { name: 'ice-cream', img: 'images/ice-cream.png' },
  { name: 'milkshake', img: 'images/milkshake.png' },
  { name: 'pizza', img: 'images/pizza.png' },
  { name: 'cheeseburger', img: 'images/cheeseburger.png' },
  { name: 'fries', img: 'images/fries.png' },
  { name: 'hotdog', img: 'images/hotdog.png' },
  { name: 'ice-cream', img: 'images/ice-cream.png' },
  { name: 'milkshake', img: 'images/milkshake.png' },
  { name: 'pizza', img: 'images/pizza.png' },
];

cardsArray.sort(() => 0.5 - Math.random());
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');
let flippedCards = [];
let flippedCardIds = [];
let score = 0;
let timer;
let timeElapsed = 0;
let bestTime = localStorage.getItem('bestTime') || Infinity;

function startTimer() {
  timeElapsed = 0;
  timer = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = timeElapsed;
  }, 1000);
}

function createBoard() {
  grid.innerHTML = '';
  score = 0;
  scoreDisplay.textContent = score;
  cardsArray.forEach((card, index) => {
      const cardElement = document.createElement('img');
      cardElement.setAttribute('src', 'images/blank.png');
      cardElement.setAttribute('data-id', index);
      cardElement.classList.add('card');
      cardElement.addEventListener('click', flipCard);
      grid.appendChild(cardElement);
  });
  startTimer();
}

difficultySelect.addEventListener('change', () => {
  clearInterval(timer);
  createBoard();
});

function flipCard() {
  const cardId = this.getAttribute('data-id');
  if (flippedCardIds.includes(cardId) || flippedCards.length === 2) return;
  flippedCards.push(cardsArray[cardId].name);
  flippedCardIds.push(cardId);
  this.setAttribute('src', cardsArray[cardId].img);
  this.classList.add('flipped');
  if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('img');
  const [cardOne, cardTwo] = flippedCardIds;
  if (flippedCards[0] === flippedCards[1] && cardOne !== cardTwo) {
      cards[cardOne].setAttribute('src', 'images/white.png');
      cards[cardTwo].setAttribute('src', 'images/white.png');
      cards[cardOne].removeEventListener('click', flipCard);
      cards[cardTwo].removeEventListener('click', flipCard);
      score++;
      scoreDisplay.textContent = score;
  } else {
      cards[cardOne].setAttribute('src', 'images/blank.png');
      cards[cardTwo].setAttribute('src', 'images/blank.png');
      cards[cardOne].classList.remove('flipped');
      cards[cardTwo].classList.remove('flipped');
  }
  flippedCards = [];
  flippedCardIds = [];
  if (score === cardsArray.length / 2) {
      clearInterval(timer);
      if (timeElapsed < bestTime) {
          bestTime = timeElapsed;
          localStorage.setItem('bestTime', bestTime);
          alert(`New Best Time: ${bestTime} seconds!`);
      } else {
          alert('Congratulations! You found all pairs!');
      }
  }
}

createBoard();
