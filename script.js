const registerFormEl = document.getElementById('register-form');

const debugEl = document.getElementById('debug');

registerFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(registerFormEl);
  const newUser = Object.fromEntries(formData.entries());

  await register(newUser.email, newUser.name, newUser.password);
});

function passwordChange(id) {
  const parent = document.getElementById(id).parentElement;
  const children = parent.children;

  const input = document.getElementById(children[1].id);
  input.type === "text" ? input.type = "password" : input.type = "text";
}

function onchangeInput(id) { //id = login-block-mail
  const children = document.getElementById(id).children;
  const label = document.getElementById(children[0].id); //login-block-field-profileMail
  const error = document.getElementById(children[1].id); //login-block-error-message-mail

  const childrenLabel = document.getElementById(children[0].id).children;
  const input = document.getElementById(childrenLabel[1].id); //login-input-mail


  const isEmpty = input.value === undefined || input.value === '';
  const message = "You must fill this field";
  createWrongBlock(label, error, input, message, isEmpty);

  if ((input.id === "login-input-mail") || (input.id === "register-input-mail")) {
    validateField(label, error, input, validateEmail, isEmpty)
  }

  if ((input.id === "login-input-password") || (input.id === "register-input-password")) {
    validateField(label, error, input, validatePassword, isEmpty)
  }

  if (input.id === "register-input-profileName") {
    validateField(label, error, input, validateName, isEmpty)
  }
}

function validateField(label, error, input, validate, isEmpty) {
  if (isEmpty) return;
  const nameCorrect = !validate(input.value);
  const message = input.value + " is not correct";
  createWrongBlock(label, error, input, message, nameCorrect);
}


function validateEmail(email) {
  let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  let uppers = /[A-Z]/.test(password); // Есть хотя бы одна буква в верхнем регистре
  let lowers = /[a-z]/.test(password); // Есть хотя бы одна буква в нижнем регистре
  let numbers = /\d/.test(password); // Есть хотя бы одна цифра
  // Длина пароля не меньше 8-ми символов. Пароль использует только латинские буквы и цифры.
  let onlyLatin = /^[A-Za-z\d]{8,}$/.test(password);
  return uppers && lowers && numbers && onlyLatin;
}

function validateName(name) {
  return /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(name)
}

function createWrongBlock(label, error, input, message, bool = false) {
  createWrongField(label, bool);
  createWrongMessage(error, message, bool);
}

function createWrongField(field, bool = false) {
  field.classList.toggle("register-block-error", bool);
}

function createWrongMessage(error, message, bool = false) {
  bool ? error.innerHTML = message : error.innerHTML = ' ';
}

(async () => {
  const usersResponse = await fetch('http://localhost:3000/users');
  const users = await usersResponse.text();

  debugEl.innerHTML = users;
})();

async function register(email, name, password) {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, name, password})
    });
    const newUser = await response.json();

    if (!response.ok) {
      throw new Error(newUser);
    }

    console.log(newUser);
    alert('Заебумба');
  } catch (e) {
    alert(`ОШИБКА: ${e.message}`);
  }
}