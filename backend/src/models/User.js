const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email",
            ],
        },
        passwordHash: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // Don't return password by default
        },
        avatar: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        role: {
            type: String,
            enum: ["admin", "manager", "member"],
            default: "member",
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
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for projects (user is owner or member)
userSchema.virtual("projects", {
    ref: "Project",
    localField: "_id",
    foreignField: "members.userId",
});

// Virtual for owned projects
userSchema.virtual("ownedProjects", {
    ref: "Project",
    localField: "_id",
    foreignField: "members.userId",
    match: { "members.role": "Owner" },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

// Update updatedAt on save
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Remove password from JSON response
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.passwordHash;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("User", userSchema);
