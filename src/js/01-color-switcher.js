const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let timerId = null;

buttonStart.addEventListener('click', onStartClick);
buttonStop.addEventListener('click', onStopClick);

function onStartClick() {
  if (!timerId) {
    buttonStart.disabled = true; // Вимикаємо кнопку "Start"
    timerId = setInterval(changeBackgroundColor, 1000);
  }
}

function onStopClick() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    buttonStart.disabled = false; // Вмикаємо кнопку "Start" знову
  }
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
