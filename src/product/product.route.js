const express = require("express");
const router = express.Router();
// const { auth } = require("../../middlewares/auth");
const { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require("./product.controller");

router.post("/create", createProduct);
router.get("/all", getAllProduct);
router.route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
