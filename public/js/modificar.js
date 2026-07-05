 document.querySelectorAll('.btn-estado').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.dataset.id;
                const estado = button.dataset.estado;

                const confirmar = confirm( estado === '0' ? 'desea dar de baja este producto?' : 'desea reactivar este producto?');

                if(!confirmar)return;

                const response = await fetch (`/admin/productos/${id}/estado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({estado: Number(estado)})
                });

                if(response.ok){
                    window.location.reload();
                }
            })
        })