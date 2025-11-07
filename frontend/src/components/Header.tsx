import React, { useState, useRef } from "react";
import { Bell, Plus, MessageSquare } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { UserMenu } from "./UserMenu";
import { getAvatarUrl } from "../utils/avatar";

export const Header: React.FC = () => {
    const { notifications, currentUser, isLoadingUser } = useAppContext();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <header className="px-6 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center justify-end">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">
                        <Plus className="w-4 h-4" />
                        <span>New Task</span>
                    </button>

                    <button className="p-2 transition-colors duration-200 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100">
                        <MessageSquare className="w-5 h-5" />
                    </button>

                    <button className="relative p-2 transition-colors duration-200 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100">
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <div className="relative" ref={userMenuRef}>
                        {isLoadingUser ? (
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
                                <div className="hidden md:block">
                                    <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-1" />
                                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                        ) : currentUser ? (
                            <>
                                <div
                                    className="flex items-center space-x-3 transition-opacity cursor-pointer hover:opacity-80"
                                    onClick={() =>
                                        setIsUserMenuOpen(!isUserMenuOpen)
                                    }
                                >
                                    <img
                                        src={getAvatarUrl(currentUser.avatar)}
                                        alt={currentUser.name}
                                        className="object-cover w-8 h-8 rounded-full"
                                    />
                                    <div className="hidden md:block">
                                        <p className="text-sm font-medium text-slate-800">
                                            {currentUser.name}
                                        </p>
                                    </div>
                                </div>

                                <UserMenu
                                    isOpen={isUserMenuOpen}
                                    onClose={() => setIsUserMenuOpen(false)}
                                    position="right"
                                    anchorRef={userMenuRef}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
};
