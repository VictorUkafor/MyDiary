

const login = localStorage.getItem('login');
const logout = localStorage.getItem('logout');

if (login) {
  document.getElementById('errorMessage2').innerHTML = `<h1 class="errorField2">${String(login)}</h1>`;
}

if (logout) {
  document.getElementById('successMessage2').innerHTML = `<h1 class="successField">${String(logout)}</h1>`;
}

window.localStorage.clear();
// # sourceMappingURL=redirect-message.js.map
