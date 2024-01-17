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
    event.preventDefault()

    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-project3-403614.cloudfunctions.net/insertDataParkiran'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('newparkiranid').value,
            nama: document.getElementById('newnama').value,
            npm: document.getElementById('newnama').value,
            prodi: document.getElementById('newprodi').value,
            namakendaraan: document.getElementById('newnamakendaraan').value,
            nomorkendaraan: document.getElementById('newnomorkendaraan').value,
            jeniskendaraan: document.getElementById('newjeniskendaraan').value,
            status: document.getElementById('newStatus').value === 'active' ? true : false,
        }),
        redirect: 'follow',
    }

    // Fungsi untuk meng-generate QR code setelah input data berhasil
    const generateQRCode = async () => {
  
    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === false) {
            showAlert(data.message, 'error');
        } else {
            showAlert('Catalog data parkiran successfully!', 'success');
            // Setelah input data berhasil, panggil fungsi untuk menghasilkan QR code dan menampilkannya
            generateAndShowQRCode(data.qrCodeBase64);
            window.location.href = 'inputprofilparkiran.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
    }
}
    

    document.getElementById('formparkiran').addEventListener('submit', insertParkiran)

   // Fungsi untuk menghasilkan dan menampilkan QR code dalam bentuk gambar base64
   const generateAndShowQRCode = (qrCodeBase64) => {
    const qrCodeImage = document.createElement('img');
    qrCodeImage.src = `data:image/png;base64, ${qrCodeBase64}`;
    qrCodeImage.alt = 'QR Code';

    // Menampilkan QR code di suatu elemen HTML (misalnya, dengan ID 'qrcode-container')
    const qrcodeContainer = document.getElementById('qrcode-container');
    qrcodeContainer.innerHTML = '';
    qrcodeContainer.appendChild(qrCodeImage);
}

document.getElementById('formparkiran').addEventListener('submit', insertParkiran)

  // try {
    //     const response = await fetch(targetURL, requestOptions)
    //     const data = await response.json()

    //     if (data.status === false) {
    //         showAlert(data.message, 'error')
    //     } else {
    //         showAlert('Catalog data parkiran successfully!', 'success')
    //         window.location.href = 'inputprofilparkiran.html'
    //     }
    // } catch (error) {
    //     console.error('Error:', error)
    // }