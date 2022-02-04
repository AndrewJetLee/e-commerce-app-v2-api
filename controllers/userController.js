const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString();
          }
          try {
            const updatedUser = await User.findOneAndUpdate(
              { id: req.params.id },
              { $set: req.body },
              { new: true }
            );
        
            res.status(200).json(updatedUser);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Successfully deleted user");
          } catch (err) {
            res.status(500).json(err);
          }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    getUsers: async (req, res) => {
        const query = req.query.new;
        try {
          const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json(err);
        }
    }
}