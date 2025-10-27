const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a project name"],
            trim: true,
            maxlength: [200, "Project name cannot exceed 200 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Active", "Completed", "Paused", "Archived"],
            default: "Active",
        },
        isEnabled: {
            type: Boolean,
            default: true,
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
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ "members.userId": 1 });

// Virtual for project members (from projectMember collection)
projectSchema.virtual("members", {
    ref: "ProjectMember",
    localField: "_id",
    foreignField: "projectMemberId.projectId",
});

// Virtual for tasks
projectSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "projectId",
});

// Virtual for messages
projectSchema.virtual("messages", {
    ref: "Message",
    localField: "_id",
    foreignField: "projectId",
});

// Virtual for notifications
projectSchema.virtual("notifications", {
    ref: "Notification",
    localField: "_id",
    foreignField: "projectId",
});

// Virtual for AI suggestions
projectSchema.virtual("aiSuggestions", {
    ref: "AISuggestion",
    localField: "_id",
    foreignField: "projectId",
});

// Pre-save middleware
projectSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Method to check if project is active
projectSchema.methods.isActive = function () {
    return this.status === "Active" && this.isEnabled;
};

// Method to check if project is overdue
projectSchema.methods.isOverdue = function () {
    return (
        this.endDate && new Date() > this.endDate && this.status !== "Completed"
    );
};

// Static method to find active projects
projectSchema.statics.findActive = function () {
    return this.find({ status: "Active", isEnabled: true });
};

module.exports = mongoose.model("Project", projectSchema);
