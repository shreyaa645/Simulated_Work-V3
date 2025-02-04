let playerWins = 0;
let computerWins = 0;
let ties = 0;
const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "It's a tie!";
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

function updateScores(result) {
    if (result === "You win!") {
        playerWins++;
    } else if (result === "Computer wins!") {
        computerWins++;
    } else {
        ties++;
    }
    document.getElementById("player-score").innerText = `Player Wins: ${playerWins}`;
    document.getElementById("computer-score").innerText = `Computer Wins: ${computerWins}`;
    document.getElementById("tie-score").innerText = `Ties: ${ties}`;
}

function playResultSound(result) {
    if (result === "You win!") {
        document.getElementById("win-sound").play();
    } else if (result === "Computer wins!") {
        document.getElementById("lose-sound").play();
    } else {
        document.getElementById("tie-sound").play();
    }
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    document.getElementById("player-choice").innerText = `Player's Choice: ${playerChoice}`;
    document.getElementById("computer-choice").innerText = `Computer's Choice: ${computerChoice}`;
    document.getElementById("game-result").innerText = `Result: ${result}`;
    
    updateScores(result);
    playResultSound(result);
}

document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

document.getElementById("reset").addEventListener("click", () => {
    playerWins = 0;
    computerWins = 0;
    ties = 0;
    document.getElementById("player-choice").innerText = "Player's Choice: ";
    document.getElementById("computer-choice").innerText = "Computer's Choice: ";
    document.getElementById("game-result").innerText = "Result: ";
    updateScores("");
});
