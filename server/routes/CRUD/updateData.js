import express from 'express';
import { updateStatus, updateTask, updateTaskCategory, updateUser } from '../../controller/updateData.js';

const router = express.Router();

router.patch('/Status', updateStatus);
router.patch('/Task', updateTask);
router.patch('/TaskCategory', updateTaskCategory);
router.patch('/User', updateUser);

export default router;