import express from 'express';
import { getTask, getTasks, getStatuses, getStatus, getUsers, getUser, getTaskCategories, getTaskCategory } from '../controller/general.js';

const router = express.Router();

router.get('/task', getTasks);
router.get('/tasks/:id', getTask);
router.get('/taskStatuses', getStatuses);
router.get('/taskStatus/:_id', getStatus);
router.get('/users', getUsers);
router.get('/user/:_id', getUser);
router.get('/task/categories', getTaskCategories);
router.get('/task/category/:_id', getTaskCategory);

export default router;