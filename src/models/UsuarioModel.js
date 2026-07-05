import db from "../api/database/db.js";

const UsuarioModelo = {

    buscarCorreo: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = ?'

        const [rows] = await db.execute(query, [email]);

        return rows;
    }
}

export default UsuarioModelo;