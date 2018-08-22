function getAllEntriesBySearch() {
    const page = localStorage.getItem('page');
    const url = `https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/search?page=${page}`;
    const token = localStorage.getItem('token');
    const deleteEntry = localStorage.getItem('deleteEntry');

    const search = document.forms.searchBar.search.value;
    const dataForFetch = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ search }),
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
               `<h1 class="successField">${data.message}</h1>`;
        } else {

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
        
        window.localStorage.removeItem('deleteEntry');
      })
      .catch((error) => {
        console.log(error);
      });
  
    return false;
  }