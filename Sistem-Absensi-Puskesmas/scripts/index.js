const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');

// show account
const setupAccountDetails = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            //show name on navbar
            const htmlNav = `Selamat Datang, <span class="text-success">${doc.data().nama}</span>`;
            //show account details
            const htmlDetails = `
                <hr>
                <div class="text-center pb-3" id="foto-user">
                    <img class="img-thumbnail rounded-circle" src="img/selfie.png" alt="Foto User" loading="lazy"
                        width="250" height="250">
                </div>
                <h2 class="text-center">${doc.data().nama}</h2>
                <h4 class="text-center">${user.email}</h4>
                <h5 class="text-center">${doc.data().nip}</h5>
                <p class="text-center">Level: ${doc.data().level}</p>
                <hr>
                <div class="text-center mb-3">
                    <button type="button" class="btn btn-success mx-auto">Edit</button>
                </div>`;
            if (nameNavbar) {
                nameNavbar.innerHTML = htmlNav;
            }
            if (accountDetails) {
                accountDetails.innerHTML = htmlDetails;
            }
        });
    } else {
        if (nameNavbar) {
            nameNavbar.innerHTML = '';
        }
        if (accountDetails) {
            accountDetails.innerHTML = '';
        }
    }
}

// show all account
const allAccountDetails = () => {
    db.collection('users').get().then(docs => {
        let html = '';
        let row = 1;
        docs.forEach(account => {
            // console.log(account.id, " => ", account.data());
            const userData = account.data();
            const tr = `
                    <tr>
                        <th scope="row">${row}</th>
                        <td>${userData.nama}</td>
                        <td>${userData.nip}</td>
                        <td>${userData.email}</td>
                        <td>${userData.password}</td>
                        <td>${userData.level}</td>
                        <td>Edit | Delete</td>
                    </tr>
                    `;
            html += tr;
            row++;
        });
        if (allAccounts) {
            allAccounts.innerHTML = html;
        } else {
            if (allAccounts) {
                allAccounts.innerHTML = '';
            }
        }
    });
};

// setup presensi
// if (presensiList) {
const setupPresensi = (data) => {
    let html = '';
    // let row = 1;
    data.forEach(doc => {
        const presensi = doc.data();
        const td = `<tr>
        <td>${presensi.tanggal}</td>
        <td>${presensi.waktu}</td>
        <td>${presensi.foto}</td>
        </tr>`;
        html += td;
        // row++;
    });
    if (presensiList) {
        presensiList.innerHTML = html;
    }
}
// }

// add admin role