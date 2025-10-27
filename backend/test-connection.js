require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
    console.log("\n🔍 Testing MongoDB Connection...\n");
    console.log("═".repeat(60));

    try {
        console.log("📍 Connection String:", process.env.MONGODB_URI);
        console.log("\n⏳ Connecting to MongoDB...");

        // Kết nối MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Successfully connected to MongoDB!");
        console.log("\n📊 Connection Details:");
        console.log("   Host:", mongoose.connection.host);
        console.log("   Database:", mongoose.connection.name);
        console.log("   Port:", mongoose.connection.port);
        console.log(
            "   Ready State:",
            mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
        );

        // Lấy danh sách collections (nếu có)
        console.log("\n📁 Checking existing collections...");
        const collections = await mongoose.connection.db
            .listCollections()
            .toArray();

        if (collections.length === 0) {
            console.log("   ℹ️  Database is empty (no collections yet)");
            console.log(
                "   💡 Collections will be created automatically when you insert data"
            );
        } else {
            console.log(`   Found ${collections.length} collection(s):`);
            collections.forEach((col) => {
                console.log(`      - ${col.name}`);
            });
        }

        console.log("\n" + "═".repeat(60));
        console.log("✅ MongoDB is ready! You can now run your application.\n");

        // Đóng kết nối
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Connection Error:");
        console.error("   Message:", error.message);

        if (error.message.includes("ECONNREFUSED")) {
            console.error("\n💡 Troubleshooting:");
            console.error("   1. Make sure MongoDB is running:");
            console.error("      Windows: net start MongoDB");
            console.error("      macOS: brew services start mongodb-community");
            console.error("      Linux: sudo systemctl start mongodb");
            console.error(
                "\n   2. Check if MongoDB is listening on port 27017"
            );
            console.error("   3. Try: mongosh (to test MongoDB shell)");
        }

        if (error.message.includes("authentication")) {
            console.error("\n💡 Authentication Issue:");
            console.error("   Check your MONGODB_URI credentials in .env file");
        }

        console.log("\n" + "═".repeat(60));
        process.exit(1);
    }
}

// Run the test
testConnection();
