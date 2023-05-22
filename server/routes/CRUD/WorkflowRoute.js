import express from 'express';

import { getTaskWorkflow_list, getTaskWorkflow_details, postTaskWorkflow, updateTaskWorkflow, deleteTaskWorkflow } from '../../controller/WorkflowController.js';
import TaskRoutes from './TaskRoute.js';

const router = express.Router({mergeParams: true});

router.use('/:workflowid/task', TaskRoutes);

router.get('/', getTaskWorkflow_list);
router.get('/:workflowid', getTaskWorkflow_details);
router.post('/post', postTaskWorkflow);
router.patch('/update', updateTaskWorkflow);
router.delete('/delete', deleteTaskWorkflow);

export default router;
