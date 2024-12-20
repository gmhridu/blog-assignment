import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

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

  return user;

}

export const AuthServices = {
  loginUserIntoDB,
}