import express from 'express';

import { getWorkflow_list, getWorkflow_details, postWorkflow, updateWorkflow, deleteWorkflow } from '../../controller/WorkflowController.js';
import TaskRoutes from './TaskRoute.js';

const router = express.Router({mergeParams: true});

router.use('/:workflowid/task', TaskRoutes);

router.get('/', getWorkflow_list);
router.get('/:workflowid', getWorkflow_details);
router.post('/post', postWorkflow);
router.patch('/update', updateWorkflow);
router.delete('/delete', deleteWorkflow);

export default router;
