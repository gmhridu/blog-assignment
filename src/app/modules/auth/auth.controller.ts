import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req, res)=> {
  const result = await AuthServices.loginUserIntoDB(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  })
});

export const AuthControllers = {
  loginUser,
}