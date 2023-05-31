import express from 'express';

import { getProject_list, getProject_details, getProjectAll_list, getProjectAll_details, postProject, updateProject, deleteProject } from '../../controller/ProjectController.js'
import WorkflowRoutes from './WorkflowRoute.js';
import TaskLabelRoutes from './TaskLabelRoute.js';


const router = express.Router();


router.use('/:projectid/label', TaskLabelRoutes);
router.use('/:projectid/workflow', WorkflowRoutes);

router.get('/', getProject_list);
router.get('/extended', getProjectAll_list);
router.get('/:projectid', getProjectAll_details);
router.post('/post', postProject);
router.patch('/update', updateProject);
router.delete('/delete', deleteProject);

export default router;
