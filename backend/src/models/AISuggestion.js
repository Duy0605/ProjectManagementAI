const mongoose = require("mongoose");

const aiSuggestionSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "AI suggestion must belong to a project"],
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        type: {
            type: String,
            enum: [
                "TaskSplit",
                "ProgressPrediction",
                "RiskAlert",
                "ResourceOptimization",
                "DeadlineWarning",
                "WorkloadBalance",
            ],
            required: [true, "Suggestion type is required"],
        },
        content: {
            type: String,
            required: [true, "Suggestion content is required"],
            trim: true,
            maxlength: [
                2000,
                "Suggestion content cannot exceed 2000 characters",
            ],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for performance
aiSuggestionSchema.index({ projectId: 1, createdAt: -1 });
aiSuggestionSchema.index({ taskId: 1 });
aiSuggestionSchema.index({ type: 1 });
aiSuggestionSchema.index({ createdAt: -1 });

// Compound index for project suggestions by type
aiSuggestionSchema.index({ projectId: 1, type: 1, createdAt: -1 });

// Virtual for project details
aiSuggestionSchema.virtual("project", {
    ref: "Project",
    localField: "projectId",
    foreignField: "_id",
    justOne: true,
});

// Virtual for task details
aiSuggestionSchema.virtual("task", {
    ref: "Task",
    localField: "taskId",
    foreignField: "_id",
    justOne: true,
});

// Static method to find suggestions by project
aiSuggestionSchema.statics.findByProject = function (projectId, limit = 20) {
    return this.find({ projectId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("taskId", "title status priority");
};

// Static method to find suggestions by type
aiSuggestionSchema.statics.findByType = function (projectId, type, limit = 10) {
    return this.find({ projectId, type })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("taskId", "title status");
};

// Static method to find recent suggestions
aiSuggestionSchema.statics.findRecent = function (projectId, hours = 24) {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hours);

    return this.find({
        projectId,
        createdAt: { $gte: cutoffDate },
    })
        .sort({ createdAt: -1 })
        .populate("taskId", "title");
};

// Static method to count suggestions by type
aiSuggestionSchema.statics.countByType = async function (projectId) {
    return await this.aggregate([
        { $match: { projectId: mongoose.Types.ObjectId(projectId) } },
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 },
            },
        },
    ]);
};

// Static method to create AI suggestion
aiSuggestionSchema.statics.createSuggestion = async function (data) {
    const suggestion = await this.create(data);

    // Create notification for project members
    // TODO: Implement notification creation

    return suggestion;
};

// Method to check if suggestion is critical
aiSuggestionSchema.methods.isCritical = function () {
    return this.type === "RiskAlert" || this.type === "DeadlineWarning";
};

// Method to check if suggestion is about optimization
aiSuggestionSchema.methods.isOptimization = function () {
    return (
        this.type === "ResourceOptimization" || this.type === "WorkloadBalance"
    );
};

module.exports = mongoose.model("AISuggestion", aiSuggestionSchema);
