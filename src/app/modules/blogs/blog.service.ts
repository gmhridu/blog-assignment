import QueryBuilder from '../../builders/QueryBuilder';
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

  const result = await Blog.find({ author: authorId }).populate('author');

  return result;
};


export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogsByAuthorId,
};
