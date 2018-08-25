const oneEntry = (entry) => {
  return `${'<div class="entry-container">' +
    '<div class="entry-body"><h1 class="entry-h1">'}${entry.title}</h1>` +
    `<hr class="entry-hr"/><p class="entryP">${entry.content}</p></div>` +
    `<button onclick="modifyEntry(${entry.entry_id})"  type="submit" class="form-button button2">Modify</button>` +
    `<button onclick="deleteEntry(${entry.entry_id})" type="submit" class="form-button button2">Delete</button>` +
    '</div>';
}

const getEntry = () => {
  const entryId = localStorage.getItem('entryId');
  const url = `https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/${entryId}`;
  const token = localStorage.getItem('token');
  const modifyEntry = localStorage.getItem('modifyEntry');
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
        if (modifyEntry) {
          document.getElementById('successMessage').innerHTML =
          `<h1 class="successField">${modifyEntry}</h1>`;
        }
        document.getElementById('single-entry').innerHTML += oneEntry(data);
        window.localStorage.removeItem('modifyEntry');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}

getEntry();
