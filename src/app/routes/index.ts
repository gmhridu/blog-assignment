import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blogs/blog.route';
import { AdminRoutes } from '../modules/admin/admin.route';

type TRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const routes: TRoutes[] = [
  {
    path: '/auth',
    route: UserRouter,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
