const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/auth.middleware");
const { upload } = require("../../config/cloudinary");

// PUT /api/users/profile - Cập nhật profile người dùng (cần token)
router.put("/profile", authMiddleware, UserController.updateProfile);

// POST /api/users/avatar - Upload avatar (cần token)
router.post(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    UserController.uploadAvatar
);

module.exports = router;
