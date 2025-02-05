// Select the game board
const gameBoard = document.querySelector("#game-board");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");

// Constants and variables
const boardWidth = 500;
const boardHeight = 300;
let score = 0;
let userPosition = { x: 210, y: 280 };
let ballPosition = { x: 240, y: 250 };
let ballDirection = { x: 2, y: -2 };

// Classes for game elements
class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = this.x + "px";
    block.style.top = this.y + "px";
    gameBoard.appendChild(block);
  }
}

// Create and render blocks
const blocks = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 3; j++) {
    blocks.push(new Block(i * 100, j * 30));
  }
}
blocks.forEach(block => block.render());

// Add paddle (user) and ball
const user = document.createElement("div");
user.id = "user";
gameBoard.appendChild(user);
user.style.left = userPosition.x + "px";

const ball = document.createElement("div");
ball.id = "ball";
gameBoard.appendChild(ball);
ball.style.left = ballPosition.x + "px";
ball.style.top = ballPosition.y + "px";

// Paddle movement using arrow keys
document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && userPosition.x > 0) {
    userPosition.x -= 20;
  } else if (event.key === "ArrowRight" && userPosition.x < boardWidth - 80) {
    userPosition.x += 20;
  }
  user.style.left = userPosition.x + "px";
});

// Ball movement and collisions
function moveBall() {
  ballPosition.x += ballDirection.x;
  ballPosition.y += ballDirection.y;

  // Wall collision
  if (ballPosition.x <= 0 || ballPosition.x >= boardWidth - 15) {
    ballDirection.x *= -1;
  }
  if (ballPosition.y <= 0) {
    ballDirection.y *= -1;
  }

  // Paddle collision
  if (
    ballPosition.y >= userPosition.y - 15 &&
    ballPosition.x > userPosition.x &&
    ballPosition.x < userPosition.x + 80
  ) {
    ballDirection.y *= -1;

    // Adjust the ball's x direction based on where it hits the paddle
    const paddleCenter = userPosition.x + 40; // Paddle width is 80
    const impactPoint = ballPosition.x - paddleCenter;
    ballDirection.x += impactPoint * 0.1; // Fine-tune this factor for desired realism
  }

  // Block collision
  blocks.forEach((block, index) => {
    if (
      ballPosition.x > block.x &&
      ballPosition.x < block.x + 50 &&
      ballPosition.y > block.y &&
      ballPosition.y < block.y + 20
    ) {
      blocks.splice(index, 1);
      gameBoard.removeChild(gameBoard.querySelectorAll(".block")[index]);
      ballDirection.y *= -1;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;

      // Check for win condition
      if (blocks.length === 0) {
        clearInterval(ballTimer);
        messageDisplay.textContent = "🎉 You Win! 🎉";
      }
    }
  });

  // Game over condition
  if (ballPosition.y > boardHeight) {
    clearInterval(ballTimer);
    messageDisplay.textContent = "Game Over! 😞";
  }

  // Update ball position
  ball.style.left = ballPosition.x + "px";
  ball.style.top = ballPosition.y + "px";
}

// Start the ball movement
const ballTimer = setInterval(moveBall, 20);