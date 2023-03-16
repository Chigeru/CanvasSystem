import express from 'express';

import { getProject_list, getProject_details, postProject, updateProject, deleteProject } from '../../controller/ProjectController.js'

const router = express.Router();


router.get('/all', getProject_list);
router.get('/:id', getProject_details);
router.post('/post', postProject);
router.patch('/update', updateProject);
router.delete('/delete', deleteProject);

export default router;
