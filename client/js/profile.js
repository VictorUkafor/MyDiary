function userProfile(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/user';
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
            document.getElementById("firstName").innerHTML = data.firstname;
            document.getElementById("lastName").innerHTML = data.lastname;
            document.getElementById("email").innerHTML = data.email;
            document.getElementById("numberOfEntries").innerHTML = data.entries.length;
        }
      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}

userProfile();