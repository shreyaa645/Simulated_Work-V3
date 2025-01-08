// Define the cards array with images
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
  
  // Shuffle the cards
  cardsArray.sort(() => 0.5 - Math.random());
  
  // DOM elements
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  
  // Game variables
  let flippedCards = [];
  let flippedCardIds = [];
  let score = 0;
  
  // Function to create the game board
  function createBoard() {
    cardsArray.forEach((card, index) => {
      const cardElement = document.createElement('img');
      cardElement.setAttribute('src', 'images/blank.png'); // Start with the blank image
      cardElement.setAttribute('data-id', index); // Store the card's ID
      cardElement.addEventListener('click', flipCard); // Add click event to flip the card
      grid.appendChild(cardElement); // Add the card to the grid
    });
  }
  
  // Function to handle card flipping
  function flipCard() {
    const cardId = this.getAttribute('data-id');
  
    // Prevent flipping the same card twice or clicking more than 2 cards
    if (flippedCardIds.includes(cardId) || flippedCards.length === 2) return;
  
    // Add the card to flippedCards and flippedCardIds
    flippedCards.push(cardsArray[cardId].name);
    flippedCardIds.push(cardId);
  
    // Show the card's image
    this.setAttribute('src', cardsArray[cardId].img);
  
    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
  
  // Function to check for matches
  function checkMatch() {
    const cards = document.querySelectorAll('img');
    const [cardOne, cardTwo] = flippedCardIds;
  
    if (flippedCards[0] === flippedCards[1] && cardOne !== cardTwo) {
      // If cards match, remove them from play
      cards[cardOne].setAttribute('src', 'images/white.png');
      cards[cardTwo].setAttribute('src', 'images/white.png');
      cards[cardOne].removeEventListener('click', flipCard);
      cards[cardTwo].removeEventListener('click', flipCard);
  
      // Increase the score
      score++;
      scoreDisplay.textContent = score;
    } else {
      // If cards don't match, flip them back
      cards[cardOne].setAttribute('src', 'images/blank.png');
      cards[cardTwo].setAttribute('src', 'images/blank.png');
    }
  
    // Reset flipped cards arrays
    flippedCards = [];
    flippedCardIds = [];
  
    // Check win condition
    if (score === cardsArray.length / 2) {
      setTimeout(() => alert('Congratulations! You found all pairs!'), 100);
    }
  }
  
  // Initialize the game
  createBoard();
  