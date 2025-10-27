const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema(
    {
        taskAssignmentId: {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
                required: true,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
        assignedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Compound index for unique task-user assignment
taskAssignmentSchema.index(
    {
        "taskAssignmentId.taskId": 1,
        "taskAssignmentId.userId": 1,
    },
    {
        unique: true,
    }
);

// Index for querying by task
taskAssignmentSchema.index({ "taskAssignmentId.taskId": 1 });

// Index for querying by user
taskAssignmentSchema.index({ "taskAssignmentId.userId": 1 });

// Virtual to populate task details
taskAssignmentSchema.virtual("task", {
    ref: "Task",
    localField: "taskAssignmentId.taskId",
    foreignField: "_id",
    justOne: true,
});

// Virtual to populate user details
taskAssignmentSchema.virtual("user", {
    ref: "User",
    localField: "taskAssignmentId.userId",
    foreignField: "_id",
    justOne: true,
});

// Static method to find assignments by task
taskAssignmentSchema.statics.findByTask = function (taskId) {
    return this.find({ "taskAssignmentId.taskId": taskId }).populate(
        "taskAssignmentId.userId",
        "name email avatar"
    );
};

// Static method to find assignments by user
taskAssignmentSchema.statics.findByUser = function (userId) {
    return this.find({ "taskAssignmentId.userId": userId }).populate({
        path: "taskAssignmentId.taskId",
        populate: {
            path: "projectId",
            select: "name status",
        },
    });
};

// Static method to check if user is assigned to task
taskAssignmentSchema.statics.isAssigned = async function (taskId, userId) {
    const assignment = await this.findOne({
        "taskAssignmentId.taskId": taskId,
        "taskAssignmentId.userId": userId,
    });
    return !!assignment;
};

// Static method to get user's tasks by status
taskAssignmentSchema.statics.getUserTasksByStatus = async function (
    userId,
    status
) {
    return await this.find({ "taskAssignmentId.userId": userId }).populate({
        path: "taskAssignmentId.taskId",
        match: { status: status },
        populate: { path: "projectId", select: "name" },
    });
};

// Static method to count user's tasks
taskAssignmentSchema.statics.countUserTasks = async function (
    userId,
    status = null
) {
    const match = { "taskAssignmentId.userId": userId };

    const result = await this.aggregate([
        { $match: match },
        {
            $lookup: {
                from: "tasks",
                localField: "taskAssignmentId.taskId",
                foreignField: "_id",
                as: "task",
            },
        },
        { $unwind: "$task" },
        ...(status ? [{ $match: { "task.status": status } }] : []),
        { $count: "total" },
    ]);

    return result.length > 0 ? result[0].total : 0;
};

module.exports = mongoose.model("TaskAssignment", taskAssignmentSchema);
