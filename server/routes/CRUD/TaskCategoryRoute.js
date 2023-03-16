import express from 'express';

import { getTaskCategory_list, getTaskCategory_details, postTaskCategory, updateTaskCategory, deleteTaskCategory } from '../../controller/TaskCategoryController.js';

const router = express.Router();


router.get('/all', getTaskCategory_list);
router.get('/:id', getTaskCategory_details);
router.post('/post', postTaskCategory);
router.patch('/update', updateTaskCategory);
router.delete('/delete', deleteTaskCategory);

export default router;
