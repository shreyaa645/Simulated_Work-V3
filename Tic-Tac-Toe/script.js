// Add event listeners to capture the user's choice
document.getElementById('rock').addEventListener('click', () => playerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => playerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => playerChoice('scissors'));

// Function to handle player's choice
function playerChoice(choice) {
    console.log(`Player chose: ${choice}`);
    
    // Get computer's random choice
    const computer = computerChoice();
    console.log(`Computer chose: ${computer}`);
    
    // Display the choices (for now, just logging them)
    displayResult(`Player chose: ${choice}, Computer chose: ${computer}`);
}

// Function to generate a random choice for the computer
function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to display the result on the page
function displayResult(message) {
    document.getElementById('result').textContent = message;
}
