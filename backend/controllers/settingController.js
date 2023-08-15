import asyncHandler from "../middleware/asyncHandler.js";
import Setting from "../models/adminSettingsModel.js";

// @desc fetch all the settings in db
// @route GET /api/settings
// @access Public
const getSettings = asyncHandler(async (req, res) => {
  res.json("hit get settings");
});

// @desc fetch all the settings in db
// @route GET /api/settings/slider/
// @access Public
const getSlides = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne({});
  res.status(200).json(settings.slider.slides);
});

// @desc Add slide to slider's settings
// @route POST /api/settings/slider
// @access Public
const addSlide = asyncHandler(async (req, res) => {
  const slide = {
    text: req.body.text,
    image: req.body.image,
    url: req.body.url,
  };
  const currentSetting = await Setting.findOne({});
  currentSetting.slider.slides.push(slide);
  const updatedSettings = await currentSetting.save();

  res.status(201).json({ message: "slide added" });
});

// @desc Add slide to slider's settings
// @route POST /api/settings/slider
// @access Public
const deleteSlide = asyncHandler(async (req, res) => {
  const slideId = req.params.id;
  console.log(slideId);
  const updatedSlider = await Setting.findOneAndUpdate(
    {},
    { $pull: { "slider.slides": { _id: slideId } } }
  );

  res.status(201).json({ message: "slide deleted" });
});

const updateSlide = asyncHandler(async (req, res) => {
  const slideId = req.params.id;
  const updatedSlide = {
    text: req.body.text,
    image: req.body.image,
    url: req.body.url,
    display: req.body.display,
  };
  const updatedSlider = await Setting.findOneAndUpdate(
    { "slider.slides._id": slideId },
    { $set: { "slider.slides.$": updatedSlide } }
  );
  res
    .status(201)
    .json({
      message: updatedSlide.display ? "Slide enabled" : "Slide disabled",
    });
});

export { getSettings, getSlides, addSlide, deleteSlide, updateSlide };
