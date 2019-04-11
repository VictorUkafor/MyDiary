

const processAddEntry = function processAddEntry() {
  const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries';
  const token = localStorage.getItem('token');
  const title = document.forms.addEntry.title.value;
  const content = document.forms.addEntry.content.value;

  document.getElementById('errorMessage').innerHTML = '';

  const dataForFetch = {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch).then(res => res.json()).then((data) => {
    if (data.authenticated === false) {
      const login = 'oop! You have to login';
      window.localStorage.setItem('login', login);
      window.location.href = 'sign-in.html';
    } else if (data.errors) {
      document.getElementById('errorMessage').innerHTML = `<h1 class="errorField">${String(data.errors)}</h1>`;
    } else {
      window.localStorage.setItem('entriesPage', 'default');
      window.localStorage.setItem('addEntry', data.success);
      window.location.href = 'all-entries.html';
    }
  }).catch((error) => {
    console.log(error);
  });

  return false;
};
// # sourceMappingURL=add-entry.js.map
