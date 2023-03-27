/* eslint-disable no-console */
import '../style/main_style.scss';
import { validateForm, validateAndSend } from './model';

const button = document.querySelector('.footer__button');
const formShow = document.querySelector('.form__container');
const form = document.querySelector('.form');

const formInputName = ['message', 'email', 'name'];

button.addEventListener('click', () => {
  formShow.style.display = 'flex';
  document.body.style.overflowY = 'hidden';
});

formShow.addEventListener('disableForm', () => {
  formShow.style.display = 'none';
  document.body.style.overflowY = 'auto';
});

formShow.addEventListener('click', (e) => {
  if (e.target === formShow) {
    const closeFormEvent = new Event('disableForm');
    formShow.dispatchEvent(closeFormEvent);
  }
});

formInputName.forEach((elem) => {
  form[elem].addEventListener('blur', validateForm);
});

form.addEventListener('submit', validateAndSend);
