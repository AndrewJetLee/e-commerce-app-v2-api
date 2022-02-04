const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const Cart = require("../models/Cart");
const { addToCart, updateCart, deleteCart, getCart, getAllCart } = require("../controllers/cartController");

//CREATE
router.post("/", verifyToken, addToCart);

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, getCart);

// //GET ALL
router.get("/", verifyTokenAndAdmin, getAllCart);

module.exports = router;
