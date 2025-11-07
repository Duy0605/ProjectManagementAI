import React, { useState, useEffect } from "react";
import { Camera, Edit3, Save, Loader2 } from "lucide-react";
import { userApi } from "../services/api";
import { useAppContext } from "../contexts/AppContext";
import { getAvatarUrl } from "../utils/avatar";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    bio?: string;
}

export const Profile: React.FC = () => {
    const { setCurrentUser, currentUser, refreshUser } = useAppContext();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: "",
    });

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userApi.getMe();
            const userData = response.data.user;
            setUser(userData);
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                bio: userData.bio || "",
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load profile"
            );
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await userApi.updateProfile(formData);
            await fetchUserProfile(); // Refresh data

            // Update global context để Header và Sidebar cập nhật
            if (currentUser) {
                setCurrentUser({
                    ...currentUser,
                    name: formData.name,
                    email: formData.email,
                });
            }

            alert("Profile updated successfully!");
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Vui lòng chọn file ảnh!");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Kích thước ảnh phải nhỏ hơn 5MB!");
            return;
        }

        try {
            setUploading(true);
            const response = await userApi.uploadAvatar(file);

            // Update user state with new avatar
            if (response.success && response.data) {
                setUser((prev) =>
                    prev ? { ...prev, avatar: response.data.avatar } : null
                );

                // Refresh user data in context
                await refreshUser();

                alert("Upload avatar thành công!");
            }
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Failed to upload avatar"
            );
        } finally {
            setUploading(false);
        }
    };

    if (loading && !user) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-slate-200">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchUserProfile}
                        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                <h2 className="mb-6 text-2xl font-bold text-slate-800">
                    Profile Information
                </h2>

                <div className="flex items-center mb-6 space-x-6">
                    <div className="relative">
                        <img
                            src={getAvatarUrl(user?.avatar)}
                            alt={user?.name}
                            className="object-cover w-20 h-20 rounded-full"
                        />
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Camera className="w-4 h-4" />
                            )}
                        </label>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-slate-800">
                            {user?.name}
                        </h4>
                        <p className="capitalize text-slate-600">
                            {user?.role}
                        </p>
                        <label
                            htmlFor="avatar-upload"
                            className="flex items-center mt-2 space-x-1 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700"
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>Change Photo</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end pt-6 mt-8 space-x-3 border-t border-slate-200">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center px-6 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
