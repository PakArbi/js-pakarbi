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

const showAlert = (message, type = 'success') => {
    Swal.fire({
        icon: type,
        text: message,
        showConfirmButton: false,
        timer: 1500,
    })
}

const insertParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies('Login');

    if (!token) {
        showAlert('Header Login Not Found', 'error');
        return;
    }

    const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/insertDataParkiran';

    const myHeaders = new Headers();
    myHeaders.append('Login', token);
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('newparkiranid').value,
            nama: document.getElementById('newnama').value,
            npm: document.getElementById('newnpm').value,
            prodi: document.getElementById('newprodi').value,
            namakendaraan: document.getElementById('newnamakendaraan').value,
            nomorkendaraan: document.getElementById('newnomorkendaraan').value,
            jeniskendaraan: document.getElementById('newjeniskendaraan').value,
            status: document.getElementById('newStatus').value === 'active' ? true : false,
        }),
        redirect: 'follow',
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === false) {
            showAlert(data.message, 'error');
        } else {
            showAlert('Catalog data parkiran successfully!', 'success');
            // Fetch and display QR code after successful insertion
            displayQRCode(data.parkiranid);
            window.location.href = 'inputprofilparkiran.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


// Function to fetch and display QR code on the dashboard
const displayQRCode = async (parkiranid) => {
    const qrCodeImage = await fetchQRCodeFromServer(parkiranid);

    if (qrCodeImage) {
        // Assuming qrCodeContainer is an element to display the QR code
        const qrCodeContainer = document.getElementById('qrCodeImage');
        qrCodeContainer.innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
    } else {
        console.error('Failed to fetch QR code from the server.');
    }
};

// Function to fetch QR code with logo from the server
const fetchQRCodeFromServer = async (parkiranid) => {
    const logoPath = 'qrcode/logo_ulbi.png'; // Path to ULBI logo
    const serverURL = `https://asia-southeast2-project3-403614.cloudfunctions.net/insertDataParkiran?parkiranid=${parkiranid}&logoPath=${logoPath}`;

    try {
        const response = await fetch(serverURL);
        const qrCodeData = await response.json();

        if (qrCodeData.status === true) {
            return qrCodeData.qrCodeBase64;
        } else {
            console.error('Server returned an error:', qrCodeData.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching QR code:', error);
        return null;
    }
};
document.getElementById('formparkiran').addEventListener('submit', insertParkiran);

document.getElementById('generateQRButton').addEventListener('click', () => {
    const parkiranid = document.getElementById('newparkiranid').value;
    displayQRCode(parkiranid);
});

