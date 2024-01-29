import { Document, Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";

export interface IShortUrl extends Document {
  _id: string;
  fullUrl: string;
  shortUrl: string;
  clicks?: string;
}

const shortUrlSchema = new Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      default: () => nanoid().substring(0, 10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const shortUrl = models.shortUrl || model("shortUrl", shortUrlSchema);

export default shortUrl;
