'use strict';

var oneEntry = function oneEntry(entry) {
  return '' + ('<div class="entry-container">' + '<div class="entry-body"><h1 class="entry-h1">') + String(entry.title) + '</h1>' + ('<hr class="entry-hr"/><p class="entryP">' + String(entry.content) + '</p></div>') + ('<button onclick="modifyEntry(' + String(entry.entry_id) + ')"  type="submit" class="form-button button2">Modify</button>') + ('<button onclick="deleteEntry(' + String(entry.entry_id) + ')" type="submit" class="form-button button2">Delete</button>') + '</div>';
};

var getEntry = function getEntry() {
  var entryId = localStorage.getItem('entryId');
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + String(entryId);
  var token = localStorage.getItem('token');
  var modifyEntry = localStorage.getItem('modifyEntry');
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
      if (modifyEntry) {
        document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(modifyEntry) + '</h1>';
      }
      document.getElementById('single-entry').innerHTML += oneEntry(data);
      window.localStorage.removeItem('modifyEntry');
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};

getEntry();
//# sourceMappingURL=single-entry.js.map