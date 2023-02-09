import express from 'express';
import { deleteStatus, deleteTask, deleteTaskCategory, deleteUser } from '../../controller/DeleteData.js';

const router = express.Router();

router.delete('/deleteStatus', deleteStatus);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteTaskCategory', deleteTaskCategory);
router.delete('/deleteUser', deleteUser);

export default router;