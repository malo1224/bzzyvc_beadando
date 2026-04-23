// Adatok betöltése a 'gp' nevű adatbázisból (localStorage)
const baseUrl = "http://localhost/api.php?table=gp";
let data;

const req = new XMLHttpRequest();
req.open("GET", baseUrl, false);
req.send();
data = JSON.parse(req.responseText) || [];
if (!data) {
    console.error("Hiba történt az adatok betöltése során.");
}

function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    let domContent = "";
    data.forEach(item => {
        domContent += `
            <tr>
                <td>${item.datum}</td>
                <td>${item.nev}</td>
                <td>${item.helyszin}</td>
                <td>
                    <button class="btn-edit" onclick="editRow(${item.id})">Szerkesztés</button>
                    <button class="btn-delete" onclick="deleteRow(${item.id})">Törlés</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = domContent;
}

function create() {
    const datum = document.getElementById("datum").value;
    const nev = document.getElementById("nev").value;
    const helyszin = document.getElementById("helyszin").value;

    if (!datum || !nev) {
        alert("A dátum és a név kötelező!");
        return;
    }

    const newItem = {
        id: Date.now(),
        datum: datum,
        nev: nev,
        helyszin: helyszin
    };

    data.push(newItem);
    renderTable();
    resetForm();
}

function update() {
    const id = parseInt(document.getElementById("editId").value);
    const datum = document.getElementById("editDatum").value;
    const nev = document.getElementById("editNev").value;
    const helyszin = document.getElementById("editHelyszin").value;

    data = data.map(item => {
        if (item.id === id) {
            return { id, datum, nev, helyszin };
        }
        return item;
    });

    renderTable();
    resetForm('edit');
}

function deleteRow(id) {
    if (confirm("Biztosan törlöd?")) {
        data = data.filter(item => item.id !== id);
        renderTable();
    }
}

function editRow(id) {
    const item = data.find(i => i.id === id);
    document.getElementById("editId").value = item.id;
    document.getElementById("editDatum").value = item.datum;
    document.getElementById("editNev").value = item.nev;
    document.getElementById("editHelyszin").value = item.helyszin;
}

function resetForm(type = '') {
    if (type === 'edit') {
        document.getElementById("editId").value = "";
        document.getElementById("editDatum").value = "";
        document.getElementById("editNev").value = "";
        document.getElementById("editHelyszin").value = "";
    } else {
        document.getElementById("datum").value = "";
        document.getElementById("nev").value = "";
        document.getElementById("helyszin").value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});