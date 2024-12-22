import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req, res)=> {
  const result = await AuthServices.loginUserIntoDB(req.body);

  const {refreshToken, accessToken} = result;

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      refreshToken,
    },
  })
});

const refreshToken = catchAsync(async(req, res)=> {
  const {refreshToken} = req.cookies;

  if(!refreshToken){
    throw new Error('No refresh token provided!');
  }

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'User token refreshed successfully',
    data: {
      accessToken: result.accessToken,
    },
  })
})

export const AuthControllers = {
  loginUser,
  refreshToken,
}