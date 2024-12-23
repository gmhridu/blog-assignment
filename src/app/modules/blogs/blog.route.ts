import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/:authorId', auth(USER_ROLE.user, USER_ROLE.admin), BlogControllers.getBlogsByAuthorId);

router.put('/:id', auth(USER_ROLE.user), BlogControllers.updateBlog);

router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
