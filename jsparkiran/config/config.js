import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-pakarbi.cloudfunctions.net/insertparkirannpm";
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
    const parkiranid = document.querySelector("#parkiranid").value;
    const nama = document.querySelector("#nama").value;
    const npm = document.querySelector("#npm").value;
    const jurusan = document.querySelector("#jurusan").value;
    const namakendaraan = document.querySelector("#namakendaraan").value;
    const nomorkendaraan = document.querySelector("#nomorkendaraan").value;
    const jeniskendaraan = document.querySelector("#jeniskendaraan").value;

    const data = {
        parkiranid: parkiranid,
        nama: nama,
        npm: npm,
        jurusan: jurusan,
        namakendaraan: namakendaraan,
        nomorkendaraan: nomorkendaraan,
        jeniskendaraan: jeniskendaraan
    };
    return data
}

// post login
export function PostLogin() {
    const npm = document.getElementById("npm").value;
    const passwordhash = document.getElementById("passwordhash").value;
    const role = document.getElementById("role").value;

    const data = {
        npm: npm,
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