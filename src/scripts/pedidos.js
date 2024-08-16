import { listar, buscar } from '../modulos/modulo.js';

const $fecha = document.querySelector("#fecha");

document.addEventListener('DOMContentLoaded', async function() {
    const pedidosBody = document.getElementById('pedidos-body');

    function populateTable(data) {
        pedidosBody.innerHTML = '';

        data.forEach(pedido => {
            const row = document.createElement('tr');
          
            const idCell = document.createElement('td');
            const fecha = document.createElement('td');
            const empleadoCell = document.createElement('td');
            const clienteCell = document.createElement('td');
            const totalCell = document.createElement('td');
            const pagaCell = document.createElement('td');
            const cambioCell = document.createElement('td');
            const contenidoCell = document.createElement('td');

            idCell.textContent = pedido.id;
            fecha.textContent = pedido.fecha;
            buscar(pedido.empleado, `usuarios`)
              .then((x) => {
                empleadoCell.textContent = x.nombre + " " + x.apellido;
              })
            buscar(pedido.cliente, `clientes`)
              .then((x) => {
                clienteCell.textContent = x.nombre + " " + x.apellido;
              })
            totalCell.textContent = pedido.total.toLocaleString();
            pagaCell.textContent = pedido.paga.toLocaleString();
            cambioCell.textContent = pedido.cambio.toLocaleString();
            contenidoCell.innerHTML = `
                <ul>
                    ${pedido.contenido.map(item => `
                        <li>
                            <strong>Nombre:</strong> ${item.nombre}<br>
                            <strong>Color:</strong> ${item.color}<br>
                            <strong>Material:</strong> ${item.material}<br>
                            <strong>Precio:</strong> ${item.precio.toLocaleString()}<br>
                        </li>
                    `).join('')}
                </ul>
            `;

            // Añadir celdas a la fila
            row.appendChild(idCell);
            row.appendChild(fecha);
            row.appendChild(empleadoCell);
            row.appendChild(clienteCell);
            row.appendChild(totalCell);
            row.appendChild(pagaCell);
            row.appendChild(cambioCell);
            row.appendChild(contenidoCell);

            pedidosBody.appendChild(row);
        });
    }

    try {
        const pedidos = await listar('Pedidos');
        populateTable(pedidos);
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
});
