// Score variables
let playerScore = 0;
let computerScore = 0;

// Choices array
const choices = ["rock", "paper", "scissors"];

// Function to get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

// Function to update scores and display them
function updateScores(result) {
    if (result === "You win!") {
        playerScore++;
    } else if (result === "Computer wins!") {
        computerScore++;
    }

    document.getElementById("player-score").innerText = `Player: ${playerScore}`;
    document.getElementById("computer-score").innerText = `Computer: ${computerScore}`;
}

// Function to highlight the result
function highlightWinner(result) {
    const resultElement = document.getElementById("game-result");
    if (result === "You win!") {
        resultElement.style.color = "green";
    } else if (result === "Computer wins!") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "gray";
    }
}

// Function to handle game play
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // Update UI with choices and results
    document.getElementById("player-choice").innerText = `Player's Choice: ${playerChoice}`;
    document.getElementById("computer-choice").innerText = `Computer's Choice: ${computerChoice}`;
    document.getElementById("game-result").innerText = `Result: ${result}`;

    // Update scores and highlight winner
    updateScores(result);
    highlightWinner(result);
}

// Add event listeners to choice buttons
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

// Reset the game
document.getElementById("reset").addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;

    document.getElementById("player-choice").innerText = "Player's Choice: ";
    document.getElementById("computer-choice").innerText = "Computer's Choice: ";
    document.getElementById("game-result").innerText = "Result: ";
    document.getElementById("player-score").innerText = "Player: 0";
    document.getElementById("computer-score").innerText = "Computer: 0";
});
