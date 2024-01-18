import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-project3-403614.cloudfunctions.net/loginusernpm";
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
    const usernameid = document.querySelector("#usernameid").value;
    const username = document.querySelector("#username").value;
    const npm = document.querySelector("#npm").value;
    const password = document.querySelector("#password").value;
    const passwordhash = document.querySelector("#passwordhash").value;
    const email = document.querySelector("#email").value;
    const role = document.querySelector("#role").value;

    const data = {
        usernameid: usernameid,
        username: username,
        npm: npm,
        password: password,
        passwordhash: passwordhash,
        email: email,
        role: role
    };
    return data
}

// Add this function to get user data by npm and display it on the dashboard
export function GetUserDataByNPMAndName() {
    const npm = document.getElementById("npm").value; // Assuming npm is available after login
    const nama = document.getElementById("nama").value; // Assuming nama is available after login

    // Fetch user data by npm and nama
    const apiUrl = `https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran?npm=${npm}&nama=${nama}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(userData => {
            // Display user data on the dashboard
            const userInfoElement = document.getElementById("userInfo");
            userInfoElement.innerHTML = `${userData.nama} - ${userData.npm}`;
        })
        .catch(error => console.error('Error fetching user data:', error));
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
            text: 'NPM atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}

// Call the function after login success
ResponsePostLogin(result);
GetUserDataByNPMAndName();

export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
    ResponsePostLogin(result)
}