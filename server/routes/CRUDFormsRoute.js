import express from 'express';

import { getAllDataForProjectCreation } from '../controller/FormDataController.js';


const router = express.Router();

router.get('/projectcreation', getAllDataForProjectCreation);

export default router;