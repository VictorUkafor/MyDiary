
// onSumbit event for signup form

function validateSignUpForm(){
    const firstName = document.forms["signUp"]["firstName"].value;
    const lastName = document.forms["signUp"]["lastName"].value;
    const email = document.forms["signUp"]["email"].value;
    const password = document.forms["signUp"]["password"].value;
    const confirmPassword = document.forms["signUp"]["confirm_password"].value;

    document.getElementById('firstNameError').innerHTML = '';
    document.getElementById('lastNameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('confirm_passwordError').innerHTML = '';

    if(firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' &&
     password.trim() !== '' && confirmPassword.trim() !== '' &&
    confirmPassword.trim() === password.trim()){
        return processSignUp();
    } else{

    if(firstName.trim() === ''){
        const firstNameError = 'First Name field is required';
        document.getElementById('firstNameError').innerHTML = '<h1 class="errorField">'+ firstNameError +'</h1>';
        document.getElementById('FirstName').value = "";   
    }

    if(lastName.trim() === ''){
        const lastNameError = 'Last Name field is required';
        document.getElementById('lastNameError').innerHTML = '<h1 class="errorField">'+ lastNameError +'</h1>';   
        document.getElementById('LastName').value = "";   
    } 
    
    if(email.trim() === ''){
        const emailError = 'Email field is required';
        document.getElementById('emailError').innerHTML = '<h1 class="errorField">'+ emailError +'</h1>'; 
        document.getElementById('Email').value = "";   
    }  

    if(password.trim() === ''){
        const passwordError = 'Password field is required';
        document.getElementById('passwordError').innerHTML = '<h1 class="errorField">'+ passwordError +'</h1>'; 
        document.getElementById('Password1').value = "";    
    } 
    
    if(confirmPassword.trim() === ''){
        const confirmPasswordError = 'Confirm Password field is required';
        document.getElementById('confirm_passwordError').innerHTML = '<h1 class="errorField">'+ confirmPasswordError +'</h1>';
        document.getElementById('Password2').value = "";  
    } 

    if(password.trim() !== '' && confirmPassword.trim() !== ''){
        if(password !== confirmPassword){
        const confirmPasswordError1 = 'Passwords do not match';
        document.getElementById('confirm_passwordError').innerHTML = '<h1 class="errorField">'+ confirmPasswordError1 +'</h1>';  
        document.getElementById('Password2').value = ""; 
    }   
    } 


    
    return false; 
    }

    
    return false
}


// onSumbit event for signin form

function validateSignInForm(){
    const email = document.forms["signIn"]["email"].value;
    const password = document.forms["signIn"]["password"].value;

    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    if(email.trim() !== '' && password.trim() !== ''){
        return processLogIn();
    } else {

    if(email.trim() === ''){
        const emailError = 'Email field is required';
        document.getElementById('emailError').innerHTML = '<h1 class="errorField">'+ emailError +'</h1>'; 
        document.getElementById('Email').value = "";
    } 
    
    if(password.trim() === ''){
        const passwordError = 'Password field is required';
        document.getElementById('passwordError').innerHTML = '<h1 class="errorField">'+ passwordError +'</h1>'; 
        document.getElementById('Password1').value = "";
    }  

    return false;
}

    return false;
}



// onSumbit event for add entry  form

function validateAddEntryForm(){
    const entryContent = document.forms["addEntry"]["content"].value;

    document.getElementById('entryContentError').innerHTML = '';

    if(entryContent.trim() === ''){
        const entryContentError = 'You must some entry';
        document.getElementById('entryContentError').innerHTML =
         '<h1 class="errorField">'+ entryContentError +'</h1>'; 
        document.getElementById('Entry_content').value = "";

        return false;
    }  else {
        return processAddEntry();
    } 

    return false;
}



function validateModifyEntryForm(){
    const entryContent = document.forms["modifyEntry"]["content"].value;

    document.getElementById('entryContentError').innerHTML = '';

    if(entryContent.trim() === ''){
        const entryContentError = 'You must some entry';
        document.getElementById('entryContentError').innerHTML = 
        '<h1 class="errorField">'+ entryContentError +'</h1>'; 
        document.getElementById('Entry_content').value = "";

        return false;
    }  else {
        return processModifyEntry();
    } 

    return false;
}


