function rollDie() {
 const randomNumber = Math.floor(Math.random() * (6));
 document.getElementById("result").textContent = randomNumber +1;
}

rollDie();