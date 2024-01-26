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

const showUpdateAlert = (message, icon = 'success') => {
    Swal.fire({
        icon: icon,
        text: message,
        showConfirmButton: false,
        timer: 100000,
    }).then(() => {
        window.location.href = 'seeprofilparkiran.html'
    })
}

const searchnomorById = async (ParkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateparkiranemail'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: ParkiranId
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (response.ok) {
            populateUpdateForm(data.data)
        } else {
            showUpdateAlert(data.message || 'Error fetching data', 'error')
        }
    } catch (error) {
        console.error('Error:', error)
        showUpdateAlert('Error fetching data', 'error')
    }
}

const populateUpdateForm = (parkiranData) => {
    const setValue = (id, value) => {
        document.getElementById(id).value = value
    }

    setValue('parkiranidinput', parkiranData.parkiranid)
    setValue('namainput', parkiranData.nama)
    setValue('npminput', parkiranData.npm)
    setValue('prodiinput', parkiranData.prodi)
    setValue('namakendaraaninput', parkiranData.namakendaraan)
    setValue('nomorkendaraaninput', parkiranData.nomorkendaraan)
    setValue('jeniskendaraaninput', parkiranData.jeniskendaraan)
    setValue('jammasukinput', parkiranData.jammasuk)
    setValue('jamkeluarinput', parkiranData.jamkeluar)
    setValue('Statusinput', parkiranData.status)

    document.getElementById('updateparkiran').style.display = 'block'
}

const updateParkiran = async (event) => {
    event.preventDefault()

    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateparkiranemail'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const statusValue = document.getElementById('Statusinput').value === 'active'

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('parkiranidinput').value,
            nama: document.getElementById('namainput').value,
            npm: document.getElementById('npminput').value,
            prodi: document.getElementById('prodiinput').value,
            namakendaraan: document.getElementById('namakendaraaninput').value,
            nomorkendaraan: document.getElementById('nomorkendaraaninput').value,
            jeniskendaraan: document.getElementById('jeniskendaraaninput').value,
            jammasuk: document.getElementById('jammasukinput').value,
            jamkeluar: document.getElementById('jamkeluarinput').value,
            status: statusValue,
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (response.ok) {
            showUpdateAlert('Berhasil Update Data', 'success')
            window.location.href = 'seeprofilparkiran.html'
        } else {
            showUpdateAlert(data.message || 'Error updating data', 'error')
        }
    } catch (error) {
        console.error('Error:', error)
        showUpdateAlert('Error updating data', 'error')
    }
}

const parkiranIdFromURL = new URLSearchParams(window.location.search).get('parkiranid');
if (parkiranIdFromURL) {
    document.getElementById('parkiranIdInput').value = parkiranIdFromURL;
    searchEmployeeById(employeeIdFromURL);
}

document.getElementById('updateparkiran').addEventListener('submit', updateParkiran)