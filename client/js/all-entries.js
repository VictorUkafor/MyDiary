const searchField = '<div class="search-box">'+
'<form class="form-inline"><div class="">' +
'<input type="text" class="search-field" placeholder="Enter your term . . .">' +
'</div><button type="submit" class="search-button">Search</button></form></div>';

const pagination = '<div class="pagination">' +
'<button type="submit" class="pagination-link first-page"><<</button>' + 
'<button type="submit" class="pagination-link page-number">1</button>' +
'<button type="submit" class="pagination-link page-number">2</button>' +
'<button type="submit" class="pagination-link page-number">3</button>' +
'<button type="submit" class="pagination-link page-number">4</button>' +                
'<button type="submit" class="pagination-link last-page">>></button></div>'


function entryThumbnail(entry){
    let content = entry.content;
    if(entry.content.length > 100){
        content = entry.content.substring(0, 20) + ' . . . Read More';
    }
    return '<div class="entry-container">'+
    '<div class="entry-body"><a onclick="viewEntry('+ entry.entry_id+')">'+
    '<h1 class="entry-h1 underline">'+ entry.title +'</h1>'+
    '<hr class="entry-hr"/><p class="entryP underline">'+ content +'</p></a></div>'+
    '<button onclick="modifyEntry('+ entry.entry_id+')"  type="submit" class="form-button button2">Modify</button>' +
    '<button onclick="deleteEntry('+ entry.entry_id+')" type="submit" class="form-button button2">Delete</button>' +
    '</div>';
}

function getAllEntries(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries';
    const token = localStorage.getItem('token');
    const addEntry = localStorage.getItem('addEntry');
    const deleteEntry = localStorage.getItem('deleteEntry');
    const dataForFetch = { 
        method: 'GET', 
        headers: { 
            "Content-Type": "application/json",
            "authentication": token
         }
        }

    fetch(url, dataForFetch)
    .then((res) => res.json()) 
    .then((data) => {
        if(data.authenticated === false || data.errors){
            const login = 'OOP! You have to login';
            window.localStorage.setItem('login', login);
            window.location.href = 'sign-in.html';   
        } else if(data.message){
            document.getElementById("successMessage").innerHTML =
             '<h1 class="successField">'+ data.message +'</h1>';
        } else {
            if(addEntry){
            document.getElementById("successMessage").innerHTML =
             '<h1 class="successField">'+ addEntry +'</h1>';
            }

            if(deleteEntry){
                document.getElementById("successMessage").innerHTML =
                 '<h1 class="successField">'+ deleteEntry +'</h1>';
            }

            document.getElementById('search').innerHTML = searchField;
            data.forEach((entry) => {
                document.getElementById('entries').innerHTML += entryThumbnail(entry);
            })
            document.getElementById('entries').innerHTML += pagination;
        } 
        window.localStorage.removeItem('addEntry');
        window.localStorage.removeItem('deleteEntry');
      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

getAllEntries();
