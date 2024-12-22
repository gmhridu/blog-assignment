/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRoll } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRoll[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if the token is sent from the client
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // check if user is authenticated and has valid access token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // check if the user is exists
    const user = await User.isUserExist(userId);

    if (!user) {
      throw new AppError(404, 'This user is not found!');
    }

    // check if the user is already deleted
    const isUserDeleted = user?.isDeleted;

    if (isUserDeleted) {
      throw new AppError(403, 'This user is deleted!');
    }

    // check if the user is already blocked
    const isUserBlocked = user?.isBlocked;

    if (isUserBlocked) {
      throw new AppError(403, 'This user is blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized for this action!');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
