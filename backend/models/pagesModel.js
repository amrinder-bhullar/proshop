import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema(
  {
    title: String,
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
