const login = localStorage.getItem('login');
const logout = localStorage.getItem('logout');

if(login){
document.getElementById('errorMessage2').innerHTML =
 '<h1 class="errorField">' + login + '</h1>';
}

if(logout){
    document.getElementById('successMessage').innerHTML =
     '<h1 class="successField">' + logout + '</h1>';
 }

window.localStorage.removeItem('login');
window.localStorage.removeItem('logout');


