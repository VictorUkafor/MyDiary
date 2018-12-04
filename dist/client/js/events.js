'use strict';

var indexPage = function indexPage() {
  var token = localStorage.getItem('token');
  if (token) {
    window.localStorage.setItem('entriesPage', 'default');
    window.location.href = 'all-entries.html';
  } else {
    window.location.href = 'index.html';
  }
};

var signUpPage = function signUpPage() {
  window.location.href = 'sign-up.html';
};

var signInPage = function signInPage() {
  window.location.href = 'sign-in.html';
};

var addEntryPage = function addEntryPage() {
  window.location.href = 'add-entry.html';
};

var setEntriesPage = function setEntriesPage() {
  var search = document.forms.searchBar.search.value;
  window.localStorage.setItem('search', search);
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'search');
  window.location.href = 'all-entries.html';
};

var allEntriesPage = function allEntriesPage() {
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'default');
  window.location.href = 'all-entries.html';
};

var modifyEntryPage = function modifyEntryPage() {
  window.location.href = 'modify-entry.html';
};

var profilePage = function profilePage() {
  window.location.href = 'profile.html';
};

var singleEntryPage = function singleEntryPage() {
  window.location.href = 'single-entry.html';
};

var logOut = function logOut() {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('logout', 'You\'re now logged out!');
  window.location.href = 'sign-in.html';
};

var viewEntry = function viewEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'single-entry.html';
};

var modifyEntry = function modifyEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'modify-entry.html';
};

var deleteEntry = function deleteEntry(id) {
  window.localStorage.setItem('entryId', id);
  processDeleteEntry();
};

var backwardNav = function backwardNav(page) {
  window.localStorage.setItem('page', page - 1);
  window.location.href = 'all-entries.html';
};

var forwardNav = function forwardNav(page) {
  window.localStorage.setItem('page', page + 1);
  window.location.href = 'all-entries.html';
};

var setPage = function setPage(newpage) {
  window.localStorage.setItem('page', newpage);
  window.location.href = 'all-entries.html';
};
//# sourceMappingURL=events.js.map