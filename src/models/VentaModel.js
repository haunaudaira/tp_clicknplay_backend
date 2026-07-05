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
    ,
    crearVenta: async ({ nombre_usuario = null, precio_total = 0, productos = [] }) => {
        // Insertar la venta y luego sus productos relacionados
        const insertVentaQuery = `INSERT INTO ventas (fecha, nombre_usuario, precio_total) VALUES (NOW(), ?, ?)`;
        const [result] = await db.execute(insertVentaQuery, [nombre_usuario, precio_total]);
        const idVenta = result.insertId;

        if (productos && productos.length) {
            const insertProductoQuery = `INSERT INTO ventas_productos (id_venta, id_producto, cantidad) VALUES ?`;
            const valores = productos.map(p => [idVenta, p.id_producto || p.id || null, p.cantidad || 0]);
            await db.query(insertProductoQuery, [valores]);
        }

        return idVenta;
    }
};

export default VentaModelo;
