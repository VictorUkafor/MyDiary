'use strict';

var modifyEntry = function modifyEntry() {
  var entryId = localStorage.getItem('entryId');
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + String(entryId);
  var token = localStorage.getItem('token');
  var dataForFetch = {
    method: 'GET',
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
    } else {
      document.getElementById('title').value = data.title;
      document.getElementById('Entry_content').value = data.content;
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};

modifyEntry();

var processModifyEntry = function processModifyEntry() {
  var entryId = localStorage.getItem('entryId');
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + String(entryId);
  var token = localStorage.getItem('token');
  var title = document.forms.modifyEntry.title.value;
  var content = document.forms.modifyEntry.content.value;

  document.getElementById('errorMessage').innerHTML = '';

  var dataForFetch = {
    method: 'PUT',
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
      window.localStorage.setItem('modifyEntry', data.success);
      window.location.href = 'single-entry.html';
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};
//# sourceMappingURL=modify-entry.js.map