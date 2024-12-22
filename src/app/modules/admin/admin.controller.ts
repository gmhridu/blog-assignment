import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await AdminServices.getAllUsersFromDB();

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

const blockedAUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await AdminServices.blockedAUserIntoDB(userId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async(req, res)=> {
  const { userId } = req.params;

  const result = await AdminServices.deleteAUserIntoDB(userId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
})

const deleteABlog = catchAsync(async(req, res)=> {
  const { id } = req.params;

  const result = await AdminServices.deleteABlogFromDB(id);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
})

export const AdminControllers = {
  blockedAUser,
  getAllUsers,
  deleteUser,
  deleteABlog,
};
