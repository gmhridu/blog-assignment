import { startSession } from 'mongoose';
import { TAdmin } from '../admin/admin.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { Admin } from '../admin/admin.model';

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const createAdminIntoDB = async (payload: TAdmin) => {
  const userData: Partial<IUser> = {};

  // set role as a admin
  userData.role = 'admin';
  userData.name = payload.name;
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await startSession();

  try {
    session.startTransaction();
    // create user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error('Failed to create admin');
    }

    // set _id as user
    payload.user = newUser[0]._id;

    // create a admin
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
};


export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
