import express from 'express';

import { getTaskStatus_list, getTaskStatus_details, postTaskStatus, updateTaskStatus ,deleteTaskStatus} from '../../controller/TaskStatusController.js';

const router = express.Router();


router.get('/all', getTaskStatus_list);
router.get('/:id', getTaskStatus_details);
router.post('/post', postTaskStatus);
router.patch('/update', updateTaskStatus);
router.delete('/delete', deleteTaskStatus);

export default router;
