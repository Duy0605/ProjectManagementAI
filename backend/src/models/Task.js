const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Task must belong to a project"],
        },
        title: {
            type: String,
            required: [true, "Please provide a task title"],
            trim: true,
            maxlength: [300, "Task title cannot exceed 300 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [5000, "Description cannot exceed 5000 characters"],
        },
        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium",
        },
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Review", "Done"],
            default: "To Do",
        },
        deadline: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for performance
taskSchema.index({ projectId: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ deadline: 1 });
taskSchema.index({ createdAt: -1 });

// Compound index for project tasks by status
taskSchema.index({ projectId: 1, status: 1 });

// Virtual for task assignments
taskSchema.virtual("assignments", {
    ref: "TaskAssignment",
    localField: "_id",
    foreignField: "taskAssignmentId.taskId",
});

// Virtual for project details
taskSchema.virtual("project", {
    ref: "Project",
    localField: "projectId",
    foreignField: "_id",
    justOne: true,
});

// Pre-save middleware
taskSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Method to check if task is overdue
taskSchema.methods.isOverdue = function () {
    return (
        this.deadline && new Date() > this.deadline && this.status !== "Done"
    );
};

// Method to check if task is completed
taskSchema.methods.isCompleted = function () {
    return this.status === "Done";
};

// Method to check if task is in progress
taskSchema.methods.isInProgress = function () {
    return this.status === "In Progress";
};

// Method to calculate remaining days
taskSchema.methods.remainingDays = function () {
    if (!this.deadline) return null;
    const now = new Date();
    const diff = this.deadline - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Static method to find tasks by project
taskSchema.statics.findByProject = function (projectId, status = null) {
    const query = { projectId };
    if (status) query.status = status;
    return this.find(query).sort({ createdAt: -1 });
};

// Static method to find overdue tasks
taskSchema.statics.findOverdue = function (projectId = null) {
    const query = {
        deadline: { $lt: new Date() },
        status: { $ne: "Done" },
    };
    if (projectId) query.projectId = projectId;
    return this.find(query).sort({ deadline: 1 });
};

// Static method to find high priority tasks
taskSchema.statics.findHighPriority = function (projectId = null) {
    const query = {
        priority: "High",
        status: { $ne: "Done" },
    };
    if (projectId) query.projectId = projectId;
    return this.find(query).sort({ deadline: 1 });
};

// Static method to get task statistics
taskSchema.statics.getStatistics = async function (projectId) {
    return await this.aggregate([
        { $match: { projectId: mongoose.Types.ObjectId(projectId) } },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);
};

module.exports = mongoose.model("Task", taskSchema);
