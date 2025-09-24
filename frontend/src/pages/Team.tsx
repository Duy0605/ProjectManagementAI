import React, { useState } from "react";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Award,
    TrendingUp,
    Clock,
    CheckCircle,
    Star,
    Shield,
    Edit,
    Trash2,
} from "lucide-react";
import type { User } from "../types";

const teamMembers: User[] = [
    {
        id: "1",
        name: "Duy",
        email: "duy@company.com",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "pm",
        skills: ["React", "Node.js", "Project Management", "Agile"],
        isOnline: true,
    },
    {
        id: "2",
        name: "Anh",
        email: "anh@company.com",
        avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "admin",
        skills: ["UI/UX Design", "Figma", "React", "TypeScript"],
        isOnline: true,
    },
    {
        id: "3",
        name: "Đức",
        email: "duc@company.com",
        avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "member",
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        isOnline: false,
    },
    {
        id: "4",
        name: "Minh",
        email: "minh@company.com",
        avatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "member",
        skills: ["React Native", "iOS", "Swift", "Flutter"],
        isOnline: true,
    },
    {
        id: "5",
        name: "Hiệp",
        email: "hiep@company.com",
        avatar: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "member",
        skills: ["DevOps", "AWS", "Kubernetes", "CI/CD"],
        isOnline: true,
    },
    {
        id: "6",
        name: "Phong",
        email: "phong@company.com",
        avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "guest",
        skills: ["QA Testing", "Selenium", "Manual Testing"],
        isOnline: false,
    },
];

const performanceData = [
    {
        id: "1",
        tasksCompleted: 28,
        hoursLogged: 156,
        efficiency: 94,
        rating: 4.8,
    },
    {
        id: "2",
        tasksCompleted: 32,
        hoursLogged: 148,
        efficiency: 96,
        rating: 4.9,
    },
    {
        id: "3",
        tasksCompleted: 22,
        hoursLogged: 138,
        efficiency: 85,
        rating: 4.2,
    },
    {
        id: "4",
        tasksCompleted: 26,
        hoursLogged: 142,
        efficiency: 92,
        rating: 4.6,
    },
    {
        id: "5",
        tasksCompleted: 24,
        hoursLogged: 160,
        efficiency: 88,
        rating: 4.4,
    },
    {
        id: "6",
        tasksCompleted: 18,
        hoursLogged: 120,
        efficiency: 82,
        rating: 4.1,
    },
];

export const Team: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredMembers = teamMembers.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterRole === "all" || member.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-700";
            case "pm":
                return "bg-blue-100 text-blue-700";
            case "member":
                return "bg-emerald-100 text-emerald-700";
            case "guest":
                return "bg-slate-100 text-slate-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin":
                return Shield;
            case "pm":
                return Award;
            case "member":
                return Users;
            case "guest":
                return Users;
            default:
                return Users;
        }
    };

    const getPerformanceData = (userId: string) => {
        return (
            performanceData.find((p) => p.id === userId) || {
                tasksCompleted: 0,
                hoursLogged: 0,
                efficiency: 0,
                rating: 0,
            }
        );
    };

    const getStatusColor = (isOnline: boolean) => {
        return isOnline ? "bg-emerald-500" : "bg-slate-400";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Team Management
                    </h1>
                    <p className="text-slate-600">
                        Manage team members, roles, and performance
                    </p>
                </div>

                <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Member</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                Total Members
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-800">
                                {teamMembers.length}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                Online Now
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-800">
                                {teamMembers.filter((m) => m.isOnline).length}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-100">
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                Avg. Efficiency
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-800">
                                89%
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-100">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                Active Projects
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-800">
                                8
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="p-4 bg-white border shadow-sm rounded-xl border-slate-200">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                    <div className="relative flex-1">
                        <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-10 pr-4 transition-colors border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Filter className="w-4 h-4 text-slate-500" />
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="pm">Project Manager</option>
                            <option value="member">Member</option>
                            <option value="guest">Guest</option>
                        </select>

                        <div className="flex items-center p-1 space-x-1 rounded-lg bg-slate-100">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-white shadow-sm"
                                        : "hover:bg-slate-200"
                                }`}
                            >
                                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                                    <div className="rounded-sm bg-slate-400"></div>
                                    <div className="rounded-sm bg-slate-400"></div>
                                    <div className="rounded-sm bg-slate-400"></div>
                                    <div className="rounded-sm bg-slate-400"></div>
                                </div>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === "list"
                                        ? "bg-white shadow-sm"
                                        : "hover:bg-slate-200"
                                }`}
                            >
                                <div className="flex flex-col w-4 h-4 space-y-1">
                                    <div className="bg-slate-400 h-0.5 rounded"></div>
                                    <div className="bg-slate-400 h-0.5 rounded"></div>
                                    <div className="bg-slate-400 h-0.5 rounded"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredMembers.map((member) => {
                        const performance = getPerformanceData(member.id);
                        const RoleIcon = getRoleIcon(member.role);

                        return (
                            <div
                                key={member.id}
                                className="p-6 transition-all duration-200 bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="object-cover w-12 h-12 rounded-full"
                                            />
                                            <div
                                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                                                    member.isOnline ?? false
                                                )}`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>

                                    <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
                                        <MoreVertical className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>

                                <div className="flex items-center mb-4 space-x-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(
                                            member.role
                                        )}`}
                                    >
                                        <RoleIcon className="w-3 h-3" />
                                        <span className="capitalize">
                                            {member.role}
                                        </span>
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3 fill-current text-amber-500" />
                                        <span className="text-xs text-slate-600">
                                            {performance.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center text-slate-600">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Tasks
                                        </span>
                                        <span className="font-medium text-slate-800">
                                            {performance.tasksCompleted}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center text-slate-600">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Hours
                                        </span>
                                        <span className="font-medium text-slate-800">
                                            {performance.hoursLogged}h
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">
                                            Efficiency
                                        </span>
                                        <span
                                            className={`font-medium ${
                                                performance.efficiency >= 90
                                                    ? "text-emerald-600"
                                                    : performance.efficiency >=
                                                      80
                                                    ? "text-amber-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {performance.efficiency}%
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="mb-2 text-xs text-slate-600">
                                        Skills
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {member.skills
                                            ?.slice(0, 3)
                                            .map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 text-xs text-blue-700 rounded-full bg-blue-50"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        {member.skills &&
                                            member.skills.length > 3 && (
                                                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                                                    +{member.skills.length - 3}
                                                </span>
                                            )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button className="flex-1 px-3 py-2 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                                        View Profile
                                    </button>
                                    <button className="p-2 transition-colors border rounded-lg border-slate-300 hover:bg-slate-50">
                                        <Mail className="w-4 h-4 text-slate-600" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-slate-50 border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Member
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Tasks
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Hours
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Efficiency
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Rating
                                    </th>
                                    <th className="px-6 py-4 text-sm font-medium text-left text-slate-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member) => {
                                    const performance = getPerformanceData(
                                        member.id
                                    );
                                    const RoleIcon = getRoleIcon(member.role);

                                    return (
                                        <tr
                                            key={member.id}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        <img
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="object-cover w-10 h-10 rounded-full"
                                                        />
                                                        <div
                                                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                                                                            member.isOnline ?? false
                                                                        )}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800">
                                                            {member.name}
                                                        </p>
                                                        <p className="text-sm text-slate-600">
                                                            {member.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getRoleColor(
                                                        member.role
                                                    )}`}
                                                >
                                                    <RoleIcon className="w-3 h-3" />
                                                    <span className="capitalize">
                                                        {member.role}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-800">
                                                {performance.tasksCompleted}
                                            </td>
                                            <td className="px-6 py-4 text-slate-800">
                                                {performance.hoursLogged}h
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`font-medium ${
                                                        performance.efficiency >=
                                                        90
                                                            ? "text-emerald-600"
                                                            : performance.efficiency >=
                                                              80
                                                            ? "text-amber-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {performance.efficiency}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4 fill-current text-amber-500" />
                                                    <span className="font-medium text-slate-800">
                                                        {performance.rating}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {filteredMembers.length === 0 && (
                <div className="p-12 text-center bg-white border rounded-xl border-slate-200">
                    <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <h3 className="mb-2 text-lg font-medium text-slate-800">
                        No team members found
                    </h3>
                    <p className="mb-6 text-slate-600">
                        {searchTerm || filterRole !== "all"
                            ? "Try adjusting your search or filters"
                            : "Start building your team by inviting members"}
                    </p>
                    <button className="px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                        <UserPlus className="inline w-4 h-4 mr-2" />
                        Invite Member
                    </button>
                </div>
            )}
        </div>
    );
};
