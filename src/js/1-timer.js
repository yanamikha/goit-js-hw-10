import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
        backgroundColor: 'red',
        icon: 'fa-brands fa-twitter'
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

let userSelectedDate;
let startButton = document.querySelector('button');
let daysField = document.querySelector('span[data-days]');
let hoursField = document.querySelector('span[data-hours]');
let minutesField = document.querySelector('span[data-minutes]');
let secondsField = document.querySelector('span[data-seconds]');
let datePicker = flatpickr('#datetime-picker', options);
startButton.disabled = true;
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datePicker.input.disabled = true;
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      let datesDifference = convertMs(userSelectedDate - Date.now());
      daysField.textContent = datesDifference.days;
      hoursField.textContent = datesDifference.hours;
      minutesField.textContent = datesDifference.minutes;
      secondsField.textContent = datesDifference.seconds;
    }, 1000);
  });
  promise.finally(() => {
    startButton.disabled = false;
    datePicker.input.disabled = false;
  });
});
