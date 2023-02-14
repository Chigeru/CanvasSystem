import express from 'express';
import { postStatus, postTask, postUser, postTaskCategory } from '../../controller/InsertData.js';

const router = express.Router();

router.post('/Status', postStatus);
router.post('/TaskCategory', postTaskCategory);
router.post('/Task', postTask);
router.post('/User', postUser);

export default router;