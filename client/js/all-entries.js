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
        }

      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

getAllEntries();