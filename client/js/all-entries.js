const searchField = '<div class="search-box">' +
'<form method="POST" name="searchBar" class="form-inline"><div class="">' +
'<input name="search" type="text" class="search-field" placeholder="Enter your term . . .">' +
'</div><button onclick="setEntriesPage()" type="submit" class="search-button">Search</button></form></div>';


function navBackward(page) {
  if (page === '1') {
    return '';
  }
  return `<button onclick="backwardNav(${page})" type="submit"
   class="pagination-link first-page"><<</button>`;
}

function navForward(page, total) {
  const lastPage = total / 5;
  if (lastPage > page) {
    return `<button onclick="forwardNav(${page})" type="submit"
     class="pagination-link first-page">>></button>`;
  }
  return '';
}


function pagination(page, total) {
  let pagPage = '';
  let counter = 0;
  let active = '';
  for (let count = 0; count < total; count += 5) {
    counter++;
    if (page == counter) {
      active = 'active';
    }
    pagPage += `<button onclick="setPage(${counter})" type="submit" 
     class="pagination-link page-number ${active}">${counter}</button>`;
    active = '';
  }

  return `<div class="pagination">
  ${navBackward(page)}${pagPage}${navForward(page, total)}
    </div>`;
}


function entryThumbnail(entry) {
  let content = entry.content;
  if (entry.content.length > 100) {
    content = `${entry.content.substring(0, 20)} . . . Read More`;
  }
  return `${'<div class="entry-container">' +
    '<div class="entry-body"><a onclick="viewEntry('}${entry.entry_id})">` +
    `<h1 class="entry-h1 underline">${entry.title}</h1>` +
    `<hr class="entry-hr"/><p class="entryP underline">${content}</p></a></div>` +
    `<button onclick="modifyEntry(${entry.entry_id})"  type="submit" class="form-button button2">Modify</button>` +
    `<button onclick="deleteEntry(${entry.entry_id})" type="submit" class="form-button button2">Delete</button>` +
    '</div>';
}

function getAllEntries() {
  const entriesPage = localStorage.getItem('entriesPage');
  console.log(entriesPage); 

  if(entriesPage === 'search'){
    return getAllEntriesBySearch();
  } else {
    return getAllEntriesDefault()
  }

}

getAllEntries();
