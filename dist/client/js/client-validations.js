'use strict';

// onSumbit event for signup form
var validateSignUpForm = function validateSignUpForm() {
  var firstName = document.forms.signUp.firstName.value;
  var lastName = document.forms.signUp.lastName.value;
  var email = document.forms.signUp.email.value;
  var password = document.forms.signUp.password.value;
  var confirmPassword = document.forms.signUp.confirm_password.value;
  var photograph = document.forms.signUp.photograph.value;

  document.getElementById('firstNameError').innerHTML = '';
  document.getElementById('lastNameError').innerHTML = '';
  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  document.getElementById('confirm_passwordError').innerHTML = '';
  document.getElementById('photographError').innerHTML = '';
  document.getElementById('errorMessage').innerHTML = '';
  document.getElementById('successMessage').innerHTML = '';

  if (firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && confirmPassword.trim() === password.trim()) {
    return processSignUp();
  }

  if (firstName.trim() === '') {
    var firstNameError = 'First Name field is required';
    document.getElementById('firstNameError').innerHTML = '<h1 class="errorField">' + firstNameError + '</h1>';
    document.getElementById('FirstName').value = '';
  }

  if (lastName.trim() === '') {
    var lastNameError = 'Last Name field is required';
    document.getElementById('lastNameError').innerHTML = '<h1 class="errorField">' + lastNameError + '</h1>';
    document.getElementById('LastName').value = '';
  }

  if (email.trim() === '') {
    var emailError = 'Email field is required';
    document.getElementById('emailError').innerHTML = '<h1 class="errorField">' + emailError + '</h1>';
    document.getElementById('Email').value = '';
  }

  if (password.trim() === '') {
    var passwordError = 'Password field is required';
    document.getElementById('passwordError').innerHTML = '<h1 class="errorField">' + passwordError + '</h1>';
    document.getElementById('Password1').value = '';
  }

  if (confirmPassword.trim() === '') {
    var confirmPasswordError = 'Confirm Password field is required';
    document.getElementById('confirm_passwordError').innerHTML = '<h1 class="errorField">' + confirmPasswordError + '</h1>';
    document.getElementById('Password2').value = '';
  }

  if (password.trim() !== '' && confirmPassword.trim() !== '') {
    if (password !== confirmPassword) {
      var confirmPasswordError1 = 'Passwords do not match';
      document.getElementById('confirm_passwordError').innerHTML = '<h1 class="errorField">' + confirmPasswordError1 + '</h1>';
      document.getElementById('Password2').value = '';
    }
  }

  var fileExt = photograph.split('.').pop();

  if (photograph) {
    if (fileExt !== 'jpg' && fileExt !== 'png' && fileExt !== 'jpeg' && fileExt !== 'gif') {
      var photographError = 'File must be an image';
      document.getElementById('photographError').innerHTML = '<h1 class="errorField">' + photographError + '</h1>';
      document.getElementById('photograph').value = '';
    }
  }

  return false;
};

// onSumbit event for signin form
var validateSignInForm = function validateSignInForm() {
  var email = document.forms.signIn.email.value;
  var password = document.forms.signIn.password.value;

  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';

  if (email.trim() !== '' && password.trim() !== '') {
    return processLogIn();
  }

  if (email.trim() === '') {
    var emailError = 'Email field is required';
    document.getElementById('emailError').innerHTML = '<h1 class="errorField">' + emailError + '</h1>';
    document.getElementById('Email').value = '';
  }

  if (password.trim() === '') {
    var passwordError = 'Password field is required';
    document.getElementById('passwordError').innerHTML = '<h1 class="errorField">' + passwordError + '</h1>';
    document.getElementById('Password1').value = '';
  }

  return false;
};

// onSumbit event for add entry  form
var validateAddEntryForm = function validateAddEntryForm() {
  var entryContent = document.forms.addEntry.content.value;

  document.getElementById('entryContentError').innerHTML = '';

  if (entryContent.trim() === '') {
    var entryContentError = 'You must some entry';
    document.getElementById('entryContentError').innerHTML = '<h1 class="errorField">' + entryContentError + '</h1>';
    document.getElementById('Entry_content').value = '';

    return false;
  }

  return processAddEntry();
};

var validateModifyEntryForm = function validateModifyEntryForm() {
  var entryContent = document.forms.modifyEntry.content.value;

  document.getElementById('entryContentError').innerHTML = '';

  if (entryContent.trim() === '') {
    var entryContentError = 'You must some entry';
    document.getElementById('entryContentError').innerHTML = '<h1 class="errorField">' + entryContentError + '</h1>';
    document.getElementById('Entry_content').value = '';

    return false;
  }

  return processModifyEntry();
};
//# sourceMappingURL=client-validations.js.map