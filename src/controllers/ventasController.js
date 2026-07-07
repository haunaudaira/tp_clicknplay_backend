import VentaModelo from '../models/VentaModel.js';

const controladorVentas = {
    
    registrarVenta: async (req, res) => {
        try {
            const { nombre_usuario, precio_total, productos } = req.body;
            
            console.log('Registrar venta recibida desde el front:', { nombre_usuario, precio_total, productos });

            if (!precio_total || !productos || !Array.isArray(productos) || productos.length === 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Faltan datos o el carrito está vacío' 
                });
            }

            const idVenta = await VentaModelo.crearVenta({ 
                nombre_usuario, 
                precio_total, 
                productos 
            });
            
            console.log('Venta insertada con id:', idVenta);

            return res.status(201).json({ success: true, idVenta });
            
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            return res.status(500).json({ success: false, message: 'Error al registrar la venta', error: error.message });
        }
    }
};

export default controladorVentas;