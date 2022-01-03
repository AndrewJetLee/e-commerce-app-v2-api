const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1,
            }, 
            price: {
              type: Number,
            },
            color: {
              type: String
            },
            size: {
              type: String
            }
        }
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
