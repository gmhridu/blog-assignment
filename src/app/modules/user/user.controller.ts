import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
