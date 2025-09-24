export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "pm" | "member" | "guest";
    skills?: string[];
    isOnline?: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed" | "on-hold" | "cancelled";
    members: User[];
    progress: number;
    startDate: string;
    endDate: string;
    priority: "low" | "medium" | "high" | "critical";
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "critical";
    assignee: User;
    projectId: string;
    dueDate: string;
    tags: string[];
    subtasks?: Task[];
    attachments?: string[];
    estimatedHours?: number;
    actualHours?: number;
}

export interface Sprint {
    id: string;
    name: string;
    projectId: string;
    startDate: string;
    endDate: string;
    status: "planning" | "active" | "completed";
    tasks: Task[];
    goal: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    sender: User | "ai";
    timestamp: string;
    taskId?: string;
    isAI?: boolean;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
    isRead: boolean;
    actionUrl?: string;
}
