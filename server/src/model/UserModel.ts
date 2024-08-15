import bcrypt from 'bcrypt';
import { Model, Schema, model } from "mongoose";
import {v4 as uuidv4} from 'uuid';

const SALT_ROUNDS = 10;

interface IUser {
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  hashPassword(raw: string): Promise<void>;
  verifyPassword(raw: string): Promise<boolean>;
  createAccessToken(): string;
  verifyAccessToken(token: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

UserSchema.methods.hashPassword = async function (raw: string): Promise<void> {
  const hash = await bcrypt.hash(raw, SALT_ROUNDS);
  this.passwordHash = hash;
};

UserSchema.methods.verifyPassword = async function (raw: string): Promise<boolean> {
  return bcrypt.compare(raw, this.passwordHash);
};

UserSchema.methods.createAccessToken = function (): string {
  const accessToken = uuidv4();
  this.accessToken = accessToken 
  return uuidv4()
};

UserSchema.methods.verifyAccessToken = function (token: string): boolean {
  return Boolean(this.accessToken === token)
};

export const UserModel = model("User", UserSchema);
