import express from 'express';

import { CreateProductWithExtendedData, CreateTask } from '../controller/FormDataController.js';


const router = express.Router();

router.post('/form/projectcreation', CreateProductWithExtendedData);
router.post('/form/taskcreation', CreateTask);

export default router;


/* syke.. not here, the princess is in an other file */ 