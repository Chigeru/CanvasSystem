import express from 'express';
import { deleteStatus, deleteTask, deleteTaskCategory, deleteUser } from '../../controller/DeleteData.js';

const router = express.Router();

router.delete('/Status', deleteStatus);
router.delete('/Task', deleteTask);
router.delete('/TaskCategory', deleteTaskCategory);
router.delete('/User', deleteUser);

export default router;