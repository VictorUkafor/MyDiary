function indexPage() {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'all-entries.html';
  } else {
    window.location.href = 'index.html';
  }
}

function signUpPage() {
  window.location.href = 'sign-up.html';
}

function signInPage() {
  window.location.href = 'sign-in.html';
}

function addEntryPage() {
  window.location.href = 'add-entry.html';
}

function allEntriesPage() {
  window.location.href = 'all-entries.html';
}

function modifyEntryPage() {
  window.location.href = 'modify-entry.html';
}

function profilePage() {
  window.location.href = 'profile.html';
}

function singleEntryPage() {
  window.location.href = 'single-entry.html';
}


function logOut() {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('logout', 'You\'re now logged out!');
  window.location.href = 'sign-in.html';
}

function viewEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'single-entry.html';
}

function modifyEntry(id) {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'modify-entry.html';
}

function deleteEntry(id) {
  window.localStorage.setItem('entryId', id);
  processDeleteEntry();
}

function backwardNav(page){
  window.localStorage.setItem('page', page-1);
  window.location.href = 'all-entries.html';
}

function forwardNav(page){
  window.localStorage.setItem('page', page+1);
  window.location.href = 'all-entries.html';
}

function setPage(newpage) {
  window.localStorage.setItem('page', newpage);
  window.location.href = 'all-entries.html';
}