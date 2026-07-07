// manejar el envio del formulario de edicion
const formProducto = document.getElementById('formularioProducto');
const btnGuardar = document.getElementById('btnGuardar');
const mensajeDiv = document.getElementById('mensaje');

if (formProducto) {
    formProducto.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(formProducto);
        btnGuardar.innerText = 'Guardando...';
        btnGuardar.disabled = true;
        
        try {
            const response = await fetch(`/productos/modificar/${productId}`, {
                method: 'PUT',
                body: formData
            });
            
            if (response.ok) {
                mensajeDiv.style.color = 'green';
                mensajeDiv.innerText = 'Producto actualizado correctamente';
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 1500);
            } else {
                throw new Error('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            mensajeDiv.style.color = 'red';
            mensajeDiv.innerText = 'Error: ' + error.message;
            btnGuardar.innerText = 'Guardar Producto';
            btnGuardar.disabled = false;
        }
    });
}

// seleccionar elementos del dom
const botonesEstado = document.querySelectorAll('.btn-estado');
const modalOverlay = document.getElementById('modal-overlay');
const modalText = document.getElementById('modal-text');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

let pendingAction = null; // guardara id y estado mientras se confirma

// abrir modal con texto segun estado actual
const abrirModal = (id, estado) => {
    const texto = estado === '0' ? 'desea dar de baja este producto?' : 'desea reactivar este producto?';
    modalText.textContent = texto;
    modalOverlay.setAttribute('aria-hidden', 'false');
    pendingAction = { id, estado: Number(estado) };
};

const cerrarModal = () => {
    modalOverlay.setAttribute('aria-hidden', 'true');
    pendingAction = null;
};

// manejar confirmacion
modalConfirm.addEventListener('click', async () => {
    if (!pendingAction) return;
    const { id, estado } = pendingAction;

    try {
        const response = await fetch(`/productos/${id}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado })
        });

        if (response.ok) {
            cerrarModal();
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            console.error('error al cambiar estado');
            cerrarModal();
        }
    } catch (err) {
        console.error(err);
        cerrarModal();
    }
});

modalCancel.addEventListener('click', () => {
    cerrarModal();
});

// asignar listener a cada boton de estado
botonesEstado.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const estado = button.dataset.estado;
        abrirModal(id, estado);
    });
});