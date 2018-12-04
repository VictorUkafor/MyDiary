'use strict';

var searchField = '<div class="search-box">' + '<form method="POST" name="searchBar" class="form-inline"><div class="">' + '<input name="search" type="text" class="search-field" placeholder="Enter your term . . .">' + '</div><button onclick="setEntriesPage()" type="submit" class="search-button">Search</button></form></div>';

var navBackward = function navBackward(page) {
  if (page === '1') {
    return '';
  }
  return '<button onclick="backwardNav(' + String(page) + ')" type="submit"\n   class="pagination-link first-page"><<</button>';
};

var navForward = function navForward(page, total) {
  var lastPage = total / 5;
  if (lastPage > page) {
    return '<button onclick="forwardNav(' + page + ')" type="submit"\n     class="pagination-link first-page">>></button>';
  }
  return '';
};

var pagination = function pagination(page, total) {
  var pagPage = '';
  var counter = 0;
  var active = '';
  for (var count = 0; count < total; count += 5) {
    counter++;
    if (page == counter) {
      active = 'active';
    }
    pagPage += '<button onclick="setPage(' + counter + ')" type="submit" \n     class="pagination-link page-number ' + active + '">' + counter + '</button>';
    active = '';
  }

  return '<div class="pagination">\n  ' + String(navBackward(page)) + pagPage + String(navForward(page, total)) + '\n    </div>';
};

var entryThumbnail = function entryThumbnail(entry) {
  var content = entry.content;
  if (entry.content.length > 100) {
    content = String(entry.content.substring(0, 20)) + ' . . . Read More';
  }
  return '' + ('<div class="entry-container">' + '<div class="entry-body"><a onclick="viewEntry(') + String(entry.entry_id) + ')">' + ('<h1 class="entry-h1 underline">' + String(entry.title) + '</h1>') + ('<hr class="entry-hr"/><p class="entryP underline">' + String(content) + '</p></a></div>') + ('<button onclick="modifyEntry(' + String(entry.entry_id) + ')"  type="submit" class="form-button button2">Modify</button>') + ('<button onclick="deleteEntry(' + String(entry.entry_id) + ')" type="submit" class="form-button button2">Delete</button>') + '</div>';
};

var getAllEntries = function getAllEntries() {
  var welcome = localStorage.getItem('welcome');
  if (welcome) {
    document.getElementById('successMessage').innerHTML = '<h1 class="successField">' + String(welcome) + '</h1>';
  }
  window.localStorage.removeItem('welcome');

  var entriesPage = localStorage.getItem('entriesPage');

  if (entriesPage === 'search') {
    return getAllEntriesBySearch();
  }
  return getAllEntriesDefault();
};

getAllEntries();
//# sourceMappingURL=all-entries.js.map