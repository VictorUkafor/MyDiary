

const indexPage = function indexPage() {
  const token = localStorage.getItem('token');
  if (token) {
    window.localStorage.setItem('entriesPage', 'default');
    window.location.href = 'all-entries.html';
  } else {
    window.location.href = 'index.html';
  }
};

const signUpPage = function signUpPage() {
  window.location.href = 'sign-up.html';
};

const signInPage = function signInPage() {
  window.location.href = 'sign-in.html';
};

const addEntryPage = function addEntryPage() {
  window.location.href = 'add-entry.html';
};

const setEntriesPage = function setEntriesPage() {
  const search = document.forms.searchBar.search.value;
  window.localStorage.setItem('search', search);
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'search');
  window.location.href = 'all-entries.html';
};

const allEntriesPage = function allEntriesPage() {
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'default');
  window.location.href = 'all-entries.html';
};

const modifyEntryPage = function modifyEntryPage() {
  window.location.href = 'modify-entry.html';
};

const profilePage = function profilePage() {
  window.location.href = 'profile.html';
};

const singleEntryPage = function singleEntryPage() {
  window.location.href = 'single-entry.html';
};

const logOut = function logOut() {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('logout', 'You\'re now logged out!');
  window.location.href = 'sign-in.html';
};

const viewEntry = function viewEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'single-entry.html';
};

const modifyEntry = function modifyEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'modify-entry.html';
};

const deleteEntry = function deleteEntry(id) {
  window.localStorage.setItem('entryId', id);
  processDeleteEntry();
};

const backwardNav = function backwardNav(page) {
  window.localStorage.setItem('page', page - 1);
  window.location.href = 'all-entries.html';
};

const forwardNav = function forwardNav(page) {
  window.localStorage.setItem('page', page + 1);
  window.location.href = 'all-entries.html';
};

const setPage = function setPage(newpage) {
  window.localStorage.setItem('page', newpage);
  window.location.href = 'all-entries.html';
};
// # sourceMappingURL=events.js.map
