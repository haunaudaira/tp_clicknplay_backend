import express from "express";
import { Router } from "express";
import { controladorDashboard } from "../controllers/dashboardController.js";
import ProductoMiddleware from "../middlewares/productoMiddleware.js"
import controladorProductos from "../controllers/productoController.js"
// import { incioSesion, cerrarSesion } from "../controllers/usuarioController.js";
// import { reqAutorizacion } from "../middlewares/authMiddleware.js";



const router = Router(); 
router.get('/api/productos', controladorProductos.obtenerProductosClientes);

// TODO: aca iria el resto de controladores
router.get('/dashboard', controladorDashboard.mostrarDashboard); //ruta para ver el panel completo
router.get('/productos/modificar/:id', ProductoMiddleware.validarId, controladorProductos.modificarDatos);
router.get('/productos/:id', ProductoMiddleware.validarId, controladorProductos.buscarPorId);
router.post('/productos/modificar/:id', ProductoMiddleware.validarId, ProductoMiddleware.validarDatosProducto, controladorProductos.procesarEdicion);
router.post('/productos/:id/estado', ProductoMiddleware.validarId, controladorProductos.cambiarEstadoProducto);
router.post('/productos/nuevo', ProductoMiddleware.validarDatosProducto, controladorProductos.procesoDatos);


export default router;

