import { Router } from 'express';
import controladorVentas from '../controllers/ventasController.js';

const router = Router();

router.get('/excel', controladorVentas.descargarExcel);

// Ruta pública para registrar ventas desde el frontend
router.post('/nueva', controladorVentas.registrarVenta);
// Ruta de debug: listar ventas en JSON
router.get('/lista', controladorVentas.listarVentas);

export default router;
