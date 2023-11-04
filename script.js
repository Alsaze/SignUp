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

    const bool = input.value === undefined || input.value === '';
    wrongField(label, bool);
    const message = "You must fill this field";
    createWrongMessage(error, message, bool);

    if (input.id === "login-input-mail" || "register-input-mail"){

        if (bool) return;

        if (validateEmail(input.value)) {
            wrongField(label, false);

            createWrongMessage(error, message, false);
        } else {
            wrongField(label, true);

            const message = input.value + " is not correct";
            createWrongMessage(error, message, true);
        }
    }
}

function validateEmail(email) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}


function wrongField(field, bool = false) {
    field.classList.toggle("register-block-error", bool);
}

function createWrongMessage(error, message, bool = false) {
    bool ? error.innerHTML = message : error.innerHTML = ' ';
}

function register() {
    const userRegisterData = {

    }
    let json = JSON.stringify(userRegisterData);

    //тут вызываем метод который отправляет userRegisterData на бэк
}