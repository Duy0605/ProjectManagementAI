import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        // Validation
        if (!email) {
            setError("Please enter your email address");
            setLoading(false);
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        try {
            // TODO: Implement actual password reset logic
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Simulate successful request
            setSuccess(true);
        } catch (err) {
            setError("Failed to send reset link. Please try again.");
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
                {/* Forgot Password Card */}
                <div className="p-8 bg-white border shadow-2xl rounded-2xl border-slate-200">
                    {/* Back to Login Link */}
                    <Link
                        to="/login"
                        className="inline-flex items-center mb-6 space-x-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-800"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to login</span>
                    </Link>

                    {/* Logo & Title */}
                    <div className="mb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-slate-800">
                            Forgot password?
                        </h1>
                        <p className="text-slate-600">
                            No worries, we'll send you reset instructions
                        </p>
                    </div>

                    {!success ? (
                        <>
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center p-4 mb-6 space-x-2 border border-red-200 rounded-lg bg-red-50">
                                    <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600" />
                                    <p className="text-sm text-red-700">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Forgot Password Form */}
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
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError("");
                                            }}
                                            className="w-full py-3 pl-10 pr-4 transition-all duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
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
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success Message */
                        <div className="py-6">
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <h3 className="mb-2 text-xl font-semibold text-slate-800">
                                    Check your email
                                </h3>
                                <p className="text-slate-600">
                                    We sent a password reset link to
                                </p>
                                <p className="mt-1 font-medium text-slate-800">
                                    {email}
                                </p>
                            </div>
                            <div className="p-4 mb-6 border rounded-lg bg-blue-50 border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>Didn't receive the email?</strong>{" "}
                                    Check your spam folder or{" "}
                                    <button
                                        onClick={() => {
                                            setSuccess(false);
                                            setEmail("");
                                        }}
                                        className="font-medium underline hover:text-blue-900"
                                    >
                                        try another email address
                                    </button>
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="block w-full py-3 text-center text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}

                    {/* Sign Up Link */}
                    {!success && (
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
                    )}
                </div>

                {/* Footer */}
                <p className="mt-6 text-sm text-center text-slate-400">
                    © 2025 ProjectAI. All rights reserved.
                </p>
            </div>
        </div>
    );
};
