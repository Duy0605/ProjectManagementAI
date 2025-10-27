const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Message must belong to a project"],
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Message must have a sender"],
        },
        content: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
            maxlength: [5000, "Message cannot exceed 5000 characters"],
        },
        type: {
            type: String,
            enum: ["Text", "Media", "File"],
            default: "Text",
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
messageSchema.index({ projectId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ createdAt: -1 });

// Virtual for sender details
messageSchema.virtual("sender", {
    ref: "User",
    localField: "senderId",
    foreignField: "_id",
    justOne: true,
});

// Virtual for project details
messageSchema.virtual("project", {
    ref: "Project",
    localField: "projectId",
    foreignField: "_id",
    justOne: true,
});

// Virtual for attachments
messageSchema.virtual("attachments", {
    ref: "MessageAttachment",
    localField: "_id",
    foreignField: "messageId",
});

// Static method to find messages by project
messageSchema.statics.findByProject = function (
    projectId,
    limit = 50,
    skip = 0
) {
    return this.find({ projectId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .populate("senderId", "name avatar");
};

// Static method to search messages
messageSchema.statics.searchMessages = function (projectId, searchText) {
    return this.find({
        projectId,
        content: { $regex: searchText, $options: "i" },
    })
        .sort({ createdAt: -1 })
        .populate("senderId", "name avatar");
};

// Static method to count messages by project
messageSchema.statics.countByProject = function (projectId) {
    return this.countDocuments({ projectId });
};

// Static method to get recent messages
messageSchema.statics.getRecent = function (projectId, limit = 10) {
    return this.find({ projectId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("senderId", "name avatar");
};

// Method to check if message has attachments
messageSchema.methods.hasAttachments = function () {
    return this.type === "File" || this.type === "Media";
};

module.exports = mongoose.model("Message", messageSchema);
