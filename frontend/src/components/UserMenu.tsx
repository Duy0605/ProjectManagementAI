import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Activity, Settings, LogOut } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right";
    anchorRef?: React.RefObject<HTMLElement | null>;
}

export const UserMenu: React.FC<UserMenuProps> = ({
    isOpen,
    onClose,
    position = "right",
    anchorRef,
}) => {
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const { currentUser, setCurrentUser } = useAppContext();

    // Convert username to URL-friendly format (lowercase, remove spaces)
    const username =
        currentUser?.name.toLowerCase().replace(/\s+/g, "") || "user";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                anchorRef?.current &&
                !anchorRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, anchorRef]);

    const menuItems = [
        {
            icon: User,
            label: "Profile",
            onClick: () => {
                navigate(`/${username}/profile`);
                onClose();
            },
        },
        {
            icon: Activity,
            label: "Recent Activity",
            onClick: () => {
                navigate(`/${username}/activity`);
                onClose();
            },
        },
        {
            icon: Settings,
            label: "Settings",
            onClick: () => {
                navigate(`/${username}/settings`);
                onClose();
            },
        },
        {
            icon: LogOut,
            label: "Logout",
            onClick: () => {
                // Clear localStorage and user state
                localStorage.clear();
                setCurrentUser(null);
                navigate("/login");
                onClose();
            },
            className: "text-red-600 hover:bg-red-50",
        },
    ];

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className={`absolute top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 ${
                position === "right" ? "right-0" : "left-0"
            }`}
        >
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                        item.className || "text-slate-700 hover:bg-slate-100"
                    }`}
                >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};
