import express from 'express';

import { CreateProductWithExtendedData } from '../controller/FormDataController.js';


const router = express.Router();

router.get('/form/projectcreation', CreateProductWithExtendedData);

export default router;