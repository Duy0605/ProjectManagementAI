const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Helper function for API calls with auth
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API call failed");
    }

    return response.json();
};

// User API
export const userApi = {
    // Get current user profile
    getMe: async () => {
        return apiCall("/api/auth/me");
    },

    // Update user profile
    updateProfile: async (data: {
        name?: string;
        email?: string;
        bio?: string;
    }) => {
        return apiCall("/api/users/profile", {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    // Upload avatar
    uploadAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);

        const token = getAuthToken();
        const response = await fetch(`${API_URL}/api/users/avatar`, {
            method: "POST",
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: formData, // Don't set Content-Type, browser will set it automatically with boundary
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Upload failed");
        }

        return response.json();
    },
};

// Auth API
export const authApi = {
    login: async (email: string, password: string) => {
        return apiCall("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },

    register: async (name: string, email: string, password: string) => {
        return apiCall("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        });
    },
};
