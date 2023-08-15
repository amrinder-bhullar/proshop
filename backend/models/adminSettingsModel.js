import mongoose from "mongoose";

const sliderSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  display: {
    type: Boolean,
    default: true,
  },
});

const settingsSchema = new mongoose.Schema({
  slider: {
    slides: [sliderSchema],
  },
  perPage: Number,
});

const Setting = new mongoose.model("Setting", settingsSchema);

export default Setting;
