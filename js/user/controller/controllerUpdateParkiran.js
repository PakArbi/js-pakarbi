const getTokenFromCookies = (cookieName) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

const showUpdateAlert = (message, icon = "success") => {
    Swal.fire({
        icon: icon,
        text: message,
        showConfirmButton: false,
        timer: 100000,
    }).then(() => {
        window.location.href = "seeprofilparkiran.html";
    });
};

const updateParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies("Login");

    if (!token) {
        showUpdateAlert("Anda Belum Login", "error");
        return;
    }

    const targetURL =
        "https://asia-southeast2-pakarbi.cloudfunctions.net/updatedataparkiran";

    const myHeaders = new Headers();
    myHeaders.append("Login", token);
    myHeaders.append("Content-Type", "application/json");

    const statusValue = document.getElementById("StatusInput").value === "active";

    const requestOptions = {
        method: "PUT",
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
        redirect: "follow",
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (response.ok) {
            showUpdateAlert("Berhasil Update Data", "success");
            window.location.href = "seeprofilparkiran.html";
        } else {
            showUpdateAlert(data.message || "Error updating data", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showUpdateAlert("Error updating data", "error");
    }
};

document.getElementById("updateparkiran").addEventListener("submit", updateParkiran);

// Fetch data from the API using a GET request
const apiUrl =
    "https://asia-southeast2-pakarbi.cloudfunctions.net/getonedataparkiran";
const params = new URLSearchParams(window.location.search);
const parkiranId = params.get('_id');

// Check if the parkiranId is available
if (parkiranId) {
    const fullApiUrl = `${apiUrl}?_id=${parkiranId}`;
    console.log("Full API URL:", fullApiUrl);

    fetch(fullApiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data);

            const parkiranData = data.data[0];

            document.getElementById("parkiranidinput").value = parkiranData.parkiranid;
            document.getElementById("namainput").value = parkiranData.nama;
            document.getElementById("npminput").value = parkiranData.npm;
            document.getElementById("prodiinput").value = parkiranData.prodi;
            document.getElementById("namakendaraaninput").value = parkiranData.namakendaraan;
            document.getElementById("nomorkendaraaninput").value = parkiranData.nomorkendaraan;
            document.getElementById("jeniskendaraaninput").value = parkiranData.jeniskendaraan;
            document.getElementById("jammasukinput").value = parkiranData.jammasuk;
            document.getElementById("jamkeluarinput").value = parkiranData.jamkeluar;
            document.getElementById("StatusInput").value = parkiranData.status;

            // Show the update form
            document.getElementById("updateparkiran").style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}