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
    }
}