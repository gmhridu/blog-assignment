/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isUserExistById(id: string): Promise<IUser>;
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRoll = keyof typeof USER_ROLE;
