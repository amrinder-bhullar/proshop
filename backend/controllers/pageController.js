import asyncHandler from "../middleware/asyncHandler.js";
import Page from "../models/pagesModel.js";

// @desc create new Page
// @route POST /api/pages
// @access Private/Admin

const addPage = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const page = new Page({
    title,
    content,
  });

  const pageCreated = await page.save();
  res.status(201).json({ message: "page created" });
});

// @desc get all pages
// @route GET /api/pages
// @access Public

const getPages = asyncHandler(async (req, res) => {
  const pages = await Page.find({});
  res.status(200).json(pages);
});

const getPageById = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);
  if (page) {
    res.status(200).json(page);
  } else {
    res.status(404);
    throw new Error("Page not found");
  }
});

const updatePage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);
  console.log(req.body.display, "display");
  if (page) {
    page.title = req.body.title || page.title;
    page.content = req.body.content || page.content;
    page.display = req.body.display;

    console.log(page.display, "display stored in page");

    const updatedPage = await page.save();

    res.status(201).json({ message: "page updated" });
  } else {
    res.status(404);
    throw new Error("Page not found");
  }
});
export { addPage, getPages, getPageById, updatePage };
