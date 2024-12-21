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
  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All blogs retrieved successfully',
    data: result,
  });
})

export const BlogControllers = {
  createBlog,
  getAllBlogs,
};
