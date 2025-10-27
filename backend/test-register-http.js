/**
 * Test Register API with HTTP module
 * Chạy lệnh: node test-register-http.js
 */

const http = require("http");

const testRegister = () => {
    console.log("🧪 Testing Register API...\n");

    // Test data
    const userData = JSON.stringify({
        name: "Nguyen Van Test",
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
    });

    const options = {
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/register",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": userData.length,
        },
    };

    console.log(
        "📤 Sending request to: http://localhost:5000/api/auth/register"
    );
    console.log("📦 Data:", userData);
    console.log("\n⏳ Waiting for response...\n");

    const req = http.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            console.log("═══════════════════════════════════════════");
            console.log(`📊 Status: ${res.statusCode} ${res.statusMessage}`);
            console.log("═══════════════════════════════════════════");

            try {
                const result = JSON.parse(data);

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
            } catch (error) {
                console.log("❌ Parse Error:", error.message);
                console.log("Raw Response:", data);
            }

            console.log("\n═══════════════════════════════════════════");
        });
    });

    req.on("error", (error) => {
        console.error("❌ Request Error:", error.message);
    });

    req.write(userData);
    req.end();
};

// Chạy test
testRegister();
