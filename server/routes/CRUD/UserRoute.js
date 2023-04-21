import express from 'express';

import { getUser_list, getUser_details, postUser, updateUser, deleteUser } from '../../controller/UserController.js';

const router = express.Router();


router.get('/', getUser_list);
router.get('/:id', getUser_details);
router.post('/post', postUser);
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);

export default router;
