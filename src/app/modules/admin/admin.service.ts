import { Blog } from '../blogs/blogs.model';
import { User } from '../user/user.model';

const getAllUsersFromDB = async () => {
  const users = await User.find();

  return users;
};

const blockedAUserIntoDB = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      isBlocked: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new Error('User not found!');
  }

  return user;
};

const deleteAUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new Error('Failed to delete Student!');
  }

  return result;
};

const deleteABlogFromDB = async(id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new Error('Failed to delete Blog!');
  }

  return result;
}

export const AdminServices = {
  blockedAUserIntoDB,
  getAllUsersFromDB,
  deleteAUserIntoDB,
  deleteABlogFromDB,
};
