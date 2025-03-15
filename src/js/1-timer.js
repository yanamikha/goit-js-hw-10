import '../css/styles.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        theme: 'dark',
        backgroundColor: '#EF4040',
        icon: 'fa-solid fa-triangle-exclamation'
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }
};
let addLeadingZero = function (value) {
  return value.toString().padStart(2, '0');
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

let startButton = document.querySelector('button');
let daysField = document.querySelector('span[data-days]');
let hoursField = document.querySelector('span[data-hours]');
let minutesField = document.querySelector('span[data-minutes]');
let secondsField = document.querySelector('span[data-seconds]');
let datePicker = flatpickr('#datetime-picker', options);
let intervalId;
startButton.disabled = true;
let startTimer = function () {
  startButton.disabled = true;
  datePicker.input.disabled = true;
  intervalId = setInterval(() => {
    let timerValue = userSelectedDate - Date.now();
    if (timerValue <= 0) {
      clearInterval(intervalId);
      intervalId = 0;
      startButton.disabled = false;
      datePicker.input.disabled = false;
      return;
    }
    let datesDifference = convertMs(timerValue);
    daysField.textContent = datesDifference.days;
    hoursField.textContent = datesDifference.hours;
    minutesField.textContent = datesDifference.minutes;
    secondsField.textContent = datesDifference.seconds;
  });
};
startButton.addEventListener('click', startTimer);
