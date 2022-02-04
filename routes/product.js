const router = require("express").Router();
const {
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const { createProduct, updateProduct, deleteProduct, getProduct, getProducts } = require("../controllers/productController");

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

// UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET
router.get("/find/:id", getProduct);

//GET ALL
router.get("/", getProducts);

module.exports = router;
