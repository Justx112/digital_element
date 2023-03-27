export const IsValid = Symbol('error');

const form = document.querySelector('.form');
const formShow = document.querySelector('.form__container');

const formInputName = ['name', 'email', 'message'];

export function validateForm(event) {
  const elemRef = event.target;
  const type = elemRef.name;
  const inputedData = elemRef.value;
  let result = false;

  switch (type) {
    case 'name':
      result = inputedData && inputedData.split('').length > 2;
      break;
    case 'email':
      result = inputedData && inputedData.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
      break;
    case 'message':
      result = inputedData && inputedData.split('').length > 5;
      break;
    default:
      result = false;
      break;
  }
  elemRef.style.borderColor = result ? '#356EAD' : 'red';
  elemRef[IsValid] = result;
}

function showMessage(isSuccess, codeError) {
  const message = isSuccess ? 'Your message successfully sent' : `something went wrong response code: ${codeError}`;
  const color = isSuccess ? 'green' : 'black';
  const htmlTemplate = `<div class="message" style="background-color: ${color}">${message}</div>`;
  document.body.insertAdjacentHTML('beforeend', htmlTemplate);
  setTimeout(() => {
    document.querySelector('.message').remove();
  }, 6000);
}

async function sendData(Data) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(Data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === 201) {
    showMessage(true);
  } else {
    showMessage(false, response.status);
  }
}

export function validateAndSend(event) {
  for (let i = 0; i < formInputName.length; i += 1) {
    event.preventDefault();
    if (!form[formInputName[i]][IsValid]) {
      form[formInputName[i]].focus();
      return;
    }
  }
  const closeFormEvent = new Event('disableForm');
  formShow.dispatchEvent(closeFormEvent);
  sendData(Object.fromEntries(new FormData(form)));
}
