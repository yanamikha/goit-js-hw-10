import '../css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

let form = document.querySelector('form');
let options = { theme: 'dark' };
let onFormSubmit = function (evt) {
  evt.preventDefault();
  let delayValue = form.elements.delay.value;
  let stateValue = form.elements.state.value;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      stateValue == 'fulfilled' ? resolve(delayValue) : reject(delayValue);
    }, delayValue);
  });
  promise
    .then(delay => {
      options.message = `<b>OK</b> Fulfilled promise in ${delay}ms`;
      options.icon = 'fa-regular fa-circle-check';
      options.backgroundColor = '#59A10D';
      iziToast.show(options);
    })
    .catch(delay => {
      options.backgroundColor = '#EF4040';
      options.icon = 'fa-solid fa-triangle-exclamation';
      options.message = `Rejected promise in ${delay}ms`;
      iziToast.show(options);
    });
};
form.addEventListener('submit', onFormSubmit);
