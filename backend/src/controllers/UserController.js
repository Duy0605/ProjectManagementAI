const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * UserController - Xử lý các chức năng liên quan đến User
 */
class UserController {
    /**
     * Đăng ký user mới
     * POST /api/auth/register
     */
    async register(req, res) {
        try {
            console.log("\n🔔 REGISTER REQUEST RECEIVED");
            console.log("📦 Request Body:", req.body);

            // Bước 1: Lấy dữ liệu từ request body
            const { name, email, password, confirmPassword } = req.body;

            // Bước 2: Validate dữ liệu đầu vào
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng điền đầy đủ thông tin",
                    errors: {
                        name: !name ? "Tên không được để trống" : null,
                        email: !email ? "Email không được để trống" : null,
                        password: !password
                            ? "Mật khẩu không được để trống"
                            : null,
                        confirmPassword: !confirmPassword
                            ? "Xác nhận mật khẩu không được để trống"
                            : null,
                    },
                });
            }

            // Bước 3: Kiểm tra email hợp lệ
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Email không hợp lệ",
                });
            }

            // Bước 4: Kiểm tra độ dài mật khẩu
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                });
            }

            // Bước 5: Kiểm tra password và confirmPassword khớp nhau
            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Mật khẩu xác nhận không khớp",
                });
            }

            // Bước 6: Kiểm tra email đã tồn tại chưa
            const existingUser = await User.findOne({
                email: email.toLowerCase(),
            });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email này đã được sử dụng",
                });
            }

            // Bước 7: Hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Bước 8: Tạo user mới trong database
            console.log("💾 Creating user in database...");
            const newUser = await User.create({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                passwordHash: hashedPassword,
                role: "member", // Mặc định là member
            });
            console.log("✅ User created successfully:", newUser._id);

            // Bước 9: Tạo JWT token
            console.log("🔑 Generating JWT token...");
            const token = jwt.sign(
                {
                    userId: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                },
                process.env.JWT_SECRET || "your-secret-key",
                { expiresIn: "7d" } // Token hết hạn sau 7 ngày
            );

            // Bước 10: Trả về response thành công
            console.log("✅ Registration completed successfully!");
            console.log("📧 Email:", newUser.email);
            console.log("🎫 Token generated\n");

            return res.status(201).json({
                success: true,
                message: "Đăng ký thành công!",
                data: {
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                        avatar: newUser.avatar,
                        createdAt: newUser.createdAt,
                    },
                    token: token,
                },
            });
        } catch (error) {
            console.error("❌ Register Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
                error:
                    process.env.NODE_ENV === "development"
                        ? error.message
                        : undefined,
            });
        }
    }

    /**
     * Đăng nhập
     * POST /api/auth/login
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập email và mật khẩu",
                });
            }

            // Tìm user
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Email hoặc mật khẩu không đúng",
                });
            }

            // Kiểm tra password
            const isPasswordValid = await bcrypt.compare(
                password,
                user.passwordHash
            );
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Email hoặc mật khẩu không đúng",
                });
            }

            // Tạo token
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET || "your-secret-key",
                { expiresIn: "7d" }
            );

            // Trả về response
            return res.status(200).json({
                success: true,
                message: "Đăng nhập thành công!",
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                    },
                    token: token,
                },
            });
        } catch (error) {
            console.error("❌ Login Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }

    /**
     * Lấy thông tin user hiện tại (từ token)
     * GET /api/auth/me
     */
    async getMe(req, res) {
        try {
            // req.user được set bởi auth middleware
            const user = await User.findById(req.user.userId).select(
                "-passwordHash"
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy user",
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                        createdAt: user.createdAt,
                    },
                },
            });
        } catch (error) {
            console.error("❌ GetMe Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }
}

module.exports = new UserController();
