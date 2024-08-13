import bcrypt from 'bcrypt';
import { Model, Schema, model } from "mongoose";

const SALT_ROUNDS = 10;

interface IModel {
  sessionToken: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type TokenModel = Model<IModel, {}>;

const UserSchema = new Schema<IModel, TokenModel>({

});

export const UserModel = model("User", UserSchema);
