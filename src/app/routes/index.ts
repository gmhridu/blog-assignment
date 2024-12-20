import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';

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
];

routes.forEach((route)=> router.use(route.path, route.route));

export default router;
