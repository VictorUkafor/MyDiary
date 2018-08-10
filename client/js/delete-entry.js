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
            window.localStorage.setItem('deleteEntry', data.success);
            window.location.href = 'all-entries.html';
        } 

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}