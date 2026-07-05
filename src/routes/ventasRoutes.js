import { Router } from 'express';
import controladorVentas from '../controllers/ventasController.js';

const router = Router();

router.get('/excel', controladorVentas.descargarExcel);

export default router;
