import express from 'express';

import { getAccessLevel_list, getAccessLevel_details, postAccessLevel, updateAccessLevel, deleteAccessLevel } from '../../controller/AccessLevelController.js';

const router = express.Router();


router.get('/', getAccessLevel_list);
router.get('/:id', getAccessLevel_details);
router.post('/post', postAccessLevel);
router.patch('/update', updateAccessLevel);
router.delete('/delete', deleteAccessLevel);

export default router;