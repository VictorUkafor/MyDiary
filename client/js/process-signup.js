function processSignUp(){
    const url = 'https://deploy-challenge3-to-heroku.herokuapp.com/api/v1/auth/signup';
    
    let firstName = document.forms["signUp"]["firstName"].value;
    let lastName = document.forms["signUp"]["lastName"].value;
    let email = document.forms["signUp"]["email"].value;
    let password = document.forms["signUp"]["password"].value;
    let confirm_password = document.forms["signUp"]["confirmPassword"].value;
    let photograph = document.forms["signUp"]["photograph"].value;

    const body = {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
        photograph
    }

    const dataForFetch = { 
        method: 'POST', 
        body: body,
        headers: new Headers()
    }

    fetch(url, dataForFetch)
    .then((res) => res.json()) 
    .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(body);
      return false;
}