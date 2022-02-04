const Cart = require("../models/Cart");

module.exports = {
    addToCart:  async (req, res) => {
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
              const updatedCart = await Cart.findOne({ userId });
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
    },
    updateCart: async (req, res) => {
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
    },
    deleteCart: async (req, res) => {
        try {
            await Cart.findOneAndDelete({ userId: req.params.id });
            res.status(200).json("Successfully deleted product");
          } catch (err) {
            res.status(500).json(err);
          }
    }, 
    getCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.id });
            res.status(200).json(cart);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    getAllCart: async (req, res) => {
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}