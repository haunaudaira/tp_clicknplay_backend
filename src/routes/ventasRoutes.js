import { Router } from 'express';
import controladorVentas from '../controllers/ventasController.js';

const router = Router();

// Ruta pública para registrar ventas desde el frontend
router.post('/nueva', controladorVentas.registrarVenta);


export default router;
