'use strict';

var getAllEntriesBySearch = function getAllEntriesBySearch() {
  var page = localStorage.getItem('page');
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/search?page=' + String(page);
  var token = localStorage.getItem('token');
  var deleteEntry = localStorage.getItem('deleteEntry');
  var search = localStorage.getItem('search');

  var dataForFetch = {
    method: 'POST',
    body: JSON.stringify({ search: search }),
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.authenticated === false || data.errors) {
      var login = 'oop! You have to login';
      window.localStorage.setItem('login', login);
      window.location.href = 'sign-in.html';
    } else if (data.message) {
      document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(deleteEntry) + '</h1>';

      if (deleteEntry === null) {
        document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(data.message) + '</h1>';
      }
    } else {
      if (deleteEntry) {
        document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(deleteEntry) + '</h1>';
      }

      document.getElementById('search').innerHTML = searchField;
      data.allEntries.forEach(function (entry) {
        document.getElementById('entries').innerHTML += entryThumbnail(entry);
      });
      if (data.total > data.allEntries.length) {
        document.getElementById('entries').innerHTML += pagination(page, data.total);
      }
    }

    window.localStorage.removeItem('deleteEntry');
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};
//# sourceMappingURL=all-entries-by-search.js.map