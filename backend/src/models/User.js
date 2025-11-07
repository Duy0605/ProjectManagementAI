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
            default:
                "https://aic.com.vn/wp-content/uploads/2024/10/avatar-fb-mac-dinh-2.jpg",
        },
        bio: {
            type: String,
            trim: true,
            maxlength: [500, "Bio cannot exceed 500 characters"],
            default: "",
        },
        role: {
            type: String,
            enum: ["admin", "manager", "member"],
            default: "member",
        },
        resetPasswordToken: {
            type: String,
            select: false, // Không trả về mặc định
        },
        resetPasswordExpires: {
            type: Date,
            select: false, // Không trả về mặc định
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

// ⚠️ KHÔNG hash password ở đây vì Controller đã hash rồi!
// Hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("passwordHash")) {
//         return next();
//     }
//
//     const salt = await bcrypt.genSalt(10);
//     this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//     next();
// });

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
