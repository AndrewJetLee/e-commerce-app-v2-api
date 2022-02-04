const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");
const { updateUser, deleteUser, getUser, getUsers } = require("../controllers/userController");

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//GET ALL
router.get("/", verifyTokenAndAdmin, getUsers);

module.exports = router;
