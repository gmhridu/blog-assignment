/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isDeleted: boolean;
}

export interface AdminModel extends Model<TAdmin>{
  isUserExists(email: string): Promise<TAdmin | null>;
}