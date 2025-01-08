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

    let flippedCards = [];
    let flippedCardIds = [];
    let score = 0;

    function createBoard() {
        cardsArray.forEach((card, index) => {
            const cardElement = document.createElement('img');
            cardElement.setAttribute('src', 'images/blank.png');
            cardElement.setAttribute('data-id', index);
            cardElement.addEventListener('click', flipCard);
            grid.appendChild(cardElement);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (flippedCardIds.includes(cardId)) return; // Prevent flipping the same card twice

        flippedCards.push(cardsArray[cardId].name);
        flippedCardIds.push(cardId);
        this.setAttribute('src', cardsArray[cardId].img);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const [cardOne, cardTwo] = flippedCardIds;

        if (flippedCards[0] === flippedCards[1] && cardOne !== cardTwo) {
      // Match found
        cards[cardOne].setAttribute('src', 'images/white.png');
        cards[cardTwo].setAttribute('src', 'images/white.png');
        cards[cardOne].removeEventListener('click', flipCard);
        cards[cardTwo].removeEventListener('click', flipCard);
        score++;
        scoreDisplay.textContent = score;
        } else {
      // No match
            cards[cardOne].setAttribute('src', 'images/blank.png');
            cards[cardTwo].setAttribute('src', 'images/blank.png');
        }

        flippedCards = [];
        flippedCardIds = [];

        if (score === cardsArray.length / 2) {
            setTimeout(() => alert('Congratulations! You found all pairs!'), 100);
        }
    }

    createBoard();