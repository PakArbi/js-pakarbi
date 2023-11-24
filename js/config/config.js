import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-lofty-mark-401904.cloudfunctions.net/loginnewpakarbi";
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
    const npm = document.querySelector("#npm").value;
    const passwordhash = document.querySelector("#passwordhash").value;
    const role = document.querySelector("#role").value;
    console.log(password)

    const data = {
        npm: npm,
        passwordhash: passwordhash,
        role: role
    };
    return data
}

// post login
export function PostLogin() {
    // const username = document.getElementById("username").value;
    const npm = document.getElementById("npm").value;
    // const password = document.getElementById("password").value;
    const passwordhash = document.getElementById("passwordhash").value;
    // const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const data = {
        // username: username,
        npm: npm,
        // password: password,
        passwordhash: passwordhash,
        // email: email,
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
        console.log('Token User:', response.token);
        setCookieWithExpireHour('Token Login User', response.token, 2);
        window.location.href = 'https://pakarbi.vaidiq.cloud/pages/dashboard.html';
        alert("Selamat Datang")
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