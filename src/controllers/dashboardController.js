// controlador gestiona las peticiones del usuario. actua como intermediario entre las vistas y el modelo 
import db from "../api/database/db.js"
import ProductosModelo from "../models/ProductoModel.js";


// se implementa una funcion que engloba a las restantes par que el import dentro de rutas sea mas breve
const controladorDashboard = {
    mostrarDashboard: async (req, res) => {
        try {
        // Obtenemos los productos de la base de datos
        const [productos] = await ProductosModelo.getAll();

        // Renderizamos la vista pasándole AMBAS cosas: el usuario y los productos
        res.render('dashboard', { 
            usuario: req.session.usuario,
            productos: productos 
        });
        } catch (error) {
            console.error("Error al cargar el dashboard:", error);
            res.status(500).send("Error interno del servidor al cargar el panel.");
        }
    }
}

export default controladorDashboard;