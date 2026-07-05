import VentaModelo from '../models/VentaModel.js';
import { armarExcelVentas } from '../utils/generarExcel.js'; 

const controladorVentas = {
    descargarExcel: async (req, res) => {
        try {
            const ventas = await VentaModelo.obtenerVentasParaExcel();

            if (ventas.length === 0) {
                return res.status(500).send("<script>alert('No hay ventas para visualizar, vuelve al dashboard'); window.location.href='/admin/dashboard';</script>");
            }

            await armarExcelVentas(ventas, res);

        } catch(error) {
            console.error("Error al generar el Excel:", error); 
            return res.status(500).send("<script>alert('Ocurrió un error al generar el reporte. Revisa la consola del servidor.'); window.location.href='/admin/dashboard';</script>");
        }
    }
    ,
    registrarVenta: async (req, res) => {
        try {
            const { nombre_usuario, precio_total, productos } = req.body;
            console.log('Registrar venta recibida:', { nombre_usuario, precio_total, productos });

            // Guardamos la venta en la BD
            const idVenta = await VentaModelo.crearVenta({ nombre_usuario, precio_total, productos });
            console.log('Venta insertada con id:', idVenta);

            return res.status(201).json({ success: true, idVenta });
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            return res.status(500).json({ success: false, message: 'Error al registrar la venta' });
        }
    }
    ,
    listarVentas: async (req, res) => {
        try {
            const ventas = await VentaModelo.obtenerVentasParaExcel();
            return res.json({ success: true, ventas });
        } catch (error) {
            console.error('Error al listar ventas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener ventas' });
        }
    }
};

export default controladorVentas;