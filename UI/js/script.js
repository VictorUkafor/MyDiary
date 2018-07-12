function validateSignUpForm(){
    let firstName = document.forms["signUp"]["firstName"].value;
    let lastName = document.forms["signUp"]["lastName"].value;
    let email = document.forms["signUp"]["email"].value;
    let password = document.forms["signUp"]["password"].value;
    let confirmPassword = document.forms["signUp"]["confirmPassword"].value;
    let photograph = document.forms["signUp"]["photograph"].value;

    document.getElementById('firstNameError').innerHTML = '';
    document.getElementById('lastNameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('confirmPasswordError').innerHTML = '';
    document.getElementById('photographError').innerHTML = '';

    if(firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' &&
     password.trim() !== '' && confirmPassword.trim() !== '' && photograph.trim() !== '' &&
    confirmPassword.trim() === password.trim()){
        return true;
    } else{

    if(firstName.trim() === ''){
        const firstNameError = 'First Name field is required';
        document.getElementById('firstNameError').innerHTML = '<h1 class="errorField">'+ firstNameError +'</h1>';
        document.getElementById('FirstName').value = "";   
    }

    if(lastName.trim() === ''){
        const lastNameError = 'Last Name field is required';
        document.getElementById('lastNameError').innerHTML += '<h1 class="errorField">'+ lastNameError +'</h1>';   
        document.getElementById('LastName').value = "";   
    } 
    
    if(email.trim() === ''){
        const emailError = 'Email field is required';
        document.getElementById('emailError').innerHTML += '<h1 class="errorField">'+ emailError +'</h1>'; 
        document.getElementById('Email').value = "";   
    }  
    
    if(email.trim() !== '' && !email.trim().indexOf('@') > -1){
        const emailError = 'You\'ve entered an invalid email' ;
        document.getElementById('emailError').innerHTML += '<h1 class="errorField">'+ emailError +'</h1>'; 
        document.getElementById('Email').value = "";   
    } 

    if(password.trim() === ''){
        const passwordError = 'Password field is required';
        document.getElementById('passwordError').innerHTML += '<h1 class="errorField">'+ passwordError +'</h1>'; 
        document.getElementById('Password1').value = "";    
    } 
    
    if(confirmPassword.trim() === ''){
        const confirmPasswordError = 'Confirm Password field is required';
        document.getElementById('confirmPasswordError').innerHTML += '<h1 class="errorField">'+ confirmPasswordError +'</h1>';
        document.getElementById('Password2').value = "";  
    } 

    if(confirmPassword.trim() !== '' && password.trim() !== confirmPassword.trim()){
        const confirmPasswordError = 'Passwords do not match';
        document.getElementById('confirmPasswordError').innerHTML += '<h1 class="errorField">'+ confirmPasswordError +'</h1>';  
        document.getElementById('Password2').value = "";    
    } 

    if(photograph.trim() === ''){ 
        const photographError = 'You must upload your passport';
        document.getElementById('photographError').innerHTML += '<h1 class="errorField">'+ photographError +'</h1>';
        document.getElementById('Photograph').value = "";    
    }   

    
    return false; 
    }

    
    return false
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


function validateAddEntryForm(){
    let entryContent = document.forms["addEntry"]["entryContent"].value;

    if(entryContent.trim() === ''){
        const entryContentError = 'You must some entry';
        document.getElementById('entryContentError').innerHTML = '<h1 class="errorField">'+ entryContentError +'</h1>'; 
    }   

    return false;
}