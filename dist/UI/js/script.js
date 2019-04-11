

// onSumbit event for signup form

function validateSignUpForm() {
  const firstName = document.forms.signUp.firstName.value;
  const lastName = document.forms.signUp.lastName.value;
  const email = document.forms.signUp.email.value;
  const password = document.forms.signUp.password.value;
  const confirmPassword = document.forms.signUp.confirmPassword.value;
  const photograph = document.forms.signUp.photograph.value;

  document.getElementById('firstNameError').innerHTML = '';
  document.getElementById('lastNameError').innerHTML = '';
  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  document.getElementById('confirmPasswordError').innerHTML = '';
  document.getElementById('photographError').innerHTML = '';

  if (firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && photograph.trim() !== '' && confirmPassword.trim() === password.trim()) {
    return true;
  }

  if (firstName.trim() === '') {
    const firstNameError = 'First Name field is required';
    document.getElementById('firstNameError').innerHTML = `<h1 class="errorField">${firstNameError}</h1>`;
    document.getElementById('FirstName').value = '';
  }

  if (lastName.trim() === '') {
    const lastNameError = 'Last Name field is required';
    document.getElementById('lastNameError').innerHTML = `<h1 class="errorField">${lastNameError}</h1>`;
    document.getElementById('LastName').value = '';
  }

  if (email.trim() === '') {
    const emailError = 'Email field is required';
    document.getElementById('emailError').innerHTML = `<h1 class="errorField">${emailError}</h1>`;
    document.getElementById('Email').value = '';
  }

  if (password.trim() === '') {
    const passwordError = 'Password field is required';
    document.getElementById('passwordError').innerHTML = `<h1 class="errorField">${passwordError}</h1>`;
    document.getElementById('Password1').value = '';
  }

  if (confirmPassword.trim() === '') {
    const confirmPasswordError = 'Confirm Password field is required';
    document.getElementById('confirmPasswordError').innerHTML = `<h1 class="errorField">${confirmPasswordError}</h1>`;
    document.getElementById('Password2').value = '';
  }

  if (confirmPassword.trim() !== '' && password.trim() !== confirmPassword.trim()) {
    const confirmPasswordError1 = 'Passwords do not match';
    document.getElementById('confirmPasswordError').innerHTML = `<h1 class="errorField">${confirmPasswordError1}</h1>`;
    document.getElementById('Password2').value = '';
  }

  if (photograph.trim() === '') {
    const photographError = 'You must upload your passport';
    document.getElementById('photographError').innerHTML = `<h1 class="errorField">${photographError}</h1>`;
    document.getElementById('Photograph').value = '';
  }

  return false;

  return false;
}

// onSumbit event for signin form

function validateSignInForm() {
  const email = document.forms.signIn.email.value;
  const password = document.forms.signIn.password.value;

  document.getElementById('emailError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';

  if (email.trim() !== '' && password.trim() !== '') {
    return true;
  }

  if (email.trim() === '') {
    const emailError = 'Email field is required';
    document.getElementById('emailError').innerHTML = `<h1 class="errorField">${emailError}</h1>`;
    document.getElementById('Email').value = '';
  }

  if (password.trim() === '') {
    const passwordError = 'Password field is required';
    document.getElementById('passwordError').innerHTML = `<h1 class="errorField">${passwordError}</h1>`;
    document.getElementById('Password1').value = '';
  }

  return false;

  return false;
}

// onSumbit event for add entry  form

function validateAddEntryForm() {
  const entryContent = document.forms.addEntry.entryContent.value;

  document.getElementById('entryContentError').innerHTML = '';

  if (entryContent.trim() === '') {
    const entryContentError = 'You must some entry';
    document.getElementById('entryContentError').innerHTML = `<h1 class="errorField">${entryContentError}</h1>`;
    document.getElementById('Entry_content').value = '';

    return false;
  }
  return true;

  return false;
}

function validateModifyEntryForm() {
  const entryContent = document.forms.modifyEntry.entryContent.value;

  document.getElementById('entryContentError').innerHTML = '';

  if (entryContent.trim() === '') {
    const entryContentError = 'You must some entry';
    document.getElementById('entryContentError').innerHTML = `<h1 class="errorField">${entryContentError}</h1>`;
    document.getElementById('Entry_content').value = '';

    return false;
  }
  return true;

  return false;
}

const entries = ['<div class="left-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">My First Day in School</a></h3>' + '<p class="date">Last Updated: <span class="date2">Feb 25, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a><button type="submit" id="entry1" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>', '<div class="right-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">How it all started</a></h3>' + '<p class="date">Last Updated: <span class="date2">Mar 12, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a><button type="submit" id="entry2" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>', '<div class="left-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">My First Day in School</a></h3>' + '<p class="date">Last Updated: <span class="date2">Feb 25, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a><button type="submit" id="entry3" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>', '<div class="right-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">How it all started</a></h3>' + '<p class="date">Last Updated: <span class="date2">Mar 12, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a><button type="submit" id="entry4" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>', '<div class="left-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">My First Day in School</a></h3>' + '<p class="date">Last Updated: <span class="date2">Feb 25, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a><button type="submit" id="entry1" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>', '<div class="right-entry">' + '<div class="image-div">' + '<a href="single-entry.html"><img src="images/image1.jpg" class="entry-image" /></a>' + '</div>' + '<div class="entry-div">' + '<h3 class="entry-heading"><a href="single-entry.html">How it all started</a></h3>' + '<p class="date">Last Updated: <span class="date2">Mar 12, 2018</span></p>' + '<hr class="entry-line"/>' + '<p class="entry-text"><a href="single-entry.html">' + 'Lorem ipsum dolor sit amet,' + 'adipiscing elit. Etiam pulv inar, mauris sit' + 'amet interdum feugiat . . .' + '</a></p>' + '<div class="actions">' + '<a href="single-entry.html"><button type="submit" class="action-link read-more">Read More</button></a>' + '<a href="modify-entry.html"><button type="submit" class="action-link modify-entry">Modify</button></a>' + '<a onclick="deleteEntry"><button type="submit" id="entry2" class="action-link delete-entry" onclick="deleteEntry()">Delete</button></a>' + '</div>' + '</div>' + '</div>'];

// on document load
entries.forEach((entry) => {
  document.getElementById('entries').innerHTML += entry;
});

// deleting entries
function deleteEntry() {
  document.getElementById('entries').innerHTML = '';
  entries.splice(entries.length - 1, 1);

  entries.forEach((entry) => {
    document.getElementById('entries').innerHTML += entry;
  });
}
// # sourceMappingURL=script.js.map
