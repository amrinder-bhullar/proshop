import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc fetch all the products in db has search in it and pagination
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc the param has an id and it returns a single product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc create a product from Admin
// @route POST /api/products/
// @access Private Admin

const createProduct = asyncHandler(async (req, res) => {
  // const user = req.user._id;
  // const { name, description, brand, category, price, countInStock } = req.body;
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, category, price, countInStock, image } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      user: req.user._id,
      comment,
      rating: Number(rating),
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Get top rated products
// @route GET /api/products/top/:id
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const excludeProduct = req.params.id; // exclude this id when looking from top products
  const products = await Product.find({ _id: { $ne: excludeProduct } })
    .sort({ rating: -1 })
    .limit(4);
  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
