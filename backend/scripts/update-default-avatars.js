/**
 * Script to update old default avatars to new one
 * Run with: node scripts/update-default-avatars.js
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../src/models/User");

const NEW_DEFAULT_AVATAR =
    "https://aic.com.vn/wp-content/uploads/2024/10/avatar-fb-mac-dinh-2.jpg";

async function updateAvatars() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        // Find all users with old placeholder avatar
        const result = await User.updateMany(
            {
                $or: [
                    { avatar: { $regex: /via\.placeholder\.com/ } },
                    { avatar: { $regex: /data:image\/svg\+xml/ } },
                    { avatar: "https://via.placeholder.com/150" },
                ],
            },
            {
                $set: { avatar: NEW_DEFAULT_AVATAR },
            }
        );

        console.log(
            `✅ Updated ${result.modifiedCount} users with new default avatar`
        );
        console.log(`📊 Total matched: ${result.matchedCount}`);

        // Also update users with empty or null avatar
        const emptyResult = await User.updateMany(
            {
                $or: [
                    { avatar: null },
                    { avatar: "" },
                    { avatar: { $exists: false } },
                ],
            },
            {
                $set: { avatar: NEW_DEFAULT_AVATAR },
            }
        );

        console.log(
            `✅ Updated ${emptyResult.modifiedCount} users with empty avatar`
        );

        await mongoose.connection.close();
        console.log("✅ Done! Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

updateAvatars();
