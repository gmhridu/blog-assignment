import { startSession } from 'mongoose';
import { TAdmin } from '../admin/admin.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { Admin } from '../admin/admin.model';

const createUserIntoDB = async (payload: IUser) => {
  return await User.create(payload);
};

const createAdminIntoDB = async (payload: TAdmin) => {
  const session = await startSession();
  session.startTransaction();

  try {
    // Step 1: Create user with admin role
    const userData: Partial<IUser> = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: 'admin',
    };
    const newUser = await User.create([userData], { session });
    if (!newUser.length) throw new Error('Failed to create admin user');

    // Step 2: Create admin profile and link to the user
    payload.user = newUser[0]._id;
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) throw new Error('Failed to create admin profile');

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return newAdmin[0];
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
