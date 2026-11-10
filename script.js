function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let balance = Number(localStorage.getItem("balance")) || 100;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("balance").textContent = balance;
});

function saveBalance() {
  localStorage.setItem("balance", balance);
}

async function play() {
  const betInput = document.getElementById("bet");
  const guessInput = document.getElementById("guess");
  const result = document.getElementById("result");
  const audio = document.getElementById('sound');
  const audio1 = document.getElementById('sound1');
  const audio2 = document.getElementById('sound2');

  const bet = Number(betInput.value);
  const guess = Number(guessInput.value);

  if (!bet || bet <= 0 || bet > balance) {
    result.textContent = "❗ Введи корректную ставку";
    return;
  }

  if (isNaN(guess) || guess < 0 || guess > 5) {
    result.textContent = "❗ Введи число от 0 до 5";
    return;
  }

  const randomNumber = Math.floor(Math.random() * 6);

  audio.currentTime = 0; 
  audio.play();

  await sleep(1000); 
  
  if (guess === randomNumber) {
    const win = bet * 5;
    balance += win;
    result.textContent = "🎉 Победа! Выпало " + randomNumber + ". +" + win;
    audio1.currentTime = 0; 
    audio1.play();
  } else {
    balance -= bet;
    result.textContent = "❌ Проигрыш. Выпало " + randomNumber;
    audio2.currentTime = 0; 
    audio2.play();
  }

  document.getElementById("balance").textContent = balance;

  saveBalance();

  if (balance <= 0) {
    result.textContent += " 💀 Баланс = 0";
    audio2.currentTime = 0; 
    audio2.play();
  }

  betInput.value = "";
  guessInput.value = "";
}
