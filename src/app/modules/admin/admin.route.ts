import { Router } from 'express';
import { AdminControllers } from './admin.controller';

const router = Router();

router.get('/users', AdminControllers.getAllUsers);

router.patch('/users/:userId/block', AdminControllers.blockedAUser);

router.delete('/users/:userId/delete', AdminControllers.deleteUser);

router.delete('/blogs/:id', AdminControllers.deleteABlog);

export const AdminRoutes = router;
