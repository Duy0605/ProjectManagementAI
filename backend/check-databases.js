const mongoose = require("mongoose");
require("dotenv").config();

async function checkDatabases() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Connected to MongoDB\n");

        // Get admin database
        const admin = mongoose.connection.db.admin();

        // List all databases
        const { databases } = await admin.listDatabases();

        console.log("📊 ALL DATABASES:");
        console.log("═══════════════════════════════════════════");
        databases.forEach((db) => {
            console.log(`📁 ${db.name}`);
            console.log(
                `   Size: ${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB`
            );
            console.log(`   Empty: ${db.empty ? "Yes" : "No"}`);
            console.log("");
        });

        // Check current database
        console.log("═══════════════════════════════════════════");
        console.log(
            "🎯 CURRENT DATABASE:",
            mongoose.connection.db.databaseName
        );

        // List collections in current database
        const collections = await mongoose.connection.db
            .listCollections()
            .toArray();

        console.log("📁 COLLECTIONS:", collections.length);
        if (collections.length > 0) {
            collections.forEach((col) => {
                console.log(`   - ${col.name}`);
            });
        } else {
            console.log("   ⚠️  No collections found (database is empty)");
        }

        // Get document counts
        if (collections.length > 0) {
            console.log("\n📊 DOCUMENT COUNTS:");
            console.log("═══════════════════════════════════════════");
            for (const col of collections) {
                const count = await mongoose.connection.db
                    .collection(col.name)
                    .countDocuments();
                console.log(`   ${col.name}: ${count} documents`);
            }
        }

        await mongoose.disconnect();
        console.log("\n✅ Done!");
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

checkDatabases();
