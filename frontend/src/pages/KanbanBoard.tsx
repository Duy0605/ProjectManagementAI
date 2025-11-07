import React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, AlertCircle, Plus } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import type { Task } from "../types";
import clsx from "clsx";

const columns = [
    { id: "todo", title: "To Do", color: "bg-slate-100", count: 0 },
    { id: "in-progress", title: "In Progress", color: "bg-blue-100", count: 0 },
    { id: "review", title: "Review", color: "bg-amber-100", count: 0 },
    { id: "done", title: "Done", color: "bg-emerald-100", count: 0 },
];

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const priorityColors = {
        low: "border-l-slate-400",
        medium: "border-l-amber-400",
        high: "border-l-orange-400",
        critical: "border-l-red-400",
    };

    const isOverdue = new Date(task.dueDate) < new Date();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                "bg-white p-4 rounded-lg shadow-sm border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                priorityColors[task.priority],
                isDragging && "rotate-3 shadow-xl opacity-50"
            )}
        >
            <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-medium leading-tight text-slate-800">
                    {task.title}
                </h4>
                {isOverdue && (
                    <AlertCircle className="flex-shrink-0 w-4 h-4 ml-2 text-red-500" />
                )}
            </div>

            <p className="mb-3 text-xs text-slate-600 line-clamp-2">
                {task.description}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    {task.assignee && (
                        <>
                            <img
                                src={
                                    task.assignee.avatar ||
                                    "https://via.placeholder.com/24"
                                }
                                alt={task.assignee.name || "Unassigned"}
                                className="object-cover w-6 h-6 rounded-full"
                            />
                            <span className="text-xs text-slate-600">
                                {task.assignee.name}
                            </span>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span
                        className={clsx(
                            "text-xs",
                            isOverdue
                                ? "text-red-500 font-medium"
                                : "text-slate-500"
                        )}
                    >
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

const Column: React.FC<{ column: any; tasks: Task[] }> = ({
    column,
    tasks,
}) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div className="flex-1 min-w-80">
            <div
                className={`${column.color} p-4 rounded-t-xl border-b border-slate-200`}
            >
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                        {column.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs font-medium bg-white rounded-full text-slate-600">
                            {tasks.length}
                        </span>
                        <button className="p-1 transition-colors rounded hover:bg-white hover:bg-opacity-50">
                            <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>

            <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    ref={setNodeRef}
                    className="p-4 space-y-3 min-h-96 bg-slate-50 rounded-b-xl"
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}

                    {tasks.length === 0 && (
                        <div className="py-8 text-center">
                            <div className="text-sm text-slate-400">
                                No tasks yet
                            </div>
                            <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                                + Add a task
                            </button>
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
};

export const KanbanBoard: React.FC = () => {
    const { tasks, setTasks } = useAppContext();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Task["status"];

        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );

        setTasks(updatedTasks);
    };

    const getTasksByStatus = (status: string) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Board</h1>
                    <p className="text-slate-600">
                        Drag and drop tasks to update their status
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <select className="px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All Projects</option>
                        <option>E-Commerce Platform</option>
                        <option>Mobile App Redesign</option>
                    </select>

                    <button className="px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                        <Plus className="inline w-4 h-4 mr-2" />
                        New Task
                    </button>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="flex pb-6 space-x-6 overflow-x-auto">
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={getTasksByStatus(column.id)}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};
