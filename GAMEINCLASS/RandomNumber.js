let score = 0;

// Random number generator
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Roll the dice
function rollDice() {
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);
    const target = parseInt(document.getElementById("target").value);
    const resultEl = document.getElementById("result");
    const dice = document.querySelector(".dice");
    const message = document.getElementById("message");

    if (isNaN(min) || isNaN(max) || min > max || isNaN(target)) {
        message.textContent = "Please enter valid numbers!";
        dice.style.background = "linear-gradient(145deg, #aaa, #666)";
        return;
    }

    const randomNum = getRandomNumber(min, max);
    resultEl.textContent = randomNum;

    // Animate the dice
    dice.classList.add("animate");
    setTimeout(() => dice.classList.remove("animate"), 300);

    // Randomize dice gradient
    const colors = [
        ["#ff8a00", "#e52e71"],
        ["#4facfe", "#00f2fe"],
        ["#43e97b", "#38f9d7"],
        ["#fa709a", "#fee140"]
    ];
    const randColors = colors[Math.floor(Math.random() * colors.length)];
    dice.style.background = `linear-gradient(145deg, ${randColors[0]}, ${randColors[1]})`;

    // Check if player won
    if (randomNum === target) {
        message.textContent = "🎉 You guessed it! +1 point!";
        score++;
    } else {
        message.textContent = "Try again!";
    }

    document.getElementById("score").textContent = score;
}

// Event listener
document.getElementById("rollDice").addEventListener("click", rollDice);