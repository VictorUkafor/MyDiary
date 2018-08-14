const login = localStorage.getItem('login');
const logout = localStorage.getItem('logout');

if(login){
document.getElementById('errorMessage2').innerHTML =
 '<h1 class="errorField2">' + login + '</h1>';
}

if(logout){
    document.getElementById('successMessage2').innerHTML =
     '<h1 class="successField2">' + logout + '</h1>';
 }

window.localStorage.removeItem('login');
window.localStorage.removeItem('logout');


