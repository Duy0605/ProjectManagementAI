/**
 * MongoDB Helper - View users with Vietnam timezone
 * Chạy: node view-users-vn.js
 */

const { User } = require("./src/models");
const mongoose = require("mongoose");
require("dotenv").config();

async function viewUsersVN() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const users = await User.find()
            .select("-passwordHash")
            .sort({ createdAt: -1 });

        console.log("\n📊 DANH SÁCH USERS (Múi giờ Việt Nam)");
        console.log(
            "═══════════════════════════════════════════════════════════\n"
        );

        const table = users.map((user, index) => {
            const createdVN = new Date(user.createdAt).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });

            return {
                "#": index + 1,
                Name: user.name.substring(0, 25),
                Email: user.email.substring(0, 30),
                Role: user.role,
                "Created (VN)": createdVN,
            };
        });

        console.table(table);

        console.log(`\n✅ Total: ${users.length} users`);
        console.log("📅 Timezone: Asia/Ho_Chi_Minh (GMT+7)");
        console.log(
            "═══════════════════════════════════════════════════════════\n"
        );

        await mongoose.disconnect();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

viewUsersVN();
