const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const Cart = require("../models/Cart");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  // find cart w/ userId
  try {
    let userId = req.user.id;
    const userCart = await Cart.findOne({ userId });
    if (userCart) {
      await Cart.updateOne(
        { userId },
        {
          $push: { products: { ...req.body } },
        },
        { new: true }
      );
      const updatedCart = await Cart.findOne({userId});
      res.status(200).json(updatedCart);
    } else {
      const savedCart = await Cart.create({
        userId,
        products: [
          {
            ...req.body,
          },
        ],
      });
      res.status(200).json(savedCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // const queryCart = await Cart.find({ id: req.params.id });
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    const queryCart = await Cart.findOne({ id: req.params.id });
    res.status(200).json({ ...queryCart._doc});
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  debugger;
  try {
    debugger;
    await Cart.findOneAndDelete({userId: req.params.id});
    res.status(200).json("Successfully deleted product");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
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
