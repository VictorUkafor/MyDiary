function oneEntry(entry){
    return  '<div class="single-entry-image"><img src="images/image1.jpg" />' +
    '</div><div class="entry-content"><h1>'+ entry.title +'</h1>' +
    '<p class="date-p">Last Updated:  &nbsp; <span class="single-date">'+ entry.updated_at +'</span></p>' +
    '<hr class="single-line" /><p class="entry-p">'+ entry.content +'</p>' +
    '<div class="actions-2">' +
    '<a href="modify-entry.html"><button type="submit" class="action-link2 modify-entry">Modify</button></a>' +
    '<a><button type="submit" class="action-link2 delete-entry">Delete</button></a>' +
    '</div></div>';
}

function getEntry(){
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
            document.getElementById('single-entry').innerHTML += oneEntry(data);
        }

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

getEntry();
