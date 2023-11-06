const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../utils/catchAsyncError");
const APIFeatures = require("../../utils/apiFeatures");
const productModel = require("./product.model");
const { readFile } = require('fs');

// Create a new document
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.create(req.body);
  res.status(201).json({ product });
});

// Get all documents
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  // await (new Promise((resolve, reject) => {
  //   readFile('src/product/product.json', (err, data) => {
  //     if (err)
  //       reject(err);
  //     resolve(JSON.parse(data));
  //   });
  // }));

  console.log({ qry: req.query });
  const productsCount = await productModel.countDocuments();

  const apiFeature = new APIFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  const filteredProductsCount = products.length;
  apiFeature.pagination();

  products = await apiFeature.query.clone();
  res.status(200).json({
    products,
    productsCount,
    filteredProductsCount,
  });
});

// Get a single document by ID
exports.getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({ product });
});

// Update a document by ID
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  res.status(200).json({ product });
});

// Delete a document by ID
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await productModel.findById(id);

  if (!product)
    return next(new ErrorHandler("Product not found", 404));

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted successfully.",
  });
});
