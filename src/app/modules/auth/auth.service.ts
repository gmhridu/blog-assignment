/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utlis";
import jwt, { JwtPayload }  from 'jsonwebtoken';

const loginUserIntoDB = async(payload: TLoginUser) => {
  // check if the user is exist with this email
  const user = await User.isUserExist(payload?.email);

  if(!user){
    throw new Error('This user is not found!');
  };

  // check if the user is already deleted
  const isUserDeleted = user?.isDeleted;

  if(isUserDeleted){
    throw new Error('This user is deleted!');
  }

  const isUserBlocked = user?.isBlocked;

  if(isUserBlocked){
    throw new Error('This user is blocked!');
  }

  // check if the password is correct
  if(!(await User.isPasswordMatch(payload?.password, user?.password))){
    throw new Error('Incorrect password!');
  }

  const jwtPayload = {
    userId: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  };

}

const refreshToken = async(token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const {userId, iat} = decoded;

  const user = await User.isUserExist(userId);

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  const isUserDeleted = user?.isDeleted;

  if(isUserDeleted){
    throw new AppError(403, 'This user is deleted!');
  }

  const isUserBlocked = user?.isBlocked;

  if(isUserBlocked){
    throw new AppError(403, 'This user is blocked!');
  }

  const jwtPayload = {
    userId: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  };
}

export const AuthServices = {
  loginUserIntoDB,
  refreshToken,
}