const displayErrorInFields = (errors, field) => {
  document.getElementById(`${field}Error`).innerHTML =
  `<h1 class="errorField">${errors[field]}</h1>`;
}

const processSignUp = () => {
  const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/auth/signup';
  const firstName = document.forms.signUp.firstName.value;
  const lastName = document.forms.signUp.lastName.value;
  const email = document.forms.signUp.email.value;
  const password = document.forms.signUp.password.value;
  const confirm_password = document.forms.signUp.confirm_password.value;
  const body = {
    firstName, lastName, email, password, confirm_password
  };
  const fields = ['firstName', 'lastName', 'email', 'password', 'confirm_password'];

  document.getElementById('firstNameError').innerHTML = '';
  document.getElementById('lastNameError').innerHTML = '';
  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  document.getElementById('confirm_passwordError').innerHTML = '';
  document.getElementById('photographError').innerHTML = '';
  document.getElementById('errorMessage').innerHTML = '';
  document.getElementById('successMessage').innerHTML = '';

  const dataForFetch = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(url, dataForFetch)
    .then(res => res.json())
    .then((data) => {
      if (data.errors) {
        if (data.errors !== null && typeof data.errors === 'object') {
          fields.forEach((field) => {
            if (data.errors[field]) {
              return displayErrorInFields(data.errors, field);
            }
          });
        } else {
          document.getElementById('errorMessage').innerHTML =
          `<h1 class="errorField">${data.errors}</h1>`;
        }
      } else if (data.success) {
        document.getElementById('successMessage').innerHTML =
        `<h1 class="successField">${data.success}</h1>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}
