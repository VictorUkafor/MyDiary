function validateSignUpForm(){
    let firstName = document.forms["signUp"]["firstName"].value;
    let lastName = document.forms["signUp"]["lastName"].value;
    let email = document.forms["signUp"]["email"].value;
    let password = document.forms["signUp"]["password"].value;
    let confirmPassword = document.forms["signUp"]["confirmPassword"].value;
    let photograph = document.forms["signUp"]["photograph"].value;

    if(firstName.trim() === ''){
        const firstNameError = 'First Name field is required';
        document.getElementById('firstNameError').innerHTML = '<h1 class="errorField">'+ firstNameError +'</h1>';
    }

    if(lastName.trim() === ''){
        const lastNameError = 'Last Name field is required';
        document.getElementById('lastNameError').innerHTML = '<h1 class="errorField">'+ lastNameError +'</h1>';   
    } 
    
    if(email.trim() === ''){
        const emailError = 'Email field is required';
        document.getElementById('emailError').innerHTML = '<h1 class="errorField">'+ emailError +'</h1>'; 
    }  
    
    if(password.trim() === ''){
        const passwordError = 'Password field is required';
        document.getElementById('passwordError').innerHTML = '<h1 class="errorField">'+ passwordError +'</h1>'; 
    } 
    
    if(confirmPassword.trim() === ''){
        const confirmPasswordError = 'Confirm Password field is required';
        document.getElementById('confirmPasswordError').innerHTML = '<h1 class="errorField">'+ confirmPasswordError +'</h1>';
    } 

    if(confirmPassword.trim() !== '' && password.trim() !== confirmPassword.trim()){
        const confirmPasswordError = 'Passwords do not match';
        document.getElementById('confirmPasswordError').innerHTML = '<h1 class="errorField">'+ confirmPasswordError +'</h1>';  
    } 

    if(photograph.trim() === ''){
        const photographError = 'You must upload your passport';
        document.getElementById('photographError').innerHTML = '<h1 class="errorField">'+ photographError +'</h1>';
    }     

    
    return false;
}




function validateSignInForm(){
    let email = document.forms["signIn"]["email"].value;
    let password = document.forms["signIn"]["password"].value;


    if(email.trim() === ''){
        const emailError = 'Email field is required';
        document.getElementById('emailError').innerHTML = '<h1 class="errorField">'+ emailError +'</h1>'; 
    }  
    
    if(password.trim() === ''){
        const passwordError = 'Password field is required';
        document.getElementById('passwordError').innerHTML = '<h1 class="errorField">'+ passwordError +'</h1>'; 
    }   

    
    return false;
}