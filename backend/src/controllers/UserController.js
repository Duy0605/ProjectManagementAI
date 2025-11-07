const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const emailService = require("../services/emailService");

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
            console.log("\n🔔 LOGIN REQUEST RECEIVED");
            console.log("📦 Request Body:", req.body);

            const { email, password } = req.body;

            // Validate
            if (!email || !password) {
                console.log("❌ Validation failed: Missing email or password");
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập email và mật khẩu",
                });
            }

            console.log("🔍 Looking for user:", email.toLowerCase());

            // Tìm user (phải select passwordHash vì mặc định nó bị ẩn)
            const user = await User.findOne({
                email: email.toLowerCase(),
            }).select("+passwordHash");
            if (!user) {
                console.log("❌ User not found");
                return res.status(401).json({
                    success: false,
                    message: "Email hoặc mật khẩu không đúng",
                });
            }

            console.log("✅ User found:", user.email);
            console.log("🔑 Comparing password...");

            // Kiểm tra password
            const isPasswordValid = await bcrypt.compare(
                password,
                user.passwordHash
            );

            console.log("🔐 Password valid:", isPasswordValid);

            if (!isPasswordValid) {
                console.log("❌ Password incorrect");
                return res.status(401).json({
                    success: false,
                    message: "Email hoặc mật khẩu không đúng",
                });
            }

            console.log("✅ Login successful!");

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
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                        bio: user.bio,
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

    /**
     * Quên mật khẩu - Gửi email reset
     * POST /api/auth/forgot-password
     */
    async forgotPassword(req, res) {
        try {
            console.log("\n🔔 FORGOT PASSWORD REQUEST");
            const { email } = req.body;

            // Validate email
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập email",
                });
            }

            // Tìm user
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                // Không nói user không tồn tại (bảo mật)
                return res.status(200).json({
                    success: true,
                    message:
                        "Nếu email tồn tại, chúng tôi đã gửi link reset password.",
                });
            }

            // Tạo reset token (random string)
            const resetToken = crypto.randomBytes(32).toString("hex");

            // Hash token trước khi lưu vào database
            const hashedToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

            // Lưu token vào database (expires sau 1 giờ)
            user.resetPasswordToken = hashedToken;
            user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
            await user.save();

            console.log("✅ Reset token created for:", email);

            // Gửi email
            try {
                await emailService.sendPasswordResetEmail(
                    user.email,
                    resetToken, // Gửi token gốc (chưa hash) qua email
                    user.name
                );

                console.log("✅ Reset email sent successfully");

                return res.status(200).json({
                    success: true,
                    message:
                        "Email reset password đã được gửi! Vui lòng kiểm tra hộp thư.",
                });
            } catch (emailError) {
                // Nếu gửi email lỗi, xóa token
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                await user.save();

                console.error("❌ Email send failed:", emailError);

                return res.status(500).json({
                    success: false,
                    message: "Không thể gửi email. Vui lòng thử lại sau.",
                });
            }
        } catch (error) {
            console.error("❌ Forgot Password Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }

    /**
     * Reset mật khẩu - Đặt mật khẩu mới
     * POST /api/auth/reset-password
     */
    async resetPassword(req, res) {
        try {
            console.log("\n🔔 RESET PASSWORD REQUEST");
            const { token, newPassword, confirmPassword } = req.body;

            // Validate
            if (!token || !newPassword || !confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng điền đầy đủ thông tin",
                });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Mật khẩu xác nhận không khớp",
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                });
            }

            // Hash token từ URL để so sánh
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            // Tìm user với token và chưa hết hạn
            const user = await User.findOne({
                resetPasswordToken: hashedToken,
                resetPasswordExpires: { $gt: Date.now() }, // Chưa hết hạn
            }).select(
                "+resetPasswordToken +resetPasswordExpires +passwordHash"
            );

            if (!user) {
                console.log("❌ Token not found or expired");
                console.log(
                    "   Hashed token:",
                    hashedToken.substring(0, 20) + "..."
                );
                return res.status(400).json({
                    success: false,
                    message:
                        "Link đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng",
                });
            }

            console.log("✅ Valid token for:", user.email);
            console.log(
                "   Token expires:",
                new Date(user.resetPasswordExpires).toLocaleString("vi-VN")
            );

            // Hash password mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Cập nhật password và xóa token
            user.passwordHash = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            console.log("✅ Password reset successfully for:", user.email);
            console.log("🗑️  Token đã bị xóa - link không thể dùng lại!");

            return res.status(200).json({
                success: true,
                message:
                    "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.",
            });
        } catch (error) {
            console.error("❌ Reset Password Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }

    /**
     * Cập nhật profile người dùng
     * PUT /api/users/profile
     */
    async updateProfile(req, res) {
        try {
            console.log("\n🔔 UPDATE PROFILE REQUEST");
            const userId = req.user.userId; // Lấy từ authMiddleware
            const { name, email, bio } = req.body;

            // Tìm user
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy người dùng",
                });
            }

            // Cập nhật thông tin
            if (name) user.name = name;
            if (email) {
                // Kiểm tra email đã tồn tại chưa
                const existingUser = await User.findOne({
                    email: email.toLowerCase(),
                    _id: { $ne: userId },
                });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: "Email đã được sử dụng",
                    });
                }
                user.email = email.toLowerCase();
            }
            if (bio !== undefined) user.bio = bio;

            await user.save();

            console.log("✅ Profile updated for:", user.email);

            return res.status(200).json({
                success: true,
                message: "Cập nhật profile thành công",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    bio: user.bio,
                },
            });
        } catch (error) {
            console.error("❌ Update Profile Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }

    /**
     * Upload avatar
     * POST /api/users/avatar
     */
    async uploadAvatar(req, res) {
        try {
            console.log("\n🔔 UPLOAD AVATAR REQUEST");
            const userId = req.user.userId;

            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng chọn ảnh để upload",
                });
            }

            console.log("📁 File uploaded:", req.file.filename);
            console.log("🔗 Cloudinary URL:", req.file.path);

            // Update user avatar with Cloudinary URL
            const user = await User.findByIdAndUpdate(
                userId,
                { avatar: req.file.path }, // Cloudinary URL
                { new: true }
            ).select("-passwordHash");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy người dùng",
                });
            }

            console.log("✅ Avatar updated successfully");

            return res.status(200).json({
                success: true,
                message: "Upload avatar thành công",
                data: {
                    avatar: user.avatar,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        bio: user.bio,
                    },
                },
            });
        } catch (error) {
            console.error("❌ Upload Avatar Error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server, vui lòng thử lại sau",
            });
        }
    }
}

module.exports = new UserController();
