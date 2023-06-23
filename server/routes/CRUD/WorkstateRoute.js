import express from 'express';

import { getWorkstate_list, getWorkstate_details, postWorkstate, updateWorkstate, deleteWorkstate } from '../../controller/WorkstateController.js';
import TaskRoutes from './TaskRoute.js';

const router = express.Router({mergeParams: true});

router.use('/:workstateid/task', TaskRoutes);

router.get('/', getWorkstate_list);
router.get('/:workstateid', getWorkstate_details);
router.post('/post', postWorkstate);
router.patch('/update', updateWorkstate);
router.delete('/delete', deleteWorkstate);

export default router;
