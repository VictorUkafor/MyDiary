'use strict';

var userProfile = function userProfile() {
  var url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/user';
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
      photo = data.photograph;
      if (data.photograph === '') {
        photo = 'no-image.png';
      }
      document.getElementById('profile-image').src = 'images/users/' + String(photo);
      document.getElementById('firstName').innerHTML = data.firstname;
      document.getElementById('lastName').innerHTML = data.lastname;
      document.getElementById('email').innerHTML = data.email;
      document.getElementById('numberOfEntries').innerHTML = data.entries.length;
    }
  })['catch'](function (error) {
    console.log(error);
  });

  return false;
};

userProfile();
//# sourceMappingURL=profile.js.map