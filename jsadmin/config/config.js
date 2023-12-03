import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-pakarbi.cloudfunctions.net/loginadmin";
    fetch(tokenUrl)
        .then(response => response.json())
        .then(tokenData => {
            if (tokenData.token) {
                userToken = tokenData.token;
                console.log('Token dari API:', userToken);
            }
        })
        .catch(error => console.error('Gagal mengambil token:', error));
}

//get data 
export function GetDataForm() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;
    console.log(password)

    const data = {
        username: username,
        password: password,
        role: role
    };
    return data
}

// post login
export function PostLogin() {
    const email = document.getElementById("email").value;
    const passwordhash = document.getElementById("passwordhash").value;
    const role = document.getElementById("role").value;

    const data = {
        email: email,
        passwordhash: passwordhash,
        role: role
    };
    return data;
}

// alert post 
export function AlertPost(value) {
    alert(value.message + "\nRegistrasi Berhasil")
    window.location.href = "login.html"
}

// response post login
function ResponsePostLogin(response) {
    if (response && response.token) {
        setCookieWithExpireHour('Login', response.token, 2);
        window.location.href = 'https://pakarbi.vaidiq.cloud/pages/dashboard_admin.html';
        alert("Selamat Datang Admin")
    } else {
        alert('Login gagal. Silakan coba lagi.');
    }
}


export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
    ResponsePostLogin(result)
}