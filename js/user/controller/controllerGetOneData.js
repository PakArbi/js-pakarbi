const getParkiranById = async (ParkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = `https://asia-southeast2-project3-403614.cloudfunctions.net/getOneDataParkiran?parkiranid=${ParkiranId}`

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (data.status === 200) {
            // Do something with the retrieved parkiran data
            console.log('Parkiran Details:', data.parkiran)
            displayParkiranDetails(data.parkiran);
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

const displayParkiranDetails = (parkiran) => {
    const npmNamaElement = document.getElementById('npmNama'); // Update with the actual element ID
    npmNamaElement.textContent = `${parkiran.npm} - ${parkiran.nama}`;
    // Add additional code to update other elements with specific details from 'parkiran' object
}

document.getElementById('parkiranDataBody').addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('details-link')) {
        const ParkiranId = target.getAttribute('data-parkiranid');
        getParkiranById(ParkiranId);
    }
});
