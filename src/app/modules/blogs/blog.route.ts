import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = Router();

router.post(
  '/create-blog',
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
