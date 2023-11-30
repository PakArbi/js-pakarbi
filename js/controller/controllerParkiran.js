// Include your getTokenFromCookies function here

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

// Your other functions remain the same

const insertParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies('token');

    if (!token) {
        alert("Header Login Not Found");
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
            parkiranid: document.getElementById('parkiranid').value,
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
        const data = await response.json();

        if (data.status === false) {
            alert(data.message);
        } else {
            alert("Parkiran data inserted successfully!");
            // Optionally, you can reset the form or perform other actions.
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Attach the insertEmployee function to the form's submit event
document.getElementById('formparkiran').addEventListener('submit', insertParkiran);