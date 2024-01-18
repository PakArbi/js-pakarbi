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

const showAlert = (message, type = 'success') => {
    Swal.fire({
        icon: type,
        text: message,
        showConfirmButton: false,
        timer: 1500,
    });
};

const insertParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies('Login');

    if (!token) {
        showAlert('Header Login Not Found', 'error');
        return;
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/insertparkirannpm';

    const myHeaders = new Headers();
    myHeaders.append('Login', token);
    myHeaders.append('Content-Type', 'application/json');

    const parkiranData = {
        parkiranid: document.getElementById('newparkiranid').value,
        nama: document.getElementById('newnama').value,
        npm: document.getElementById('newnmp').value,
        prodi: document.getElementById('newprodi').value,
        namakendaraan: document.getElementById('newnamakendaraan').value,
        nomorkendaraan: document.getElementById('newnomorkendaraan').value,
        jeniskendaraan: document.getElementById('newjeniskendaraan').value,
        status: document.getElementById('newStatus').value === 'active' ? true : false,
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(parkiranData),
        redirect: 'follow',
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === false) {
            showAlert(data.message, 'error');
        } else {
            showAlert('Catalog data parkiran successfully!', 'success');
            generateQRCode(parkiranData); // Call the function to generate QR code
            window.location.href = 'inputprofilparkiran.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to generate QR code based on data
const generateQRCode = (parkiranData) => {
    const qrCodeData = JSON.stringify(parkiranData);
    // Use a QR code generation library, for example, qr-code-styling
    // Replace the following line with the actual library and method
    const qrCodeImage = generateQRCodeImage(qrCodeData);

    // Display or save the generated QR code image as needed
    // For example, update an image tag with the generated image data
    document.getElementById('qrCodeImage').src = qrCodeImage;
};

document.getElementById('formparkiran').addEventListener('submit', insertParkiran);