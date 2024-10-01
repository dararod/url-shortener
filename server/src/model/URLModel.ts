import { Model, Schema, model } from "mongoose";

export interface IUrl {
  fullUrl: string;
  shortUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

type UrlModel = Model<IUrl, {}>;

const UrlSchema = new Schema<IUrl, UrlModel>({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
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

export const UrlModel = model("Url", UrlSchema);
