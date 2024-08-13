import { Model, Schema, model } from "mongoose";

interface IModel {
  sessionToken: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type TokenModel = Model<IModel, {}>;

const TokenSchema = new Schema<IModel, TokenModel>({
    sessionToken: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
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

export const TokenModel = model("Token", TokenSchema);
