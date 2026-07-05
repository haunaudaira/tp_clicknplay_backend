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
};

export default controladorVentas;