import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type {
    User,
    Project,
    Task,
    Sprint,
    ChatMessage,
    Notification,
} from "../types";

interface AppContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    sprints: Sprint[];
    setSprints: (sprints: Sprint[]) => void;
    messages: ChatMessage[];
    setMessages: (messages: ChatMessage[]) => void;
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>({
        id: "1",
        name: "Duy",
        email: "john@example.com",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        role: "pm",
        skills: ["React", "Node.js", "Project Management"],
        isOnline: true,
    });

    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            name: "E-Commerce Platform",
            description:
                "Building a modern e-commerce platform with AI recommendations",
            status: "active",
            members: [],
            progress: 68,
            startDate: "2024-01-15",
            endDate: "2024-06-15",
            priority: "high",
        },
        {
            id: "2",
            name: "Mobile App Redesign",
            description: "Complete UI/UX redesign of mobile application",
            status: "active",
            members: [],
            progress: 32,
            startDate: "2024-02-01",
            endDate: "2024-08-01",
            priority: "medium",
        },
    ]);

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Design user authentication flow",
            description:
                "Create wireframes and mockups for login/register process",
            status: "in-progress",
            priority: "high",
            assignee: currentUser!,
            projectId: "1",
            dueDate: "2024-03-15",
            tags: ["frontend", "design"],
            estimatedHours: 16,
            actualHours: 8,
        },
        {
            id: "2",
            title: "Implement payment gateway",
            description: "Integrate Stripe payment processing",
            status: "todo",
            priority: "critical",
            assignee: currentUser!,
            projectId: "1",
            dueDate: "2024-03-20",
            tags: ["backend", "payment"],
            estimatedHours: 24,
        },
    ]);

    const [sprints, setSprints] = useState<Sprint[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Task Assignment",
            message:
                "You have been assigned a new task: Design user authentication flow",
            type: "info",
            timestamp: "2024-03-10T10:30:00Z",
            isRead: false,
        },
    ]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                projects,
                setProjects,
                tasks,
                setTasks,
                sprints,
                setSprints,
                messages,
                setMessages,
                notifications,
                setNotifications,
                sidebarOpen,
                setSidebarOpen,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
