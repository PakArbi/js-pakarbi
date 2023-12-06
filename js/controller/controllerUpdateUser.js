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
        window.location.href = 'seeprofil.html'
    })
}

const searchnomorById = async (nomorId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateusernpm'

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

const populateUpdateForm = (userData) => {
    const setValue = (id, value) => {
        document.getElementById(id).value = value
    }

    setValue('useridinput', userData.usernameid)
    setValue('usernameinput', userData.username)
    setValue('npminput', userData.npm)
    setValue('katasandiinput', userData.password)
    setValue('konfirmasikatasandiinput', userData.passworhash)
    setValue('emailinput', userData.email)
    setValue('roleinput', userData.role)

    document.getElementById('updateForm').style.display = 'block'
}

const updateUser = async (event) => {
    event.preventDefault()

    const token = getTokenFromCookies('Login')

    if (!token) {
        showUpdateAlert('Anda Belum Login', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/updateusernpm'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
            usernameid: document.getElementById('useridinput').value,
            username: document.getElementById('usernameinput').value,
            npm: document.getElementById('npminput').value,
            password: document.getElementById('katasandiinput').value,
            passwordhash: document.getElementById('konfirmasikatasandiinput').value,
            email: document.getElementById('emailinput').value,
            role: document.getElementById('roleinput').value,
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (response.ok) {
            showUpdateAlert('Berhasil Update Data User', 'success')
            window.location.href = 'editprofil.html'
        } else {
            showUpdateAlert(data.message || 'Error updating data', 'error')
        }
    } catch (error) {
        console.error('Error:', error)
        showUpdateAlert('Error updating data', 'error')
    }
}

document.getElementById('updateForm').addEventListener('submit', updateCatalog)