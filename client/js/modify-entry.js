const modifyEntry = () => {
  const entryId = localStorage.getItem('entryId');
  const url = `https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/${entryId}`;
  const token = localStorage.getItem('token');
  const dataForFetch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch)
    .then(res => res.json())
    .then((data) => {
      if (data.authenticated === false || data.errors) {
        const login = 'oop! You have to login';
        window.localStorage.setItem('login', login);
        window.location.href = 'sign-in.html';
      } else {
        document.getElementById('title').value = data.title;
        document.getElementById('Entry_content').value = data.content;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
};

modifyEntry();


const processModifyEntry = () => {
  const entryId = localStorage.getItem('entryId');
  const url = `https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/${entryId}`;
  const token = localStorage.getItem('token');
  const title = document.forms.modifyEntry.title.value;
  const content = document.forms.modifyEntry.content.value;

  document.getElementById('errorMessage').innerHTML = '';

  const dataForFetch = {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch)
    .then(res => res.json())
    .then((data) => {
      if (data.authenticated === false) {
        const login = 'oop! You have to login';
        window.localStorage.setItem('login', login);
        window.location.href = 'sign-in.html';
      } else if (data.errors) {
        document.getElementById('errorMessage').innerHTML =
        `<h1 class="errorField">${data.errors}</h1>`;
      } else {
        window.localStorage.setItem('modifyEntry', data.success);
        window.location.href = 'single-entry.html';
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
};
