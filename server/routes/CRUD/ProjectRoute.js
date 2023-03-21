import express from 'express';

import { getProject_list, getProject_details, postProject, updateProject, deleteProject } from '../../controller/ProjectController.js'
import TaskRoutes from './TaskRoute.js';
import TaskWorkflowRoutes from './TaskWorkflowRoute.js';
import TaskLabelRoutes from './TaskLabelRoute.js';


const router = express.Router();


router.use('/:projectid/labels', TaskLabelRoutes);
router.use('/:projectid/workflow', TaskWorkflowRoutes);
router.use('/:projectid/task', TaskRoutes);

router.get('/all', getProject_list);
router.get('/:projectid', getProject_details);
router.post('/post', postProject);
router.patch('/update', updateProject);
router.delete('/delete', deleteProject);

export default router;
