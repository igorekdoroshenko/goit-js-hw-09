import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startButton.disabled = true;
let selectedDate = null; // зберігає обрану дату
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate.getTime() < now.getTime()) {
      Notify.failure('Please choose a date in the future');
      startButton.disabled = true; // деактивувати кнопку Start
      return;
    }

    // Додавання вибраного часу до дати
    const selectedTime = new Date(selectedDates[0]).toLocaleTimeString();
    const [hours, minutes] = selectedTime.split(':');
    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);

    // Активація кнопки Start, якщо вибрана валідна дата
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

// Обробник події для кнопки Start
startButton.addEventListener('click', btnStartClick);

function btnStartClick() {
  const now = new Date();
  let timerId = setInterval(timeUpdate, 1000);
  // Перевірка, чи вибрана дата в майбутньому
  if (selectedDate.getTime() <= now.getTime()) {
    Notify.failure('Please choose a date in the future');
    return;
  }
}

// Активація інтервалу для відліку часу до обраної дати
function timeUpdate() {
  const now = new Date();
  const deltaConvertMs = selectedDate - now;

  if (deltaConvertMs <= 0) {
    clearInterval(timerId);
    return;
  }
  startButton.disabled = true;

  const timeRemaining = convertMs(deltaConvertMs);

  days.textContent = addZero(timeRemaining.days);
  hours.textContent = addZero(timeRemaining.hours);
  minutes.textContent = addZero(timeRemaining.minutes);
  seconds.textContent = addZero(timeRemaining.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(number) {
  return String(number).padStart(2, 0);
}

const timer = document.querySelector('.timer');

// Додаємо стилі до блоку .timer
timer.style.display = 'flex';
timer.style.flexWrap = 'wrap';
timer.style.justifyContent = 'flex - start';
timer.style.alignItems = 'center';
timer.style.fontFamily = 'Arial, sans-serif';
timer.style.fontSize = '16px';
timer.style.fontWeight = 'bold';

// Додаємо стилі до блоків .field
const fields = timer.querySelectorAll('.field');
fields.forEach(field => {
  field.style.display = 'flex';
  // field.style.flex = '1';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '0 10px';
});

// Додаємо стилі до блоків .value та .label
const values = timer.querySelectorAll('.value');
const labels = timer.querySelectorAll('.label');
values.forEach(value => {
  value.style.fontSize = '24px';
  value.style.textAlign = 'center';
  value.style.margin = '5px 0';
});
labels.forEach(label => {
  label.style.textAlign = 'center';
});
