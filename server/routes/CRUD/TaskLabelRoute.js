import express from 'express';

import { getTaskLabel_list, getTaskLabel_details, postTaskLabel, updateTaskLabel, deleteTaskLabel } from '../../controller/TaskLabelController.js';

const router = express.Router({mergeParams: true});


router.get('/', getTaskLabel_list);
router.get('/:labelid', getTaskLabel_details);
router.post('/post', postTaskLabel);
router.patch('/update', updateTaskLabel);
router.delete('/delete', deleteTaskLabel);

export default router;
