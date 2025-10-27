// Quick test register API
const http = require("http");

const testData = JSON.stringify({
    name: "Direct Test User",
    email: `test${Date.now()}@example.com`,
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
        "Content-Length": testData.length,
    },
};

console.log("🧪 Testing Register API...\n");
console.log("📤 URL: http://localhost:5000/api/auth/register");
console.log("📦 Data:", testData);
console.log("\n⏳ Waiting...\n");

const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        console.log("═══════════════════════════════════════════");
        console.log(`📊 Status: ${res.statusCode}`);
        console.log("═══════════════════════════════════════════\n");

        try {
            const result = JSON.parse(data);

            if (result.success) {
                console.log("✅ SUCCESS!\n");
                console.log("👤 User:", result.data.user.name);
                console.log("📧 Email:", result.data.user.email);
                console.log("🆔 ID:", result.data.user.id);
                console.log(
                    "🎫 Token:",
                    result.data.token.substring(0, 50) + "..."
                );
                console.log("\n💡 Now run: node list-users.js");
            } else {
                console.log("❌ FAILED!\n");
                console.log(JSON.stringify(result, null, 2));
            }
        } catch (error) {
            console.log("❌ Parse Error:", error.message);
            console.log("Raw:", data);
        }

        console.log("\n═══════════════════════════════════════════");
    });
});

req.on("error", (error) => {
    console.error("❌ Error:", error.message);
    console.log("\n💡 Make sure server is running: npm run dev");
});

req.write(testData);
req.end();
