import express from 'express';

import DepartmentRoutes from './CRUD/DepartmentRoute.js';
import AccessLevelRoutes from './CRUD/AccessLevelRoute.js';
import ProjectRoutes from './CRUD/ProjectRoute.js';
import UserRoutes from './CRUD/UserRoute.js'; 



const router = express.Router();

router.use('/accesslevel', AccessLevelRoutes);
router.use('/department', DepartmentRoutes);
router.use('/project', ProjectRoutes);
router.use('/user', UserRoutes);

export default router;
