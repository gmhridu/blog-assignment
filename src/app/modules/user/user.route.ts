import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { AuthValidation } from '../auth/auth.validation';
import { AuthControllers } from '../auth/auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.post('/create-admin', UserControllers.createAdmin);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.get('/users', UserControllers.getAllUsers);

export const UserRouter = router;
