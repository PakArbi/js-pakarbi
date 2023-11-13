import {
    deleteCookie
} from 'https://jscroot.github.io/cookie/croot.js';

function fungsiAlert() {
    alert("Apakah anda ingin keluar?")
}

function logout() {

    deleteCookie('user_token');
    window.location.href = '/pages/login.html';
}


document.getElementById('logoutButton').addEventListener('click', logout);