import { Document } from 'mongoose';

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
  avatar: string | null;
  created_date: Date;
}
export interface IUserModel extends IUser {}
export interface IUserDoc extends IUser, Document {}