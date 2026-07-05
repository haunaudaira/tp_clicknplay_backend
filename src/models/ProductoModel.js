    // un modelo representa una tabla de la bd 
import db from "../api/database/db.js";

const ProductosModelo = {
    // metodo para obtener todos los prods
    getAll: async () => {
        const query = 'SELECT * FROM productos';
        const [rows] = await db.execute(query);
        return rows;
    },

    // metodo para cambiar el estado del prod
    cambiarEstado: async (id, nuevoEstado) =>{
        //binarios
        const query = 'UPDATE productos SET estado = ? WHERE id = ?';
        const [result] = await db.execute(query, [nuevoEstado, id]);
        return result.affectedRows > 0;
    },

    crear: async (nombre, imagen, genero, categoria, precio) => {
        const query = 'INSERT INTO productos (nombre, imagen, genero, categoria, precio, estado) VALUES (?, ?, ?, ?, ?, 1)';

        const [resultado] = await db.execute(query, [nombre, imagen, genero, categoria, precio]);
        // return resultado.insertId;
    },

    buscar: async (id) => {
        const query = 'SELECT * FROM productos WHERE id = ?'
        const [rows] = await db.execute(query, [id]);

        return rows;
    },

    modificar: async (id, nombre, precio, genero, categoria, imagen) => {
        let query;
        let params;

        if (imagen) {
            query = 'UPDATE productos SET nombre = ?, precio = ?, genero = ?, categoria = ?, imagen = ? WHERE id = ?';
            params = [nombre, precio, genero, categoria, imagen, id];
        } else {
            query = 'UPDATE productos SET nombre = ?, precio = ?, genero = ?, categoria = ? WHERE id = ?';
            params = [nombre, precio, genero, categoria, id];
        }

        const [resultado] = await db.execute(query, params);
        return resultado.affectedRows > 0;
    }
}

export default ProductosModelo;