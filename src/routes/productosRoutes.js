import { Router } from 'express';
import controladorProductos from '../controllers/productoController.js';
import ProductoMiddleware from '../middlewares/productoMiddleware.js';
import { reqAutorizacion } from "../middlewares/authMiddleware.js";
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = Router();

// API publico para el frontend
router.get('/api/productos', controladorProductos.obtenerProductosClientes);

// Rutas de administracion de productos
router.get('/productos/nuevo', reqAutorizacion, controladorProductos.formularioAltaProductos); //muestra la pantalla del formulario de alta
router.get('/productos/modificar/:id', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.modificarDatos);
router.get('/productos/:id', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.buscarPorId);
router.get('/productos/consultar', reqAutorizacion, controladorProductos.buscarPorId);
router.post('/productos/modificar/:id', reqAutorizacion, ProductoMiddleware.validarId, uploadMiddleware.single('imagen'), ProductoMiddleware.validarDatosProducto, controladorProductos.procesarEdicion);
router.post('/productos/:id/estado', reqAutorizacion, ProductoMiddleware.validarId, controladorProductos.cambiarEstadoProducto);
router.post('/productos/nuevo', reqAutorizacion, uploadMiddleware.single('imagen'), ProductoMiddleware.validarDatosProducto, controladorProductos.procesoDatos); // recibe los datos del formulario y los procesa

export default router;