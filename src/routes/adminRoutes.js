import { Router } from "express";
import controladorDashboard from "../controllers/dashboardController.js"
import { incioSesion, cerrarSesion } from "../controllers/usuarioController.js"
import { reqAutorizacion } from "../middlewares/authMiddleware.js";
import ventasRoutes from './ventasRoutes.js';

const router = Router(); 

router.get('/login', incioSesion); // muestra el form
router.post('/login', incioSesion); // el formulario envia el email y contraseña para que el controlador valide si existe
router.get('/logout', cerrarSesion); // nos lleva al login al destruir la sesion

router.get('/dashboard', reqAutorizacion, controladorDashboard.mostrarDashboard); //ruta para ver el panel completo
router.use('/ventas', ventasRoutes);

export default router;