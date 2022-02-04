const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const Cart = require("../models/Cart");
const { addToCart } = require("../controllers/cartController");

//CREATE
router.post("/", verifyToken, addToCart);

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.productId) {
    try {
      const updatedCart = await Cart.findOneAndUpdate({
        userId: req.params.id,
        "products.productId": req.body.productId
      }, {
        $set: {
          "products.$.quantity": req.body.quantity,
        }
      });
      const queryCart = await Cart.findOne({ userId: req.params.id });
      res.status(200).json({ ...queryCart._doc });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.params.id },
        { $set: req.body },
        { new: true }
      );
      const queryCart = await Cart.findOne({ userId: req.params.id });
      res.status(200).json({ ...queryCart._doc });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json("Successfully deleted product");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
