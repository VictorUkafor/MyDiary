'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var displayErrorInFields = function displayErrorInFields(errors, field) {
  document.getElementById(String(field) + 'Error').innerHTML = '<h1 class="errorField">' + String(errors[field]) + '</h1>';
};

var processSignUp = function processSignUp() {
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/auth/signup';
  var firstName = document.forms.signUp.firstName.value;
  var lastName = document.forms.signUp.lastName.value;
  var email = document.forms.signUp.email.value;
  var password = document.forms.signUp.password.value;
  var confirm_password = document.forms.signUp.confirm_password.value;
  var body = {
    firstName: firstName, lastName: lastName, email: email, password: password, confirm_password: confirm_password
  };
  var fields = ['firstName', 'lastName', 'email', 'password', 'confirm_password'];

  document.getElementById('firstNameError').innerHTML = '';
  document.getElementById('lastNameError').innerHTML = '';
  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  document.getElementById('confirm_passwordError').innerHTML = '';
  document.getElementById('photographError').innerHTML = '';
  document.getElementById('errorMessage').innerHTML = '';
  document.getElementById('successMessage').innerHTML = '';

  var dataForFetch = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(url, dataForFetch).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.errors) {
      if (data.errors !== null && _typeof(data.errors) === 'object') {
        fields.forEach(function (field) {
          if (data.errors[field]) {
            return displayErrorInFields(data.errors, field);
          }
        });
      } else {
        document.getElementById('errorMessage').innerHTML = '<h1 class="errorField">' + String(data.errors) + '</h1>';
      }
    } else if (data.success) {
      document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(data.success) + '</h1>';
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};
//# sourceMappingURL=process-signup.js.map