import '../css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let form = document.querySelector('form');
let options = { theme: 'dark' };
let onFormSubmit = function () {
  event.preventDefault();
  let delayValue = form.elements.delay.value;
  let stateValue = form.elements.state.value;
  let promise = new Promise((resolve, reject) => {
    stateValue == 'fulfilled' ? resolve(delayValue) : reject(delayValue);
  });
  promise
    .then(delay =>
      setTimeout(() => {
        options.message = `✅ Fulfilled promise in ${delay}ms`;
        iziToast.show(options);
      }, delay)
    )
    .catch(delay =>
      setTimeout(() => {
        options.message = `❌ Rejected promise in ${delay}ms`;
        iziToast.show(options);
      }, delay)
    );
};
form.addEventListener('submit', onFormSubmit);
