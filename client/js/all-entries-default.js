const getAllEntriesDefault = () => {
  const page = localStorage.getItem('page');
  const url = `https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries?page=${page}`;
  const token = localStorage.getItem('token');
  const addEntry = localStorage.getItem('addEntry');
  const deleteEntry = localStorage.getItem('deleteEntry');
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
      } else if (data.message) {
        document.getElementById('successMessage').innerHTML = 
        `<h1 class="successField">${deleteEntry}</h1>`;

        if (deleteEntry === null) {
          document.getElementById('successMessage').innerHTML =
          `<h1 class="successField">${data.message}</h1>`;
        }
      } else {
        if (addEntry) {
          document.getElementById('successMessage').innerHTML =
          `<h1 class="successField">${addEntry}</h1>`;
        }

        if (deleteEntry) {
          document.getElementById('successMessage').innerHTML =
          `<h1 class="successField">${deleteEntry}</h1>`;
        }

        document.getElementById('search').innerHTML = searchField;
        data.allEntries.forEach((entry) => {
          document.getElementById('entries').innerHTML += entryThumbnail(entry);
        });
        if (data.total > data.allEntries.length) {
          document.getElementById('entries').innerHTML += pagination(page, data.total);
        }
      }
      window.localStorage.removeItem('addEntry');
      window.localStorage.removeItem('deleteEntry');
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}
