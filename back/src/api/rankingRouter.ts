import { Router } from 'express';
import controller from '../controller/rankingController';

const router = Router();

router.post('/current', controller.saveCurrentResult);

export default router;
