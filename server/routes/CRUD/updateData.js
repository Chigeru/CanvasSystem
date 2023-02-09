import express from 'express';
import { updateStatus, updateTask, updateTaskCategory, updateUser } from '../../controller/updateData.js';

const router = express.Router();

router.patch('/updateStatus', updateStatus);
router.patch('/updateTask', updateTask);
router.patch('/updateTaskCategory', updateTaskCategory);
router.patch('/updateUser', updateUser);

export default router;