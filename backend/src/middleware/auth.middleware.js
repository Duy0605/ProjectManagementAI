const jwt = require("jsonwebtoken");

/**
 * Middleware xác thực JWT token
 * Kiểm tra token trong header Authorization
 */
const authMiddleware = (req, res, next) => {
    try {
        // Bước 1: Lấy token từ header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Không tìm thấy token xác thực",
            });
        }

        // Bước 2: Token có format: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token không hợp lệ",
            });
        }

        // Bước 3: Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your-secret-key"
        );

        // Bước 4: Lưu thông tin user vào request
        req.user = decoded;

        // Bước 5: Cho phép request tiếp tục
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Token không hợp lệ",
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token đã hết hạn, vui lòng đăng nhập lại",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Lỗi xác thực",
        });
    }
};

/**
 * Middleware kiểm tra quyền admin
 */
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Bạn không có quyền truy cập",
        });
    }
    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};
