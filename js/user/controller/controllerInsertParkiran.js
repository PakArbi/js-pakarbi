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

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/insertdataparkiran';

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
            jammasuk: document.getElementById('newjammasuk').value,
            jamkeluar: document.getElementById('newjamkeluar').value,
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

document.getElementById('formparkiran').addEventListener('submit', insertParkiran);

document.getElementById('generateQRButton').addEventListener('click', () => {
    const parkiranid = document.getElementById('newparkiranid').value;
    displayQRCode(parkiranid);
});