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

const deleteParkiran = async (ParkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/deleteparkirannpm'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: ParkiranId
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (data.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'parkiran deleted successfully!',
            }).then(() => {
                getAllEmployees()
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            })
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

// Function to handle the delete confirmation
const deleteParkiranHandler = (ParkiranId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteParkiran(ParkiranId)
        }
    })
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
                <td>
                    <a href="#" class="delete-link" data-nomorid="${parkiran.parkiranid}">Delete</a>
                </td>
            `;
            parkiranDataBody.appendChild(newRow);
        });
    } else {
        parkiranDataBody.innerHTML = '<tr><td colspan="3">No user data found.</td></tr>';
    }
}

getUserWithToken();