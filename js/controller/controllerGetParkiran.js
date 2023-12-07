// Function to make the API request with the token
async function getUserWithToken() {
    const token = getTokenFromCookies('Login'); // Get the token dari cookies via parameter

    if (!token) {
        alert("token tidak ditemukan");
        return;
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/getallparkiran';

    // Set up headers with the token
    const myHeaders = new Headers();
    myHeaders.append('Login', token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === true) {
            displayUserData(data.data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to extract the token from cookies
function getTokenFromCookies(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
}

// Function to display user data in the table
function displayUserData(parkiranData) {
    const parkiranDataBody = document.getElementById('parkiranDataBody');

    if (parkiranData && parkiranData.length > 0) {
        parkiranData.forEach(parkiran => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${parkiran.parkiranid}</td>
                <td>${parkiran.nama}</td>
                <td>${parkiran.npm}</td>
                <td>${parkiran.prodi}</td>
                <td>${parkiran.namakendaraan}</td>
                <td>${parkiran.nomorkendaraan}</td>
                <td>${parkiran.jeniskendaraan}</td>
                <td>${parkiran.status ? 'Sedang Parkir' : 'Sedang Keluar'}</td>
            `;
            parkiranDataBody.appendChild(newRow);
        });
    } else {
        parkiranDataBody.innerHTML = '<tr><td colspan="3">No user data found.</td></tr>';
    }
}

getUserWithToken();