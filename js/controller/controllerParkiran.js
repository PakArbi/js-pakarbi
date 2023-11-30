const insertParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies('token');

    if (!token) {
        alert("Header Login Not Found");
        return;
    }

    const parkiranidValue = document.getElementById('parkiranid').value;

    // Ubah parkiranidValue menjadi angka (number)
    const parkiranid = Number(parkiranidValue);

    if (!Number.isInteger(parkiranid)) {
        alert("Parkiran ID must be a valid integer");
        return;
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/insertParkiran';

    const myHeaders = new Headers();
    myHeaders.append('token', token);
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: parkiranid, // Menggunakan variabel yang sudah diubah
            nama: document.getElementById('nama').value,
            npm: document.getElementById('npm').value,
            jurusan: document.getElementById('jurusan').value,
            namakendaraan: document.getElementById('namakendaraan').value,
            nomorkendaraan: document.getElementById('nomorkendaraan').value,
            jeniskendaraan: document.getElementById('jeniskendaraan').value,
        }),
        redirect: 'follow',
    };

    try {
        const response = await fetch(targetURL, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();

            if (data.status === false) {
                alert(data.message);
            } else {
                alert("Parkiran data inserted successfully!");
                // Optionally, you can reset the form or perform other actions.
            }
        } else {
            throw new Error('Response is not in JSON format');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};