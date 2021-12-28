const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const savedProduct = await Product.create(req.body);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
// Pass in the middleware!
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted product");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryKeyword = req.query.keyword;
  const queryCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else if (queryKeyword) {
      products = await Product.find({
        $or: [
          { title: { $regex: queryKeyword, $options: "i" } },
          { description: { $regex: queryKeyword, $options: "i" } },
        ],
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
