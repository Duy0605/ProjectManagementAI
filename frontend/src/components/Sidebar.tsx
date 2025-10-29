import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    MessageSquare,
    Users,
    Calendar,
    BarChart3,
    Settings,
    Bot,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import clsx from "clsx";

const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Board", href: "/dashboard/board", icon: Calendar },
    { name: "Team Chat", href: "/dashboard/chat", icon: MessageSquare },
    { name: "AI Assistant", href: "/dashboard/ai", icon: Bot },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
    const { sidebarOpen, setSidebarOpen, currentUser } = useAppContext();

    return (
        <div
            className={clsx(
                "bg-slate-900 transition-all duration-300 flex flex-col h-screen",
                sidebarOpen ? "w-64" : "w-16"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {sidebarOpen && (
                    <div className="flex items-center space-x-2">
                        <Bot className="w-8 h-8 text-blue-400" />
                        <h1 className="text-lg font-bold text-white">
                            ProjectAI
                        </h1>
                    </div>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="w-5 h-5" />
                    ) : (
                        <ChevronRight className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* User Profile */}
            {sidebarOpen && currentUser && (
                <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">
                                {currentUser.name}
                            </p>
                            <p className="text-sm capitalize text-slate-400">
                                {currentUser.role}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-2">
                <ul className="space-y-1">
                    {navigationItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.href}
                                end={item.href === "/dashboard"}
                                className={({ isActive }) =>
                                    clsx(
                                        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-slate-300 hover:text-white hover:bg-slate-700"
                                    )
                                }
                            >
                                <item.icon className="flex-shrink-0 w-5 h-5" />
                                {sidebarOpen && (
                                    <span className="ml-3">{item.name}</span>
                                )}
                                {!sidebarOpen && (
                                    <div className="absolute z-10 px-2 py-1 ml-2 text-xs text-white transition-opacity duration-200 rounded-lg opacity-0 pointer-events-none left-16 bg-slate-800 group-hover:opacity-100 whitespace-nowrap">
                                        {item.name}
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* AI Status */}
            <div className="p-4 border-t border-slate-700">
                <div
                    className={clsx(
                        "flex items-center",
                        sidebarOpen ? "space-x-3" : "justify-center"
                    )}
                >
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    {sidebarOpen && (
                        <span className="text-sm text-slate-400">
                            AI Assistant Online
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
