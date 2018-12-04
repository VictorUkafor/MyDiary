'use strict';

var processAddEntry = function processAddEntry() {
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries';
  var token = localStorage.getItem('token');
  var title = document.forms.addEntry.title.value;
  var content = document.forms.addEntry.content.value;

  document.getElementById('errorMessage').innerHTML = '';

  var dataForFetch = {
    method: 'POST',
    body: JSON.stringify({ title: title, content: content }),
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.authenticated === false) {
      var login = 'oop! You have to login';
      window.localStorage.setItem('login', login);
      window.location.href = 'sign-in.html';
    } else if (data.errors) {
      document.getElementById('errorMessage').innerHTML = '<h1 class="errorField">' + String(data.errors) + '</h1>';
    } else {
      window.localStorage.setItem('entriesPage', 'default');
      window.localStorage.setItem('addEntry', data.success);
      window.location.href = 'all-entries.html';
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};
//# sourceMappingURL=add-entry.js.map