import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-project3-403614.cloudfunctions.net/loginUserEmail";
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
    const email = document.querySelector("#email").value;
    const passwordhash = document.querySelector("#passwordhash").value;
    const role = document.querySelector("#role").value;
    console.log(passwordhash)

    const data = {
        email: email,
        passwordhash: passwordhash,
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
    Swal.fire({
        icon: 'success',
        title: 'Daftar Berhasil',
        text: 'Anda telah berhasil daftar!',
    });
    window.location.href = "login.html"
}

// response post login
function ResponsePostLogin(response) {
    if (response && response.token) {
        setCookieWithExpireHour('Login', response.token, 2);
        window.location.href = 'https://pakarbi.vaidiq.cloud/pages/dashboard.html';
        Swal.fire({
            icon: 'success',
            title: 'Masuk Berhasil',
            text: 'Anda telah berhasil masuk!',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: 'Email atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}


export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
    ResponsePostLogin(result)
}