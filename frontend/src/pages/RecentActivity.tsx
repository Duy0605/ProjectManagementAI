import React from "react";
import {
    Activity,
    CheckCircle2,
    Circle,
    FolderKanban,
    MessageSquare,
    UserPlus,
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export const RecentActivity: React.FC = () => {
    const { currentUser } = useAppContext();

    // Sample activity data - replace with real data from API
    const activities = [
        {
            id: 1,
            type: "task_completed",
            message: 'Completed task "Design new landing page"',
            project: "Website Redesign",
            time: "2 hours ago",
            icon: CheckCircle2,
            color: "text-green-600",
            bgColor: "bg-green-50",
            user: currentUser?.name,
        },
        {
            id: 2,
            type: "project_joined",
            message: 'Joined project "Mobile App Redesign"',
            project: "Mobile App Redesign",
            time: "5 hours ago",
            icon: FolderKanban,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            user: currentUser?.name,
        },
        {
            id: 3,
            type: "task_created",
            message: 'Created task "Update documentation"',
            project: "Documentation",
            time: "1 day ago",
            icon: Circle,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            user: currentUser?.name,
        },
        {
            id: 4,
            type: "comment_added",
            message: 'Added a comment on "Code review"',
            project: "Backend Development",
            time: "1 day ago",
            icon: MessageSquare,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            user: currentUser?.name,
        },
        {
            id: 5,
            type: "task_assigned",
            message: 'Assigned to task "Code review"',
            project: "Backend Development",
            time: "2 days ago",
            icon: UserPlus,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            user: currentUser?.name,
        },
        {
            id: 6,
            type: "task_completed",
            message: 'Completed task "Bug fixes for login page"',
            project: "Website Redesign",
            time: "3 days ago",
            icon: CheckCircle2,
            color: "text-green-600",
            bgColor: "bg-green-50",
            user: currentUser?.name,
        },
        {
            id: 7,
            type: "task_created",
            message: 'Created task "Setup CI/CD pipeline"',
            project: "DevOps",
            time: "4 days ago",
            icon: Circle,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            user: currentUser?.name,
        },
        {
            id: 8,
            type: "project_joined",
            message: 'Joined project "E-commerce Platform"',
            project: "E-commerce Platform",
            time: "5 days ago",
            icon: FolderKanban,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            user: currentUser?.name,
        },
    ];

    const groupedActivities = {
        today: activities.filter((a) => a.time.includes("hour")),
        yesterday: activities.filter((a) => a.time.includes("1 day")),
        thisWeek: activities.filter(
            (a) => a.time.includes("day") && !a.time.includes("1 day")
        ),
    };

    const renderActivityGroup = (title: string, items: typeof activities) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-8">
                <h3 className="mb-4 text-sm font-semibold text-slate-500 uppercase">
                    {title}
                </h3>
                <div className="space-y-3">
                    {items.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors bg-white"
                        >
                            <div
                                className={`p-2 rounded-lg ${activity.bgColor}`}
                            >
                                <activity.icon
                                    className={`w-5 h-5 ${activity.color}`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800">
                                    {activity.message}
                                </p>
                                <div className="flex items-center mt-1 space-x-2 text-xs text-slate-500">
                                    <span>{activity.project}</span>
                                    <span>•</span>
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="flex items-center text-2xl font-bold text-slate-800">
                    <Activity className="w-7 h-7 mr-2 text-purple-600" />
                    Recent Activity
                </h1>
                <p className="mt-2 text-slate-600">
                    Track your recent actions and updates
                </p>
            </div>

            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                {renderActivityGroup("Today", groupedActivities.today)}
                {renderActivityGroup("Yesterday", groupedActivities.yesterday)}
                {renderActivityGroup("This Week", groupedActivities.thisWeek)}

                {activities.length === 0 && (
                    <div className="py-12 text-center">
                        <Activity className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <p className="text-slate-500">No recent activity</p>
                    </div>
                )}
            </div>
        </div>
    );
};
