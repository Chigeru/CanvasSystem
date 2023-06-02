import express from 'express';

import { getDepartment_list, getDepartmentExpanded_list ,getDepartment_details, postDepartment, updateDepartment, deleteDepartment } from '../../controller/DepartmentController.js';

const router = express.Router();


router.get('/', getDepartment_list);
router.get('/expanded', getDepartmentExpanded_list);
router.get('/:id', getDepartment_details);
router.post('/post', postDepartment);
router.patch('/update', updateDepartment);
router.delete('/delete', deleteDepartment);

export default router;
