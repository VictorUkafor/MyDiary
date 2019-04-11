

const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

const displayErrorInFields = function displayErrorInFields(errors, field) {
  document.getElementById(`${String(field)}Error`).innerHTML = `<h1 class="errorField">${String(errors[field])}</h1>`;
};

const processLogIn = function processLogIn() {
  const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/auth/login';
  const email = document.forms.signIn.email.value;
  const password = document.forms.signIn.password.value;

  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  document.getElementById('errorMessage').innerHTML = '';

  const fields = ['email', 'password'];
  const dataForFetch = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(url, dataForFetch).then(res => res.json()).then((data) => {
    if (data.errors) {
      if (data.errors !== null && _typeof(data.errors) === 'object') {
        fields.forEach((field) => {
          if (data.errors[field]) {
            return displayErrorInFields(data.errors, field);
          }
        });
      } else {
        document.getElementById('errorMessage').innerHTML = `<h1 class="errorField">${String(data.errors)}</h1>`;
      }
    } else if (data.message) {
      window.localStorage.setItem('entriesPage', 'default');
      window.localStorage.setItem('page', '1');
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('welcome', data.message);
      window.location.href = 'all-entries.html';
    }
  }).catch((error) => {
    console.log(error);
  });

  return false;
};
// # sourceMappingURL=process-login.js.map
