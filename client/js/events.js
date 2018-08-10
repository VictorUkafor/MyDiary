function indexPage(){
    window.location.href = 'index.html';
}

function signInPage(){
    window.location.href = 'sign-in.html';
}

function addEntryPage(){
    window.location.href = 'add-entry.html';
}

function allEntriesPage(){
    window.location.href = 'all-entries.html';
}

function modifyEntryPage(){
    window.location.href = 'modify-entry.html';
}

function profilePage(){
    window.location.href = 'profile.html';
}

function singleEntryPage(){
    window.location.href = 'single-entry.html';
}




function logOut(){
    window.localStorage.removeItem('token');
    window.localStorage.setItem('logout', 'You\'re now logged out!');
    window.location.href = 'sign-in.html'; 
}

function viewEntry(id){
    window.localStorage.setItem('entryId', id);
    window.location.href = 'single-entry.html'; 
}

function modifyEntry(id){
    window.localStorage.setItem('entryId', id);
    window.location.href = 'modify-entry.html'; 
}

function deleteEntry(id){
    window.localStorage.setItem('entryId', id);
    processDeleteEntry();
}