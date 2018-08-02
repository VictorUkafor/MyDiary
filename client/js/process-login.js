
function displayErrorInFields(errors, field){
    document.getElementById(field+'Error').innerHTML = '<h1 class="errorField">'+ errors[field] +'</h1>';
}

function processLogIn(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/auth/login';
    
    let email = document.forms["signIn"]["email"].value;
    let password = document.forms["signIn"]["password"].value;

    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    const fields = [ 'email', 'password']
    const dataForFetch = { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
    }

    fetch(url, dataForFetch)
    .then((res) => res.json()) 
    .then((data) => {
        if(data.errors){
            if(data.errors !== null && typeof data.errors === 'object'){
                fields.forEach((field) =>{
                    if(data.errors[field]){
                    return displayErrorInFields(data.errors, field);
                }
                })
            } else {
                document.getElementById("errorMessage").innerHTML
                 = '<h1 class="errorField">'+ data.errors +'</h1>';
            }
            
        }else if(data.message){
            window.localStorage.setItem('token', data.token);
            window.location.href = 'all-entries.html';   
        }
      })
      .catch((error) => {
        console.log(error);
      });

      return false;
}