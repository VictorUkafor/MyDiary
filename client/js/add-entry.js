function processAddEntry(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/entries';
    const token = localStorage.getItem('token');

    let title = document.forms["addEntry"]["title"].value;
    let content = document.forms["addEntry"]["content"].value;
    
    const dataForFetch = { 
        method: 'POST', 
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
        if(data.authenticated === false){
            const login = 'OOP! You have to login';
            window.localStorage.setItem('login', login);
            window.location.href = 'sign-in.html'; 
        } else if(data.errors) {
            document.getElementById('errorMessage').innerHTML = 
            '<h1 class="errorField">'+ data.errors +'</h1>';
        } else {
            window.localStorage.setItem('addEntry', data.success);
            window.location.href = 'all-entries.html';
        }
      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}