const { User } = require("./src/models");
const mongoose = require("mongoose");
require("dotenv").config();

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB\n");

        const users = await User.find()
            .select("-passwordHash")
            .sort({ createdAt: -1 });

        console.log("═══════════════════════════════════════════");
        console.log(`📊 TOTAL USERS: ${users.length}`);
        console.log("═══════════════════════════════════════════\n");

        users.forEach((user, index) => {
            console.log(`${index + 1}. 👤 ${user.name}`);
            console.log(`   📧 Email: ${user.email}`);
            console.log(`   🎭 Role: ${user.role}`);
            console.log(`   🆔 ID: ${user._id}`);
            console.log(
                `   📅 Created: ${new Date(user.createdAt).toLocaleString(
                    "vi-VN",
                    {
                        timeZone: "Asia/Ho_Chi_Minh",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }
                )}`
            );
            console.log("");
        });

        console.log("═══════════════════════════════════════════");

        await mongoose.disconnect();
        console.log("\n✅ Done!");
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

listUsers();
