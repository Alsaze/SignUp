profileName = document.getElementById("register-input-profileName");
mail = document.getElementById("register-input-mail");
password = document.getElementById("register-input-password");

const inputProfileName = document.getElementById("register-block-field-profileName");
const inputMail = document.getElementById("register-block-field-profileMail");
const inputPassword = document.getElementById("register-block-field-profilePassword");

const errorProfileName = document.getElementById("register-block-error-message-profileName");
const errorMail = document.getElementById("register-block-error-message-mail");
const errorPassword = document.getElementById("register-block-error-message-password");

function passwordChange() {
    password.type === "text" ? password.type = "password" : password.type = "text";
}

function onchangeRegisterInputProfileName() {
    const bool = profileName.value === undefined || profileName.value === '';
    wrongField(inputProfileName, bool);
    const message = "You must fill this field";
    createWrongMessage(errorProfileName, message, bool);
}

function onchangeRegisterInputProfileMail() {
    const bool = mail.value === undefined || mail.value === '';
    wrongField(inputMail, bool);
    const message = "You must fill this field";
    createWrongMessage(errorMail, message, bool);
}

function onchangeRegisterInputProfilePassword() {
    const bool = password.value === undefined || password.value === '';
    wrongField(inputPassword, bool);
    const message = "You must fill this field";
    createWrongMessage(errorPassword, message, bool);
}

function wrongField(field, bool = false) {
    field.classList.toggle("register-block-error", bool);
}

function createWrongMessage(error, message, bool = false) {
    bool ? error.innerHTML = message : error.innerHTML = ' ';
}

function register() {
    const userRegisterData = {
        name: profileName.value,
        mail: mail.value,
        password: password.value
    }
    let json = JSON.stringify(userRegisterData);

    //тут вызываем метод который отправляет userRegisterData на бэк
}

function backendConfirm() {
    //переходим на главную страницу
}

function backendCancelName() {
    wrongField(inputProfileName);
    const message = "This name is already reserved";
    createWrongMessage(errorProfileName, message, true);
}

function backendCancelMail() {
    wrongField(inputMail);
    const message = "This mail is already reserved";
    createWrongMessage(errorMail, message, true);
}

function backendCancelPassword() {
    wrongField(inputPassword);
    const message = "This password is bad";
    createWrongMessage(errorPassword, message, true);
}