const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/auth.middleware");

/**
 * Auth Routes
 * Base URL: /api/auth
 */

// POST /api/auth/register - Đăng ký
router.post("/register", UserController.register);

// POST /api/auth/login - Đăng nhập
router.post("/login", UserController.login);

// POST /api/auth/forgot-password - Quên mật khẩu (gửi email)
router.post("/forgot-password", UserController.forgotPassword);

// POST /api/auth/reset-password - Reset mật khẩu
router.post("/reset-password", UserController.resetPassword);

// GET /api/auth/me - Lấy thông tin user hiện tại (cần token)
router.get("/me", authMiddleware, UserController.getMe);

module.exports = router;
