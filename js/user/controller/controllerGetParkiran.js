// const getTokenFromCookies = (cookieName) => {
//     const cookies = document.cookie.split(';')
//     for (const cookie of cookies) {
//         const [name, value] = cookie.trim().split('=')
//         if (name === cookieName) {
//             return value
//         }
//     }
//     return null
// }

// const getAllParkiran = async () => {
//     const token = getTokenFromCookies('Login')

//     if (!token) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Authentication Error',
//             text: 'You are not logged in.',
//         }).then(() => {
//             window.location.href = 'login.html'
//         })
//         return
//     }

//     const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran'

//     const myHeaders = new Headers()
//     myHeaders.append('Login', token)

//     const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow',
//     }

//     try {
//         const response = await fetch(targetURL, requestOptions)
//         const data = await response.json()

//         if (data.status === true) {
//             displayParkiranData(data.data, 'parkiranDataBody')
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

// //Get Data by Id
// const getParkiranById = async (ParkiranId) => {
//     const token = getTokenFromCookies('Login')

//     if (!token) {
//         showAlert('Header Login Not Found', 'error')
//         return
//     }

//     const targetURL = `https://asia-southeast2-project3-403614.cloudfunctions.net/getOneDataParkiran?npm=${npm}`

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



// const deleteParkiran = async (ParkiranId) => {
//     const token = getTokenFromCookies('Login')

//     if (!token) {
//         showAlert('Header Login Not Found', 'error')
//         return
//     }

//     const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/deleteParkiran'

//     const myHeaders = new Headers()
//     myHeaders.append('Login', token)
//     myHeaders.append('Content-Type', 'application/json')

//     const requestOptions = {
//         method: 'DELETE',
//         headers: myHeaders,
//         body: JSON.stringify({
//             parkiranid: ParkiranId
//         }),
//         redirect: 'follow',
//     }

//     try {
//         const response = await fetch(targetURL, requestOptions)
//         const data = await response.json()

//         if (data.status === 200) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success',
//                 text: 'parkiran deleted successfully!',
//             }).then(() => {
//                 getAllEmployees()
//             })
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

// // Function to handle the delete confirmation
// const deleteParkiranHandler = (ParkiranId) => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//         if (result.isConfirmed) {
//             deleteParkiran(ParkiranId)
//         }
//     })
// }

// // Event listener to handle clicks on the table
// document.getElementById('parkiranDataBody').addEventListener('click', (event) => {
//     const target = event.target;
//     if (target.classList.contains('delete-link')) {
//         const ParkiranId = target.getAttribute('data-parkiranid');
//         deleteParkiranHandler(ParkiranId);
//     }
// });


// const displayParkiranData = (parkiranData, tableBodyId) => {
//     const parkirdatabody = document.getElementById(tableBodyId)

//     parkirdatabody.innerHTML = ''

//     if (parkiranData && parkiranData.length > 0) {
//         parkiranData.forEach((item) => {
//             const newRow = document.createElement('tr')
//             newRow.innerHTML = `
//             <td>${parkiran.parkiranid}</td>
//             <td>${parkiran.nama}</td>
//             <td>${parkiran.npm}</td>
//             <td>${parkiran.prodi}</td>
//             <td>${parkiran.namakendaraan}</td>
//             <td>${parkiran.nomorkendaraan}</td>
//             <td>${parkiran.jeniskendaraan}</td>
//             <td>${parkiran.status ? 'Sudah Parkir' : 'Sudah Keluar'}</td>
//             <td>
//                 <img src="data:image/png;base64, ${parkiran.base64image}" alt="QR Code" />
//             </td>
//             <td>
//             <a href="#" class="delete-link" data-nomorid="${parkiran.parkiranid}">Delete</a>
//             </td>
//         `;

//             parkirdatabody.appendChild(newRow);
//         });
//     } else {
//         parkirdatabody.innerHTML = `<tr><td colspan="6">No parkiran data found.</td></tr>`;
//     }
// }

// // Initial fetch of all parkiran
// getAllParkiran()


const getTokenFromCookies = (cookieName) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

const getAllParkiran = async () => {
    const token = getTokenFromCookies('Login');

    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Authentication Error',
            text: 'You are not logged in.',
        }).then(() => {
            window.location.href = 'login.html';
        });
        return;
    }

    const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/getDataParkiran';

    const myHeaders = new Headers();
    myHeaders.append('Login', token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === true) {
            displayParkiranData(data.data, 'parkiranDataBody');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to generate QR code with logo
const generateQRCodeWithLogo = (text, logoPath) => {
    try {
        const logoBase64 = getBase64FromImage(logoPath);
        // Use the logoBase64 in your QR code generation logic
        // Example: generateQRCode(text, logoBase64);
        console.log('Logo Base64:', logoBase64);
    } catch (error) {
        console.error('Error generating QR code:', error.message);
    }
};

// Function to convert image to base64
const getBase64FromImage = (imagePath) => {
    const img = new Image();
    img.src = imagePath;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
};

// Event listener to handle clicks on the table
document.getElementById('parkiranDataBody').addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('generateQR-link')) {
        const parkiranId = target.getAttribute('data-parkiranid');
        generateQRCodeWithLogo(parkiranId, 'asset/img/logo_ulbi.png');
    }
});

// Updated display function to include a "Generate QR" link
const displayParkiranData = (parkiranData, tableBodyId) => {
    const parkirdatabody = document.getElementById(tableBodyId);

    parkirdatabody.innerHTML = '';

    if (parkiranData && parkiranData.length > 0) {
        parkiranData.forEach((parkiran) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${parkiran.parkiranid}</td>
                <td>${parkiran.nama}</td>
                <td>${parkiran.npm}</td>
                <td>${parkiran.prodi}</td>
                <td>${parkiran.namakendaraan}</td>
                <td>${parkiran.nomorkendaraan}</td>
                <td>${parkiran.jeniskendaraan}</td>
                <td>${parkiran.status ? 'Sudah Parkir' : 'Sudah Keluar'}</td>
                <td>
                    <img src="data:image/png;base64, ${parkiran.base64image}" alt="QR Code" />
                </td>
                <td>
                    <a href="#" class="generateQR-link" data-parkiranid="${parkiran.parkiranid}">Generate QR</a>
                </td>
            `;

            parkirdatabody.appendChild(newRow);
        });
    } else {
        parkirdatabody.innerHTML = `<tr><td colspan="6">No parkiran data found.</td></tr>`;
    }
};

// Initial fetch of all parkiran
getAllParkiran();
