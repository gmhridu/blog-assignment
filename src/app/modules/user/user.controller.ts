import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async(req, res)=> {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All users retrieved successfully',
    data: result,
  });
})

export const UserControllers = {
  createUser,
  createAdmin,
  getAllUsers,
};
