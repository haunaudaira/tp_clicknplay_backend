import express from "express";
import { Router } from "express";
import { controladorDashboard } from "../controllers/dashboardController.js";
// import { incioSesion, cerrarSesion } from "../controllers/usuarioController.js";
// import { reqAutorizacion } from "../middlewares/authMiddleware.js";

const router = Router(); 

// TODO: aca iria el resto de controladores
router.get('/dashboard', controladorDashboard.mostrarDashboard); //ruta para ver el panel completo

export default router;