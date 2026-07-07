const form = document.getElementById('formularioProducto');
        const mensajeDiv = document.getElementById('mensaje');
        const btnGuardar = document.getElementById('btnGuardar');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();  

            const formData = new FormData(form);

            // cambiamos el txt del boton para que el usuario sepa que se esta cargando
            btnGuardar.innerText = "Guardando...";
            btnGuardar.disabled = true;

            try {
                const response = await fetch('/productos/nuevo', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                // Evaluamos la respuesta del backend
                if (response.ok) {
                    mensajeDiv.style.color = "green";
                    mensajeDiv.innerText = "¡Producto guardado con éxito!";
                    form.reset(); // Limpiamos el formulario
                    
                    // opcional redirigir al dashboard despues de 2 segundos
                    // setTimeout(() => {
                    //     window.location.href = '/admin/dashboard';
                    // }, 2000);
                } else {
                    throw new Error(data.message || 'Error al guardar el producto');
                }

            } catch (error) {
                console.error('Error:', error);
                mensajeDiv.style.color = "red";
                mensajeDiv.innerText = "Hubo un error: " + error.message;
            } finally {
                // restauramos el btn
                btnGuardar.innerText = "Guardar Producto";
                btnGuardar.disabled = false;
            }
        });