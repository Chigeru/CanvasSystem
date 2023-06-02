import express from 'express';

import { CreateProductWithExtendedData } from '../controller/FormDataController.js';


const router = express.Router();

router.get('/projectcreation', CreateProductWithExtendedData);

export default router;