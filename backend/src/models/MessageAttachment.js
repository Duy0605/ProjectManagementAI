const mongoose = require("mongoose");

const messageAttachmentSchema = new mongoose.Schema(
    {
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: [true, "Attachment must belong to a message"],
        },
        fileUrl: {
            type: String,
            required: [true, "File URL is required"],
            trim: true,
        },
        fileType: {
            type: String,
            enum: ["Image", "Document", "File", "Video", "Audio"],
            required: [true, "File type is required"],
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
messageAttachmentSchema.index({ messageId: 1 });
messageAttachmentSchema.index({ fileType: 1 });
messageAttachmentSchema.index({ createdAt: -1 });

// Virtual for message details
messageAttachmentSchema.virtual("message", {
    ref: "Message",
    localField: "messageId",
    foreignField: "_id",
    justOne: true,
});

// Static method to find attachments by message
messageAttachmentSchema.statics.findByMessage = function (messageId) {
    return this.find({ messageId }).sort({ createdAt: 1 });
};

// Static method to find attachments by type
messageAttachmentSchema.statics.findByType = function (fileType, limit = 20) {
    return this.find({ fileType })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("messageId", "content projectId");
};

// Static method to count attachments by message
messageAttachmentSchema.statics.countByMessage = function (messageId) {
    return this.countDocuments({ messageId });
};

// Method to check if attachment is image
messageAttachmentSchema.methods.isImage = function () {
    return this.fileType === "Image";
};

// Method to check if attachment is document
messageAttachmentSchema.methods.isDocument = function () {
    return this.fileType === "Document" || this.fileType === "File";
};

// Method to check if attachment is media
messageAttachmentSchema.methods.isMedia = function () {
    return this.fileType === "Video" || this.fileType === "Audio";
};

// Method to get file extension from URL
messageAttachmentSchema.methods.getFileExtension = function () {
    const url = this.fileUrl;
    return url.split(".").pop().toLowerCase();
};

module.exports = mongoose.model("MessageAttachment", messageAttachmentSchema);
