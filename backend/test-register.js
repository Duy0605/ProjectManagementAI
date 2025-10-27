/**
 * Test Register API
 * Chạy lệnh: node test-register.js
 */

const testRegister = async () => {
    try {
        console.log("🧪 Testing Register API...\n");

        // Test data
        const userData = {
            name: "Nguyen Van Test",
            email: "test@example.com",
            password: "123456",
            confirmPassword: "123456",
        };

        console.log(
            "📤 Sending request to: http://localhost:5000/api/auth/register"
        );
        console.log("📦 Data:", JSON.stringify(userData, null, 2));
        console.log("\n⏳ Waiting for response...\n");

        // Gửi request
        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const result = await response.json();

        console.log("═══════════════════════════════════════════");
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        console.log("═══════════════════════════════════════════");

        if (result.success) {
            console.log("✅ SUCCESS!");
            console.log("\n📦 Response Data:");
            console.log(JSON.stringify(result, null, 2));
            console.log("\n🎫 Token:", result.data.token);
            console.log("\n👤 User Info:");
            console.log(`   - ID: ${result.data.user.id}`);
            console.log(`   - Name: ${result.data.user.name}`);
            console.log(`   - Email: ${result.data.user.email}`);
            console.log(`   - Role: ${result.data.user.role}`);
        } else {
            console.log("❌ FAILED!");
            console.log("\n📦 Response:");
            console.log(JSON.stringify(result, null, 2));
        }

        console.log("\n═══════════════════════════════════════════");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

// Chạy test
testRegister();
