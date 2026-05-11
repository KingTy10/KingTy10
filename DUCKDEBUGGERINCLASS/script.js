// Game State - Generates the number once when the page loads
let targetNumber = getRandomNumber(1, 50);
let attempts = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function processGuess() {
    const guessInput = document.getElementById("playerGuess");
    const resultDisplay = document.getElementById("result");
    const playerGuess = parseInt(guessInput.value);

    // 1. Validation: Make sure it's a number within range
    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 50) {
        resultDisplay.textContent = "Please enter a number between 1 and 50! ✨";
        resultDisplay.style.color = "#ff6b6b";
        return;
    }

    attempts++;

    // 2. Win/Loss Logic
    if (playerGuess === targetNumber) {
        resultDisplay.textContent = `Correct! It took you ${attempts} tries. The forest is bright!`;
        resultDisplay.style.color = "#6fffe9";
        
        // This triggers the fireflies to appear all over the screen
        showFireflies(targetNumber);
        endGame();
    } else if (playerGuess < targetNumber) {
        resultDisplay.textContent = "Too low! More fireflies are hiding...";
        resultDisplay.style.color = "#e9c46a";
    } else {
        resultDisplay.textContent = "Too high! That's too many for this jar.";
        resultDisplay.style.color = "#e9c46a";
    }
    
    guessInput.value = ""; // Clear input for next guess
    guessInput.focus();
}
function showFireflies(count) {
    const container = document.getElementById('fireflyContainer');
    container.innerHTML = ''; 

    for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        
        // Update this line to your new filename
        img.src = "winfirefly.png"; 
        
        img.className = "winning-firefly";

        // Randomize position
        const randomX = Math.random() * 90; 
        const randomY = Math.random() * 90; 
        const delay = Math.random() * 3;

        img.style.left = randomX + "vw";
        img.style.top = randomY + "vh";
        img.style.animationDelay = delay + "s";

        container.appendChild(img);
    }
}

function endGame() {
    // Hide the submit button and show the reset button
    document.getElementById("submitGuess").style.display = "none";
    document.getElementById("resetGame").style.display = "inline-block";
}

function resetGame() {
    // Reset the game state
    targetNumber = getRandomNumber(1, 50);
    attempts = 0;
    
    // Clear the UI
    document.getElementById("result").textContent = "";
    document.getElementById("fireflyContainer").innerHTML = "";
    document.getElementById("submitGuess").style.display = "inline-block";
    document.getElementById("resetGame").style.display = "none";
    document.getElementById("playerGuess").focus();
}

// Event Listeners
document.getElementById("submitGuess").addEventListener("click", processGuess);
document.getElementById("resetGame").addEventListener("click", resetGame);

// Allow "Enter" key to submit so the user doesn't have to click