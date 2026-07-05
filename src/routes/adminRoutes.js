import express from "express";
import { Router } from "express";
import controladorDashboard from "../controllers/dashboardController.js"
import ProductoMiddleware from "../middlewares/productoMiddleware.js"
import controladorProductos from "../controllers/productoController.js"
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { incioSesion, cerrarSesion } from "../controllers/usuarioController.js"
import { reqAutorizacion } from "../middlewares/authMiddleware.js";

const router = Router(); 

router.get('/login', incioSesion); // muestra el form
router.post('/login', incioSesion); // el formulario envia el email y contraseña para que el controlador valide si existe
router.get('/logout', cerrarSesion); // nos lleva al login al destruir la sesion

router.get('/api/productos', controladorProductos.obtenerProductosClientes); //muestra el catalogo al front

router.get('/dashboard', reqAutorizacion, controladorDashboard.mostrarDashboard); //ruta para ver el panel completo
router.get('/productos/nuevo', reqAutorizacion, controladorProductos.formularioAltaProductos);
router.get('/productos/modificar/:id', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.modificarDatos);
router.get('/productos/:id', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.buscarPorId);
router.post('/productos/modificar/:id', reqAutorizacion, ProductoMiddleware.validarId, uploadMiddleware.single('imagen'), ProductoMiddleware.validarDatosProducto, controladorProductos.procesarEdicion);
router.post('/productos/:id/estado', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.cambiarEstadoProducto);
router.post('/productos/nuevo', reqAutorizacion, uploadMiddleware.single('imagen'), ProductoMiddleware.validarDatosProducto, controladorProductos.procesoDatos);

export default router;