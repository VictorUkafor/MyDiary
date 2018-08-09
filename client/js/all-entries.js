const searchField = '<div class="search-box">'+
'<form class="form-inline"><div class="">' +
'<input type="text" class="search-field" placeholder="Enter entry title . . .">' +
'</div><button type="submit" class="search-button">Search</button></form></div>';

const pagination = '<div class="pagination">' +
'<button type="submit" class="pagination-link first-page"><<</button>' + 
'<button type="submit" class="pagination-link page-number">1</button>' +
'<button type="submit" class="pagination-link page-number">2</button>' +
'<button type="submit" class="pagination-link page-number">3</button>' +
'<button type="submit" class="pagination-link page-number">4</button>' +                
'<button type="submit" class="pagination-link last-page">>></button></div>'

function viewEntry(id){
    window.localStorage.setItem('entryId', id);
    window.location.href = 'single-entry.html'; 
}

function modifyEntry(id){
    window.localStorage.setItem('entryId', id);
    window.location.href = 'modify-entry.html'; 
}

function deleteEntry(id){
    window.localStorage.setItem('entryId', id);
    processDeleteEntry();
}

function entryThumbnail(entry, entries){
    const index = entries.indexOf(entry);
    let position = '';
    if(index % 2 === 0){
      position = 'left-entry';
    }else{
        position = 'right-entry'; 
    }
    return '<div class=' + position +'><div class="image-div">' +
        '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + 
        '</div><div class="entry-div">' +
        '<h3 class="entry-heading"><a href="single-entry.html">'+ entry.title +'</a></h3>' +
        '<p class="date">Last Updated: <span class="date2">'+ entry.updated_at +'</span></p>' +
        '<hr class="entry-line"/>' +
        '<p class="entry-text"><a href="single-entry.html">'+ entry.content +'</a></p>' +
         '<div class="actions">' +
        '<a href="single-entry.html"><button onclick="viewEntry('+ entry.entry_id+')" type="submit" class="action-link read-more">Read More</button></a>' +
        '<a href="modify-entry.html"><button onclick="modifyEntry('+ entry.entry_id+')" type="submit" class="action-link modify-entry">Modify</button></a>' +
        '<a><button onclick="deleteEntry('+ entry.entry_id+')"  type="submit" id="entry1" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' +
        '</div></div></div>';
}



function getAllEntries(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries';
    const token = localStorage.getItem('token');
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
        console.log(data);
        if(data.authenticated === false || data.errors){
            window.location.href = 'sign-in.html';
            document.getElementById("errorMessage").innerHTML =
            '<h1 class="errorField"> You have to login! </h1>'; 
        } else if(data.message){
            document.getElementById("successMessage").innerHTML =
             '<h1 class="successField">'+ data.message +'</h1>';
        } else {
            document.getElementById('search').innerHTML = searchField;
            document.getElementById('pagination').innerHTML += pagination;
            data.forEach((entry) => {
                document.getElementById('entries').innerHTML += entryThumbnail(entry, data);
            })
        } 

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

getAllEntries();


function processDeleteEntry(){
    const entryId = localStorage.getItem('entryId');
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + entryId;
    const token = localStorage.getItem('token');
    const dataForFetch = { 
        method: 'DELETE', 
        headers: { 
            "Content-Type": "application/json",
            "authentication": token
         }
        }

    fetch(url, dataForFetch)
    .then((res) => res.json()) 
    .then((data) => {
        console.log(data);
        if(data.authenticated === false){
            window.location.href = 'sign-in.html';
            document.getElementById("errorMessage").innerHTML =
            '<h1 class="errorField"> You have to login! </h1>'; 
        } else if(data.errors){
            document.getElementById("errorMessage").innerHTML =
             '<h1 class="errorField">'+ data.errors +'</h1>';
        } else {
            window.location.href = 'all-entries.html';
        } 

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}