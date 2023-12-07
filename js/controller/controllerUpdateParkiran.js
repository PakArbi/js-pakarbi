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
        window.location.href = 'editprofilparkiran.html'
    })
}

const searchnomorById = async (nomorId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateparkirannpm'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            usernameid: usernameid
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

    setValue('parkiranidinput', parkiranData.usernameid)
    setValue('namainput', parkiranData.username)
    setValue('npminput', parkiranData.npm)
    setValue('prodiinput', parkiranData.password)
    setValue('namakendaraaninput', parkiranData.passworhash)
    setValue('nomorkendaraaninput', parkiranData.email)
    setValue('jeniskendaraaninput', parkiranData.role)
    setValue('StatusInput', parkiranData.status)

    document.getElementById('updateparkiran').style.display = 'block'
}

const updateParkiran = async (event) => {
    event.preventDefault()

    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateparkirannpm'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('newparkiranid').value,
            nama: document.getElementById('newnama').value,
            npm: document.getElementById('newnama').value,
            prodi: document.getElementById('newprodi').value,
            namakendaraan: document.getElementById('newnamakendaraan').value,
            nomorkendaraan: document.getElementById('newnomorkendaraan').value,
            jeniskendaraan: document.getElementById('newjeniskendaraan').value,
            status: statusValue,
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (response.ok) {
            showUpdateAlert('Berhasil Update Data User', 'success')
            window.location.href = 'editprofilparkiran.html'
        } else {
            showUpdateAlert(data.message || 'Error updating data', 'error')
        }
    } catch (error) {
        console.error('Error:', error)
        showUpdateAlert('Error updating data', 'error')
    }
}

document.getElementById('updateparkiran').addEventListener('submit', updateParkiran)