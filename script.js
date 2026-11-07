let balance = Number(localStorage.getItem("balance")) || 100;

// сразу отображаем баланс при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("balance").textContent = balance;
});

function saveBalance() {
  localStorage.setItem("balance", balance);
}

function play() {
  const betInput = document.getElementById("bet");
  const guessInput = document.getElementById("guess");
  const result = document.getElementById("result");

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

  if (guess === randomNumber) {
    const win = bet * 5;
    balance += win;
    result.textContent = "🎉 Победа! Выпало " + randomNumber + ". +" + win;
  } else {
    balance -= bet;
    result.textContent = "❌ Проигрыш. Выпало " + randomNumber;
  }

  // обновляем UI
  document.getElementById("balance").textContent = balance;

  // сохраняем
  saveBalance();

  if (balance <= 0) {
    result.textContent += " 💀 Баланс = 0";
  }

  betInput.value = "";
  guessInput.value = "";
}