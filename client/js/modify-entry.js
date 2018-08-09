function modifyEntry(){
    const entryId = localStorage.getItem('entryId');
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + entryId;
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
        } else {
            window.localStorage.setItem('entryId', entryId);
            document.getElementById('title').value = data.title;
            document.getElementById('content').value = data.content;
        }

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

modifyEntry();


function processModifyEntry(){
    const entryId = localStorage.getItem('entryId');
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries/' + entryId;
    const token = localStorage.getItem('token');

    let title = document.forms["modifyEntry"]["title"].value;
    let content = document.forms["modifyEntry"]["content"].value;

    const dataForFetch = { 
        method: 'PUT', 
        body: JSON.stringify({ title, content }),
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
        } else {
            window.location.href = 'all-entries.html';
        }

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}