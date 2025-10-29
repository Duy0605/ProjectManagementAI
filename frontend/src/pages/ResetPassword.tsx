import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, Bot } from "lucide-react";

export const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        // Lấy token từ URL
        const tokenFromUrl = searchParams.get("token");
        if (!tokenFromUrl) {
            setError(
                "Token không hợp lệ. Vui lòng yêu cầu reset password lại."
            );
        } else {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (formData.newPassword.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            setLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: token,
                        newPassword: formData.newPassword,
                        confirmPassword: formData.confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
                return;
            }

            // Thành công
            setSuccess(true);

            // Sau 2 giây chuyển về trang login
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("❌ Error:", err);
            setError("Không thể kết nối đến server. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-blue-500/20 blur-3xl animate-pulse" />
                    <div className="absolute delay-1000 rounded-full -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="p-8 bg-white border shadow-2xl rounded-2xl border-slate-200">
                        <div className="mb-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h1 className="mb-2 text-2xl font-bold text-slate-800">
                                Password Reset Successfully!
                            </h1>
                            <p className="text-slate-600">
                                Mật khẩu của bạn đã được đặt lại thành công.
                            </p>
                            <p className="mt-4 text-sm text-slate-500">
                                Đang chuyển đến trang đăng nhập...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-blue-500/20 blur-3xl animate-pulse" />
                <div className="absolute delay-1000 rounded-full -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="p-8 bg-white border shadow-2xl rounded-2xl border-slate-200">
                    {/* Logo & Title */}
                    <div className="mb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-slate-800">
                            Reset Password
                        </h1>
                        <p className="text-slate-600">
                            Nhập mật khẩu mới cho tài khoản của bạn
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 mb-6 space-y-3 border border-red-200 rounded-lg bg-red-50">
                            <div className="flex items-start space-x-2">
                                <AlertCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-red-600" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-red-700">
                                        {error}
                                    </p>
                                    {error.includes("không hợp lệ") ||
                                    error.includes("đã được sử dụng") ? (
                                        <p className="mt-2 text-xs text-red-600">
                                            💡 Mỗi link chỉ sử dụng được 1 lần
                                            và có hiệu lực trong 1 giờ. Vui lòng{" "}
                                            <Link
                                                to="/forgot-password"
                                                className="font-medium underline hover:text-red-700"
                                            >
                                                yêu cầu link mới
                                            </Link>{" "}
                                            nếu cần đặt lại mật khẩu.
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reset Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password Input */}
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block mb-2 text-sm font-medium text-slate-700"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full py-3 pl-10 pr-12 transition-all duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute p-1 transform -translate-y-1/2 rounded-md right-3 top-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-slate-700"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full py-3 pl-10 pr-12 transition-all duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute p-1 transform -translate-y-1/2 rounded-md right-3 top-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                            <p className="text-xs font-medium text-blue-800">
                                Password requirements:
                            </p>
                            <ul className="mt-1 ml-4 space-y-1 text-xs list-disc text-blue-700">
                                <li>Ít nhất 6 ký tự</li>
                                <li>
                                    Nên có chữ hoa, chữ thường, số và ký tự đặc
                                    biệt
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full py-3 text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                    <span>Resetting...</span>
                                </div>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-sm text-center text-slate-400">
                    © 2025 ProjectAI. All rights reserved.
                </p>
            </div>
        </div>
    );
};
