import db from '../api/database/db.js'; // Ajusta la ruta a tu conexión de base de datos

const VentaModelo = {
    obtenerVentasParaExcel: async () => {
        const query = `
            SELECT 
                v.id AS id_venta, 
                v.fecha AS fecha, 
                v.nombre_usuario AS cliente, 
                p.nombre AS producto, 
                vp.cantidad AS cantidad, 
                v.precio_total AS precio_total
            FROM ventas v
            JOIN ventas_productos vp ON v.id = vp.id_venta
            JOIN productos p ON vp.id_producto = p.id
            ORDER BY v.fecha DESC
        `;

        const [ventas] = await db.execute(query);
        return ventas;
    }
};

export default VentaModelo;
