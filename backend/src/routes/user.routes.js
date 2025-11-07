const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/auth.middleware");

// PUT /api/users/profile - Cập nhật profile người dùng (cần token)
router.put("/profile", authMiddleware, UserController.updateProfile);

module.exports = router;
