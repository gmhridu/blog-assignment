import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(5, 'Title must be at least 5 characters long')
      .max(100, 'Title can not be more than 100 characters'),
    content: z.string({
      required_error: 'Content is required',
    }),
    author: z.string(),
    isPublished: z.boolean().optional().default(true),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
