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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado })
        });

        if (response.ok) {
            window.location.reload();
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