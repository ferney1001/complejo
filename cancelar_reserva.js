import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqticQBJ47NleC1abDIu1Eah8u5g6sAD8",
    authDomain: "hotel-bcea0.firebaseapp.com",
    projectId: "hotel-bcea0",
    storageBucket: "hotel-bcea0.appspot.com",
    messagingSenderId: "656395930658",
    appId: "1:656395930658:web:69dea027697434a26bce7b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('buscar-btn').addEventListener('click', async () => {
    const cedula = document.getElementById('cedula').value;
    const reservasRef = ref(db, 'reservas');

    const reservasSnapshot = await get(reservasRef);
    let found = false;

    if (reservasSnapshot.exists()) {
        reservasSnapshot.forEach((childSnapshot) => {
            const reserva = childSnapshot.val();
            if (reserva.cedula === cedula) {
                found = true;
                const reservaId = childSnapshot.key; // Obtener la clave de la reserva
                document.getElementById('reserva-details').innerText = `
                    Nombre: ${reserva.nombre}
                    Cédula: ${reserva.cedula}
                    Fecha de llegada: ${reserva['fecha-llegada']}
                    Fecha de salida: ${reserva['fecha-salida']}
                `;
                document.getElementById('eliminar-btn').onclick = () => confirmAndDelete(reservaId); // Configura la función de eliminación
                document.getElementById('reserva-info').style.display = 'block';
            }
        });

        if (!found) {
            document.getElementById('mensaje').innerText = 'No se encontró ninguna reserva con esa cédula.';
        }
    } else {
        document.getElementById('mensaje').innerText = 'No hay reservas registradas.';
    }
});

// Función para confirmar y eliminar la reserva
async function confirmAndDelete(reservaId) {
    if (confirm("¿Está seguro de que desea eliminar esta reserva?")) {
        await remove(ref(db, 'reservas/' + reservaId));
        document.getElementById('mensaje').innerText = 'Reserva eliminada exitosamente.';
        document.getElementById('reserva-info').style.display = 'none';
    }
}

document.getElementById('cancelar-btn').addEventListener('click', () => {
    document.getElementById('reserva-info').style.display = 'none';
    document.getElementById('mensaje').innerText = ''; // Limpia el mensaje al cancelar
});
