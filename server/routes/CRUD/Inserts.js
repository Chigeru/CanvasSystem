import express from 'express';
import { postStatus, postTask, postUser, postTaskCategory } from '../../controller/InsertData.js';

const router = express.Router();

router.post('/postStatus', postStatus);
router.post('/postTaskCategory', postTaskCategory);
router.post('/postTask', postTask);
router.post('/postUser', postUser);

export default router;