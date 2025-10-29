const nodemailer = require("nodemailer");

/**
 * Email Service - Gửi email reset password
 */
class EmailService {
    constructor() {
        // Tạo transporter - cấu hình để gửi email
        this.transporter = nodemailer.createTransport({
            service: "gmail", // Dùng Gmail
            auth: {
                user: process.env.EMAIL_USER, // Email của bạn
                pass: process.env.EMAIL_PASS, // App password của Gmail
            },
        });
    }

    /**
     * Gửi email reset password
     * @param {string} to - Email người nhận
     * @param {string} resetToken - Token để reset password
     * @param {string} userName - Tên người dùng
     */
    async sendPasswordResetEmail(to, resetToken, userName) {
        try {
            // URL reset password (frontend)
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

            // Nội dung email (HTML)
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 30px;
                            text-align: center;
                            border-radius: 10px 10px 0 0;
                        }
                        .content {
                            background: white;
                            padding: 30px;
                            border-radius: 0 0 10px 10px;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 30px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #666;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 Reset Your Password</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${userName},</p>
                            <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản ProjectAI của mình.</p>
                            <p>Nhấn vào nút bên dưới để tạo mật khẩu mới:</p>
                            <div style="text-align: center;">
                                <a href="${resetUrl}" class="button">Reset Password</a>
                            </div>
                            <p>Hoặc copy link này vào trình duyệt:</p>
                            <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">
                                ${resetUrl}
                            </p>
                            <p><strong>⚠️ Lưu ý:</strong></p>
                            <ul>
                                <li>Link này chỉ có hiệu lực trong <strong>1 giờ</strong></li>
                                <li>Nếu bạn không yêu cầu reset password, vui lòng bỏ qua email này</li>
                                <li>Không chia sẻ link này với bất kỳ ai</li>
                            </ul>
                        </div>
                        <div class="footer">
                            <p>© 2025 ProjectAI. All rights reserved.</p>
                            <p>Email này được gửi tự động, vui lòng không reply.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Gửi email
            const info = await this.transporter.sendMail({
                from: `"ProjectAI" <${process.env.EMAIL_USER}>`,
                to: to,
                subject: "🔐 Reset Your Password - ProjectAI",
                html: htmlContent,
            });

            console.log("✅ Email sent:", info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("❌ Error sending email:", error);
            throw new Error("Không thể gửi email. Vui lòng thử lại sau.");
        }
    }

    /**
     * Test email service
     */
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log("✅ Email service is ready");
            return true;
        } catch (error) {
            console.error("❌ Email service error:", error);
            return false;
        }
    }
}

module.exports = new EmailService();
