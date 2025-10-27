const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Notification must have a recipient"],
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        content: {
            type: String,
            required: [true, "Notification content is required"],
            trim: true,
            maxlength: [
                500,
                "Notification content cannot exceed 500 characters",
            ],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: [
                "TaskAssigned",
                "TaskUpdated",
                "TaskDeadline",
                "ProjectUpdate",
                "MessageReceived",
                "MemberAdded",
                "AINotification",
                "System",
            ],
            required: [true, "Notification type is required"],
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
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ projectId: 1 });
notificationSchema.index({ taskId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });

// Compound index for user's unread notifications
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

// Virtual for user details
notificationSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});

// Virtual for project details
notificationSchema.virtual("project", {
    ref: "Project",
    localField: "projectId",
    foreignField: "_id",
    justOne: true,
});

// Virtual for task details
notificationSchema.virtual("task", {
    ref: "Task",
    localField: "taskId",
    foreignField: "_id",
    justOne: true,
});

// Static method to find notifications by user
notificationSchema.statics.findByUser = function (
    userId,
    limit = 50,
    unreadOnly = false
) {
    const query = { userId };
    if (unreadOnly) query.isRead = false;

    return this.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("projectId", "name")
        .populate("taskId", "title");
};

// Static method to count unread notifications
notificationSchema.statics.countUnread = function (userId) {
    return this.countDocuments({ userId, isRead: false });
};

// Static method to mark as read
notificationSchema.statics.markAsRead = function (notificationIds) {
    return this.updateMany(
        { _id: { $in: notificationIds } },
        { $set: { isRead: true } }
    );
};

// Static method to mark all as read for user
notificationSchema.statics.markAllAsRead = function (userId) {
    return this.updateMany(
        { userId, isRead: false },
        { $set: { isRead: true } }
    );
};

// Static method to delete old notifications
notificationSchema.statics.deleteOld = function (daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    return this.deleteMany({
        createdAt: { $lt: cutoffDate },
        isRead: true,
    });
};

// Static method to create notification
notificationSchema.statics.createNotification = async function (data) {
    const notification = await this.create(data);
    // TODO: Emit socket event for realtime notification
    return notification;
};

// Method to mark single notification as read
notificationSchema.methods.markRead = function () {
    this.isRead = true;
    return this.save();
};

module.exports = mongoose.model("Notification", notificationSchema);
