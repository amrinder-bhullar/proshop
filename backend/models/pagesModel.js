import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema(
  {
    title: String,
    url: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
    },
    display: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pagesSchema);

export default Page;
