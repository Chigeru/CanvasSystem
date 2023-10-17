import express from 'express';

import { getTask_list, getTask_details, postTask, updateTask, deleteTask } from '../../controller/TaskController.js';

const router = express.Router({mergeParams: true});


router.get('/', getTask_list);
router.get('/:taskid', getTask_details);
router.post('/post', postTask);
router.patch('/update', updateTask);
router.delete('/delete/:taskid', deleteTask);

export default router;
