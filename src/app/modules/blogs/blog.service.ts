import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blogs.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.Query;

  return result;
};

// retrieved users posted blogs using authorId
const getBlogsByAuthorId = async (authorId: string) => {
  const author = await User.findById(authorId);

  if (!author) {
    throw new AppError(404, 'Author not found!');
  }

  if (author.isBlocked) {
    throw new AppError(403, 'Author is blocked. Cannot retrieve blogs.');
  }

  if (author.isDeleted) {
    throw new AppError(403, 'Author is deleted. Cannot retrieve blogs.');
  }

  const result = await Blog.find({ author: authorId }).populate('author');

  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogFromDB = async(id: string)=> {
  const result = await Blog.findByIdAndDelete(id);

  return result;
}

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogsByAuthorId,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
