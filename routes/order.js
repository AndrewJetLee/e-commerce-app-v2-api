const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders } = require("../controllers/orderController");

//CREATE
router.post("/", verifyToken, createOrder);

// UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

// DELETE
router.delete("/:id", verifyTokenAndAdmin,deleteOrder);

//GET USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

//GET ALL
router.get("/", verifyTokenAndAdmin, getAllOrders);

module.exports = router;
