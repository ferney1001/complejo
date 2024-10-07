import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-database.js';

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

// Lista de alojamientos
const alojamientos = [
    // Habitaciones
    { id: 'h1', nombre: 'Habitación Deluxe 1', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+1', estrellas: '⭐⭐⭐⭐⭐', descripcion: '3 comidas diarias • WiFi incluido • 1 Televisor • Aire acondicionado', capacidad: 2, precio: 100 },
    { id: 'h2', nombre: 'Habitación Deluxe 2', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+2', estrellas: '⭐⭐⭐⭐', descripcion: '2 comidas diarias • WiFi incluido • 1 Televisor • Ventilador', capacidad: 2, precio: 90 },
    { id: 'h3', nombre: 'Habitación Familiar 1', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+3', estrellas: '⭐⭐⭐⭐', descripcion: '2 camas grandes • WiFi incluido • 1 Televisor', capacidad: 4, precio: 120 },
    { id: 'h4', nombre: 'Habitación Ejecutiva', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+4', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Cama king • Servicio de minibar • Aire acondicionado', capacidad: 2, precio: 150 },
    { id: 'h5', nombre: 'Habitación Económica', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+5', estrellas: '⭐⭐', descripcion: 'WiFi incluido • Ideal para viajes cortos', capacidad: 1, precio: 50 },
    { id: 'h6', nombre: 'Habitación Doble', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+6', estrellas: '⭐⭐⭐⭐', descripcion: '2 camas individuales • Ideal para amigos', capacidad: 2, precio: 80 },
    { id: 'h7', nombre: 'Habitación Matrimonial', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+7', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Cama matrimonial • Desayuno incluido', capacidad: 2, precio: 110 },
    { id: 'h8', nombre: 'Suite Real', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+8', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Jacuzzi privado • Vista al mar', capacidad: 2, precio: 200 },
    { id: 'h9', nombre: 'Habitación con Vista', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+9', estrellas: '⭐⭐⭐⭐', descripcion: 'Balcon con vista • Aire acondicionado', capacidad: 2, precio: 130 },
    { id: 'h10', nombre: 'Habitación Deluxe 3', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+10', estrellas: '⭐⭐⭐⭐⭐', descripcion: '3 camas • WiFi y desayuno incluido', capacidad: 5, precio: 180 },
    { id: 'h11', nombre: 'Habitación Superior', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+11', estrellas: '⭐⭐⭐⭐', descripcion: 'Espacio amplio • Cama matrimonial', capacidad: 2, precio: 140 },
    { id: 'h12', nombre: 'Habitación para Negocios', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+12', estrellas: '⭐⭐⭐⭐', descripcion: 'Escritorio • WiFi de alta velocidad', capacidad: 1, precio: 95 },
    { id: 'h13', nombre: 'Habitación con Balcón', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+13', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Vistas a la ciudad • Aire acondicionado', capacidad: 2, precio: 115 },
    { id: 'h14', nombre: 'Habitación Minimalista', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+14', estrellas: '⭐⭐⭐', descripcion: 'Diseño moderno • Muy iluminada', capacidad: 1, precio: 70 },
    { id: 'h15', nombre: 'Habitación Clásica', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+15', estrellas: '⭐⭐⭐⭐', descripcion: 'Decoración vintage • Cama doble', capacidad: 2, precio: 110 },
    { id: 'h16', nombre: 'Habitación Familiar 2', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+16', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Dos camas individuales y una matrimonial', capacidad: 4, precio: 160 },
    { id: 'h17', nombre: 'Habitación de Lujo', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+17', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Servicio de concierge • Amenities de lujo', capacidad: 2, precio: 250 },
    { id: 'h18', nombre: 'Habitación Económica 2', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+18', estrellas: '⭐⭐', descripcion: 'Ideal para viajeros con presupuesto', capacidad: 1, precio: 60 },
    { id: 'h19', nombre: 'Habitación Premium', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+19', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Cama king size • Vista al mar', capacidad: 2, precio: 220 },
    { id: 'h20', nombre: 'Habitación de Spa', tipo: 'habitacion', imagen: 'https://via.placeholder.com/400x200?text=Habitacion+20', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Acceso a spa y sauna • Desayuno incluido', capacidad: 2, precio: 210 },

    // Cabañas
    { id: 'c1', nombre: 'Cabaña Familiar 1', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+1', estrellas: '⭐⭐⭐⭐', descripcion: 'Cabaña para familias • Cocina equipada • Jardín', capacidad: 4, precio: 150 },
    { id: 'c2', nombre: 'Cabaña Económica 1', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+2', estrellas: '⭐⭐⭐', descripcion: 'Ideal para escapadas • Sin aire acondicionado', capacidad: 3, precio: 100 },
    { id: 'c3', nombre: 'Cabaña Deluxe 1', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+3', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'WiFi incluido • Piscina privada', capacidad: 6, precio: 250 },
    { id: 'c4', nombre: 'Cabaña de Madera', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+4', estrellas: '⭐⭐⭐⭐', descripcion: 'Hecha de madera • Ideal para parejas', capacidad: 2, precio: 120 },
    { id: 'c5', nombre: 'Cabaña con Terraza', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+5', estrellas: '⭐⭐⭐⭐', descripcion: 'Terraza privada • BBQ incluido', capacidad: 5, precio: 180 },
    { id: 'c6', nombre: 'Cabaña Aislada', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+6', estrellas: '⭐⭐⭐', descripcion: 'Ubicación remota • Ideal para desconectar', capacidad: 2, precio: 90 },
    { id: 'c7', nombre: 'Cabaña Familiar 2', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+7', estrellas: '⭐⭐⭐⭐', descripcion: '2 habitaciones • Cocina completa', capacidad: 4, precio: 160 },
    { id: 'c8', nombre: 'Cabaña con Jacuzzi', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+8', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Jacuzzi exterior • Vista espectacular', capacidad: 2, precio: 220 },
    { id: 'c9', nombre: 'Cabaña en el Bosque', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+9', estrellas: '⭐⭐⭐⭐', descripcion: 'Rodeada de árboles • Perfecta para la naturaleza', capacidad: 4, precio: 140 },
    { id: 'c10', nombre: 'Cabaña de Lujo', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+10', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Servicios premium • Ideal para relajarse', capacidad: 2, precio: 300 },
    { id: 'c11', nombre: 'Cabaña con Vista al Lago', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+11', estrellas: '⭐⭐⭐⭐', descripcion: 'Cerca del lago • Paseos en bote incluidos', capacidad: 6, precio: 260 },
    { id: 'c12', nombre: 'Cabaña en la Playa', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+12', estrellas: '⭐⭐⭐⭐', descripcion: 'Directo a la playa • Ideal para vacaciones', capacidad: 4, precio: 220 },
    { id: 'c13', nombre: 'Cabaña Rústica', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+13', estrellas: '⭐⭐⭐', descripcion: 'Estilo rústico • Ideal para escapadas', capacidad: 3, precio: 130 },
    { id: 'c14', nombre: 'Cabaña del Bosque', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+14', estrellas: '⭐⭐⭐⭐', descripcion: 'Cerca de senderos • Ideal para senderismo', capacidad: 5, precio: 170 },
    { id: 'c15', nombre: 'Cabaña de Verano', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+15', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Ideal para el verano • Barbacoa incluida', capacidad: 4, precio: 190 },
    { id: 'c16', nombre: 'Cabaña en el Mar', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+16', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Vista al mar • Acceso directo a la playa', capacidad: 2, precio: 230 },
    { id: 'c17', nombre: 'Cabaña con Piscina', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+17', estrellas: '⭐⭐⭐⭐', descripcion: 'Piscina privada • Ideal para familias', capacidad: 5, precio: 240 },
    { id: 'c18', nombre: 'Cabaña en la Montaña', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+18', estrellas: '⭐⭐⭐⭐', descripcion: 'Rodeada de montañas • Perfecta para desconectar', capacidad: 6, precio: 200 },
    { id: 'c19', nombre: 'Cabaña en el Lago', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+19', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Cerca del lago • Paseos en bote incluidos', capacidad: 6, precio: 260 },
    { id: 'c20', nombre: 'Cabaña de Lujo', tipo: 'cabana', imagen: 'https://via.placeholder.com/400x200?text=Cabana+20', estrellas: '⭐⭐⭐⭐⭐', descripcion: 'Servicios premium • Masajes incluidos', capacidad: 2, precio: 300 },
];

// Lista para guardar las reservas de Firebase
const reservas = [];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('alojamientos-container');
    const buscarBtn = document.getElementById('buscar-btn');

    buscarBtn.addEventListener('click', () => {
        const fechaLlegada = new Date(document.getElementById('fecha-llegada').value);
        const fechaSalida = new Date(document.getElementById('fecha-salida').value);
        const tipoAlojamiento = document.getElementById('tipo-alojamiento').value;

        // Limpiar el contenedor
        container.innerHTML = '';

        // Obtener reservas de Firebase
        const reservasRef = ref(db, '/reservas');
        onValue(reservasRef, snapshot => {
            reservas.length = 0; // Limpiar el array de reservas

            snapshot.forEach(childSnapshot => {
                const reserva = childSnapshot.val();
                reservas.push(reserva);
            });

            // Filtrar alojamientos
            alojamientos.forEach(alojamiento => {
                // Filtrar por tipo de alojamiento
                if (tipoAlojamiento && alojamiento.tipo !== tipoAlojamiento) return;

                let disponible = true;

                reservas.forEach(reserva => {
                    if (reserva.idhabitacion === alojamiento.id && 
                        ((fechaLlegada < new Date(reserva['fecha-salida']) && fechaSalida > new Date(reserva['fecha-llegada'])))) {
                        disponible = false; // Hay una reserva que interfiere
                    }
                });

                // Mostrar alojamientos disponibles o no disponibles
                const card = document.createElement('div');
                card.className = 'hotel-card';
                card.innerHTML = `
                    <img src="${alojamiento.imagen}" alt="${alojamiento.nombre}">
                    <h2>${alojamiento.nombre} (${alojamiento.tipo})</h2>
                    <p>${alojamiento.descripcion}</p>
                    <p>Capacidad: ${alojamiento.capacidad} personas</p>
                    <p>Precio: $${alojamiento.precio}</p>
                    <p class="${disponible ? 'available' : 'unavailable'}">${disponible ? "Disponible" : "No Disponible"}</p>
                    <button class="select-btn" data-id="${alojamiento.id}" ${disponible ? '' : 'disabled'}>Seleccionar</button>
                `;
                container.appendChild(card);

            // Agregar el evento al botón de seleccionar
            card.querySelector('.select-btn').addEventListener('click', () => {
                window.location.href = `reserva.html?id=${alojamiento.id}&precio=${alojamiento.precio}`;
            });

            });
        });
    });
});
