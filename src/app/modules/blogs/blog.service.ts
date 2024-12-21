import { TBlog } from './blog.interface';
import { Blog } from './blogs.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author');

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
};
