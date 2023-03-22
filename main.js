// Obtener elementos del DOM
const medidorForm = document.getElementById('medidor-form');
const medidorTableBody = document.querySelector('#medidores-table tbody');
const buscarMedidorInput = document.getElementById('buscar-medidor-input');
const buscarBtn = document.getElementById('buscar-btn');

// Arreglo de medidores
let medidores = [];

// Agregar evento "submit" al formulario para agregar medidores
medidorForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevenir el comportamiento por defecto del formulario
    // Obtener valores del formulario
    const medidorInput = document.getElementById('medidor-input');
    const coordenadasInput = document.getElementById('coordenadas-input');
    const medidor = medidorInput.value.trim();
    const coordenadas = coordenadasInput.value.trim();
    // Validar que el medidor no esté duplicado
    if (medidores.some((m) => m.medidor === medidor)) {
        alert(`El medidor ${medidor} ya ha sido agregado.`);
        return;
    }
    // Agregar medidor al arreglo
    medidores.push({ medidor, coordenadas });
    // Limpiar formulario
    medidorForm.reset();
    // Actualizar tabla
    actualizarTabla();
});

// Agregar evento "click" al botón de búsqueda
buscarBtn.addEventListener('click', () => {
    const buscarMedidor = buscarMedidorInput.value.trim().toLowerCase();
    // Filtrar medidores por número de medidor
    const medidoresFiltrados = medidores.filter((m) =>
        m.medidor.toLowerCase().includes(buscarMedidor)
    );
    // Actualizar tabla con resultados de búsqueda
    actualizarTabla(medidoresFiltrados);
});

// Función para actualizar la tabla de medidores
function actualizarTabla(medidoresArr = medidores) {
    // Limpiar contenido de la tabla
    medidorTableBody.innerHTML = '';
    // Recorrer arreglo de medidores y agregar filas a la tabla
    medidoresArr.forEach((m) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.medidor}</td>
            <td>${m.coordenadas}</td>
            <td>
                <button class="editar-btn">Editar</button>
                <button class="eliminar-btn">Eliminar</button>
                <button class="ver-mapa-btn" data-coordenadas="${m.coordenadas}">Ver mapa</button>
            </td>
        `;
        medidorTableBody.appendChild(tr);
    });
    // Agregar evento "click" a los botones "Ver mapa"
    const verMapaBtns = document.querySelectorAll('.ver-mapa-btn');
    verMapaBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const coordenadas = e.target.dataset.coordenadas;
            if (coordenadas) {
                const [lat, lng] = coordenadas.split(',').map(c => parseFloat(c.trim()));
                if (!isNaN(lat) && !isNaN(lng)) {
                    // Redirigir a la ubicación en Google Maps
                    window.location.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                }
            }
        });
    });

    // Agregar evento "click" a los botones "Eliminar"
    const eliminarBtns = document.querySelectorAll('.eliminar-btn');
    eliminarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
        // Eliminar el medidor del arreglo
        medidores.splice(index, 1);
        // Actualizar tabla
        actualizarTabla();
        });
    });

    // Agregar evento "click" a los botones "Editar"
    const editarBtns = document.querySelectorAll('.editar-btn');
    editarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
        // Obtener el medidor correspondiente del arreglo
        const medidor = medidores[index];
        // Rellenar el formulario con los datos del medidor
        const medidorInput = document.getElementById('medidor-input');
        const coordenadasInput = document.getElementById('coordenadas-input');
        medidorInput.value = medidor.medidor;
        coordenadasInput.value = medidor.coordenadas;
        // Eliminar el medidor del arreglo
        medidores.splice(index, 1);
        // Actualizar tabla
        actualizarTabla();
        });
    });
}


