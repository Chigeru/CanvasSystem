import express from 'express';

import { getTaskWorkflow_list, getTaskWorkflow_details, postTaskWorkflow, updateTaskWorkflow, deleteTaskWorkflow } from '../../controller/WorkflowController.js';

const router = express.Router({mergeParams: true});


router.get('/all', getTaskWorkflow_list);
router.get('/:workflowid', getTaskWorkflow_details);
router.post('/post', postTaskWorkflow);
router.patch('/update', updateTaskWorkflow);
router.delete('/delete', deleteTaskWorkflow);

export default router;
