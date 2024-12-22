import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async(req, res)=> {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All blogs retrieved successfully',
    data: result,
  });
});

const getBlogsByAuthorId = catchAsync(async (req, res) => {
  const { authorId } = req.params;

  const result = await BlogServices.getBlogsByAuthorId(authorId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Blogs by author retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.updateBlogIntoDB(id, req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
})

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
})

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogsByAuthorId,
  updateBlog,
  deleteBlog,
};
