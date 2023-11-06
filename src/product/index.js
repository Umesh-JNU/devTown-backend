const productModel = require("./product.model");
const { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require("./product.controller");
const productRoute = require("./product.route");

module.exports = { productModel, createProduct, getAllProduct, getProduct, updateProduct, deleteProduct, productRoute };
