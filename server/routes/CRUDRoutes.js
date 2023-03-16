import express from 'express';

import DepartmentRoutes from './CRUD/DepartmentRoute.js';
import AccessLevelRoutes from './CRUD/AccessLevelRoute.js';
import ProjectRoutes from './CRUD/ProjectRoute.js';
import TaskRoutes from './CRUD/UserRoute.js';
import TaskCategoryRoutes from './CRUD/TaskCategoryRoute.js';
import TaskStatusRoutes from './CRUD/TaskStatusRoute.js';
import UserRoutes from './CRUD/UserRoute.js'; 



const router = express.Router();

router.use('/accesslevel', AccessLevelRoutes);
router.use('/department', DepartmentRoutes);
router.use('/project', ProjectRoutes);
router.use('/taskstatus', TaskStatusRoutes);
router.use('/taskscategory', TaskCategoryRoutes);
router.use('/tasks', TaskRoutes);
router.use('/users', UserRoutes);

export default router;
