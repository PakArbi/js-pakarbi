const getTokenFromCookies = (cookieName) => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === cookieName) {
            return value
        }
    }
    return null
}

const getAllParkiran = async () => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Authentication Error',
            text: 'You are not logged in.',
        }).then(() => {
            window.location.href = 'login.html'
        })
        return
    }

    const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (data.status === true) {
            displayParkiranData(data.data, 'parkiranDataBody')
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

const getParkiranById = async (ParkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = `https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran/${ParkiranId}`

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === 200) {
            // Do something with the retrieved parkiran data
            console.log('Parkiran Details:', data.parkiran);

            // Return parkiran data including QR code
            return data.parkiran;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

//Get Data by Id
// const getParkiranById = async (ParkiranId) => {
//     const token = getTokenFromCookies('Login')

//     if (!token) {
//         showAlert('Header Login Not Found', 'error')
//         return
//     }

//     const targetURL = `https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran/${ParkiranId}`

//     const myHeaders = new Headers()
//     myHeaders.append('Login', token)
//     myHeaders.append('Content-Type', 'application/json')

//     const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow',
//     }

//     try {
//         const response = await fetch(targetURL, requestOptions)
//         const data = await response.json()

//         if (data.status === 200) {
//             // Do something with the retrieved parkiran data
//             console.log('Parkiran Details:', data.parkiran)
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: data.message,
//             })
//         }
//     } catch (error) {
//         console.error('Error:', error)
//     }
// }



const deleteParkiran = async (ParkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/delete'

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

// Function to handle the detail view
const detailParkiranHandler = (ParkiranId) => {
    getParkiranById(ParkiranId);
};

// Event listener to handle clicks on the table
document.getElementById('parkiranDataBody').addEventListener('click', (event) => {
    const target = event.target;
    const ParkiranId = target.getAttribute('data-parkiranid');

    if (target.classList.contains('detail-link')) {
        detailParkiranHandler(ParkiranId);
    }
});

// Function to display QR code in a modal
const displayQRCode = (qrCodeBase64) => {
    // Assuming modalContainer is the ID of the modal container element
    const modalContainer = document.getElementById('modalContainer');

    // Set the content of the modal
    modalContainer.innerHTML = `
        <div class="modal fade" id="qrCodeModal" tabindex="-1" aria-labelledby="qrCodeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="qrCodeModalLabel">QR Code</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="data:image/png;base64, ${qrCodeBase64}" alt="QR Code" />
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show the modal
    const qrCodeModal = new bootstrap.Modal(document.getElementById('qrCodeModal'));
    qrCodeModal.show();
};

// Event listener to handle clicks on the table
document.getElementById('parkiranDataBody').addEventListener('click', async (event) => {
    const target = event.target;
    const ParkiranId = target.getAttribute('data-parkiranid');

    if (target.classList.contains('detail-link')) {
        const parkiranData = await getParkiranById(ParkiranId);
        displayQRCode(parkiranData.qrCodeBase64);
    }
});


const displayParkiranData = (parkiranData, tableBodyId) => {
    const parkirdatabody = document.getElementById(tableBodyId)

    parkirdatabody.innerHTML = ''

    if (parkiranData && parkiranData.length > 0) {
        parkiranData.forEach((item) => {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
            <td>${item.parkiranid}</td>
            <td>${item.nama}</td>
            <td>${item.npm}</td>
            <td>${item.prodi}</td>
            <td>${item.namakendaraan}</td>
            <td>${item.nomorkendaraan}</td>
            <td>${item.jeniskendaraan}</td>
            <td>${item.status ? 'Sedang Parkir' : 'Sedang Keluar'}</td>
            <td>
            <a href="#" class="detail-link" data-parkiranid="${item.parkiranid}">Detail</a>
            </td>
        `

            parkirdatabody.appendChild(newRow)
        })
    } else {
        parkirdatabody.innerHTML = `<tr><td colspan="6">No parkiran data found.</td></tr>`
    }
}

// Initial fetch of all parkiran
getAllParkiran()