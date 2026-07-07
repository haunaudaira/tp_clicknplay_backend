import { Router } from 'express';
import controladorVentas from '../controllers/ventasController.js';

const router = Router();

// ruta publica para registrar ventas desde el front
router.post('/nueva', controladorVentas.registrarVenta);


export default router;
