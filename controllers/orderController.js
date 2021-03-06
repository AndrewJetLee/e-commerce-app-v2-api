const Order = require("../models/Order");

module.exports = {
  createOrder: async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Successfully deleted order");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserOrder: async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
  },
  getAllOrders: async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
  }
};
