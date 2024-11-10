import { Model, Schema, model } from "mongoose";

export interface IUrl {
  fullUrl: string;
  shortUrl: string;
  activatedAt: Date;
  deactivatedAt: Date;
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
  activatedAt: {
    type: Date,
    required: true,
  },
  deactivatedAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const UrlModel = model("Url", UrlSchema);
