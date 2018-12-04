'use strict';

var processDeleteEntry = function processDeleteEntry() {
  var entryId = localStorage.getItem('entryId');
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + String(entryId);
  var token = localStorage.getItem('token');
  var dataForFetch = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authentication: token
    }
  };

  fetch(url, dataForFetch).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.authenticated === false) {
      window.location.href = 'sign-in.html';
      document.getElementById('errorMessage').innerHTML = '<h1 class="errorField"> You have to login! </h1>';
    } else if (data.errors) {
      document.getElementById('errorMessage').innerHTML = '<h1 class="errorField">' + String(data.errors) + '</h1>';
    } else {
      window.localStorage.setItem('deleteEntry', data.success);
      window.location.href = 'all-entries.html';
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};
//# sourceMappingURL=delete-entry.js.map