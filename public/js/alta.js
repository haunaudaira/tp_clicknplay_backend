const form = document.getElementById('formularioProducto');
        const mensajeDiv = document.getElementById('mensaje');
        const btnGuardar = document.getElementById('btnGuardar');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();  

            const formData = new FormData(form);

            // Cambiamos el texto del botón para que el usuario sepa que está cargando
            btnGuardar.innerText = "Guardando...";
            btnGuardar.disabled = true;

            try {
                // Enviamos la petición POST al backend usando fetch
                //  NO se le pone "Content-Type" a los headers cuando usas FormData,
                // el navegador genera el "multipart/form-data" automáticamente.
                const response = await fetch('/admin/productos/nuevo', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                // Evaluamos la respuesta del backend
                if (response.ok) {
                    mensajeDiv.style.color = "green";
                    mensajeDiv.innerText = "¡Producto guardado con éxito!";
                    form.reset(); // Limpiamos el formulario
                    
                    // Opcional: Redirigir al dashboard después de 2 segundos
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
                // Restauramos el botón
                btnGuardar.innerText = "Guardar Producto";
                btnGuardar.disabled = false;
            }
        });