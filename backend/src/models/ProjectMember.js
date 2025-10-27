const mongoose = require("mongoose");

const projectMemberSchema = new mongoose.Schema(
    {
        projectMemberId: {
            projectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
                required: true,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
        role: {
            type: String,
            enum: ["Owner", "Member", "Guest"],
            default: "Member",
            required: true,
        },
        joinedAt: {
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

// Compound index for unique project-user combination
projectMemberSchema.index(
    {
        "projectMemberId.projectId": 1,
        "projectMemberId.userId": 1,
    },
    {
        unique: true,
    }
);

// Index for querying by project
projectMemberSchema.index({ "projectMemberId.projectId": 1 });

// Index for querying by user
projectMemberSchema.index({ "projectMemberId.userId": 1 });

// Index for role-based queries
projectMemberSchema.index({ role: 1 });

// Virtual to populate project details
projectMemberSchema.virtual("project", {
    ref: "Project",
    localField: "projectMemberId.projectId",
    foreignField: "_id",
    justOne: true,
});

// Virtual to populate user details
projectMemberSchema.virtual("user", {
    ref: "User",
    localField: "projectMemberId.userId",
    foreignField: "_id",
    justOne: true,
});

// Method to check if user is owner
projectMemberSchema.methods.isOwner = function () {
    return this.role === "Owner";
};

// Method to check if user is member or owner
projectMemberSchema.methods.canEdit = function () {
    return this.role === "Owner" || this.role === "Member";
};

// Static method to find members by project
projectMemberSchema.statics.findByProject = function (projectId) {
    return this.find({ "projectMemberId.projectId": projectId }).populate(
        "projectMemberId.userId",
        "name email avatar"
    );
};

// Static method to find projects by user
projectMemberSchema.statics.findByUser = function (userId) {
    return this.find({ "projectMemberId.userId": userId }).populate(
        "projectMemberId.projectId"
    );
};

// Static method to check if user is member of project
projectMemberSchema.statics.isMember = async function (projectId, userId) {
    const member = await this.findOne({
        "projectMemberId.projectId": projectId,
        "projectMemberId.userId": userId,
    });
    return !!member;
};

// Static method to get user role in project
projectMemberSchema.statics.getUserRole = async function (projectId, userId) {
    const member = await this.findOne({
        "projectMemberId.projectId": projectId,
        "projectMemberId.userId": userId,
    });
    return member ? member.role : null;
};

module.exports = mongoose.model("ProjectMember", projectMemberSchema);
