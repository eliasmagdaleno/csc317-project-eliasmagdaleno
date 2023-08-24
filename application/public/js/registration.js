const form = document.getElementById("registration-form");
const usernameField = document.getElementById("username");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password-field");
const rePasswordField = document.getElementById("re-psw");
const ageCheckbox = document.querySelector(".checkbox-age");
const tosCheckbox = document.querySelector(".checkbox-tos");

form.addEventListener("submit", validateForm);

function validateUsername(username) {
  const regex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
  return regex.test(username);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*\-+!@#$^&~\[\]])[a-zA-Z0-9/*\-+!@#$^&~\[\]]{8,}$/;
  return regex.test(password);
}

function validateForm(event) {
  const usernameValue = usernameField.value.trim();
  const emailValue = emailField.value.trim();
  const passwordValue = passwordField.value;
  const rePasswordValue = rePasswordField.value;
  let isValid = true;

  if (validateUsername(usernameValue) === true) {
    setValid(usernameField);
  } else {
    setInvalid(
      usernameField,
      "Username must start with a letter and be at least 3 alphanumeric characters"
    );
    isValid = false;
  }

  if (validateEmail(emailValue)) {
    setValid(emailField);
  } else {
    setInvalid(emailField, "Please enter a valid email");
    isValid = false;
  }

  if (validatePassword(passwordValue)) {
    setValid(passwordField);
  } else {
    setInvalid(
      passwordField,
      "Password must be 8 or more characters and contain at least 1 uppercase letter, 1 number, and 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ]"
    );
    isValid = false;
  }

  if (passwordValue === rePasswordValue) {
    setValid(rePasswordField);
  } else {
    setInvalid(rePasswordField, "Passwords do not match");
    isValid = false;
  }
  if (!ageCheckbox.checked || !tosCheckbox.checked) {
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.submit();
  } else {
    event.preventDefault();
  }
}

function setValid(inputField) {
  const inputControl = inputField.parentElement;

  inputControl.className = "input-control success";
}

function setInvalid(inputField, message) {
  const inputControl = inputField.parentElement;
  const small = inputControl.querySelector("small");
  inputControl.className = "input-control error";
  small.innerText = message;
}
