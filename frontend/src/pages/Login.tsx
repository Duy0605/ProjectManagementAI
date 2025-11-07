import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bot, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { refreshUser } = useAppContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Gọi API backend để đăng nhập
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            // Kiểm tra response có thành công không
            if (!response.ok) {
                // Nếu lỗi, hiển thị thông báo lỗi từ server
                setError(data.message || "Đăng nhập thất bại");
                return;
            }

            // Đăng nhập thành công
            if (data.success && data.data) {
                // Lưu token vào localStorage
                localStorage.setItem("token", data.data.token);

                // Lưu thông tin user vào localStorage
                localStorage.setItem("user", JSON.stringify(data.data.user));

                console.log("✅ Đăng nhập thành công:", data.data.user);

                // Refresh user data trong AppContext
                await refreshUser();

                // Chuyển hướng đến trang Dashboard
                navigate("/dashboard");
            } else {
                setError("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("❌ Lỗi khi đăng nhập:", err);
            setError(
                "Không thể kết nối đến server. Vui lòng kiểm tra kết nối."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-blue-500/20 blur-3xl animate-pulse" />
                <div className="absolute delay-1000 rounded-full -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Login Card */}
                <div className="p-8 bg-white border shadow-2xl rounded-2xl border-slate-200">
                    {/* Logo & Title */}
                    <div className="mb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-slate-800">
                            Welcome back
                        </h1>
                        <p className="text-slate-600">
                            Sign in to your ProjectAI account
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center p-4 mb-6 space-x-2 border border-red-200 rounded-lg bg-red-50">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-slate-700"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full py-3 pl-10 pr-4 transition-all duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full py-3 pl-10 pr-12 transition-all duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center px-4 py-2 space-x-2 transition-all duration-200 border rounded-lg border-slate-300 hover:bg-slate-50 hover:border-slate-400">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-slate-700">
                                Google
                            </span>
                        </button>

                        <button className="flex items-center justify-center px-4 py-2 space-x-2 transition-all duration-200 border rounded-lg border-slate-300 hover:bg-slate-50 hover:border-slate-400">
                            <svg
                                className="w-5 h-5"
                                fill="#1877F2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-sm font-medium text-slate-700">
                                Facebook
                            </span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                            >
                                Sign up for free
                            </Link>
                        </p>
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
