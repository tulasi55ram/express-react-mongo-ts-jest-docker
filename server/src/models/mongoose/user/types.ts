import { Document } from 'mongoose';

export interface IUser {
  email: string;
  first_name?: string | null | undefined;
  last_name?: string | null | undefined;
  password: string;
  role?: string;
  avatar?: string | null | undefined;
  created_date?: Date;
}
export interface IUserModel extends IUser {}
export interface IUserDoc extends IUser, Document {}