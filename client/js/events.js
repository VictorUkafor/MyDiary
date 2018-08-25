const indexPage = () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.localStorage.setItem('entriesPage', 'default');
    window.location.href = 'all-entries.html';
  } else {
    window.location.href = 'index.html';
  }
}

const signUpPage = () => {
  window.location.href = 'sign-up.html';
}

const signInPage = () => {
  window.location.href = 'sign-in.html';
}

const addEntryPage = () => {
  window.location.href = 'add-entry.html';
}

const setEntriesPage = () => {
  const search = document.forms.searchBar.search.value;
  window.localStorage.setItem('search', search);
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'search');
  window.location.href = 'all-entries.html';
}

const allEntriesPage = () => {
  window.localStorage.setItem('page', 1);
  window.localStorage.setItem('entriesPage', 'default');
  window.location.href = 'all-entries.html';
}

const modifyEntryPage = () => {
  window.location.href = 'modify-entry.html';
}

const profilePage = () => {
  window.location.href = 'profile.html';
}

const singleEntryPage = () => {
  window.location.href = 'single-entry.html';
}

const logOut = () => {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('logout', 'You\'re now logged out!');
  window.location.href = 'sign-in.html';
}

const viewEntry = (id) => {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'single-entry.html';
}

const modifyEntry = (id) => {
  window.localStorage.setItem('entryId', id);
  window.location.href = 'modify-entry.html';
}

const deleteEntry = (id) => {
  window.localStorage.setItem('entryId', id);
  processDeleteEntry();
}

const backwardNav = (page) => {
  window.localStorage.setItem('page', page - 1);
  window.location.href = 'all-entries.html';
}

const forwardNav = (page) => {
  window.localStorage.setItem('page', page + 1);
  window.location.href = 'all-entries.html';
}

const setPage = (newpage) => {
  window.localStorage.setItem('page', newpage);
  window.location.href = 'all-entries.html';
}
