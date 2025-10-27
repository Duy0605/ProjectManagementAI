const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

// Import database connection
const connectDB = require("../config/database");

// Import routes
const authRoutes = require("./routes/auth.routes");

const app = express();
const server = createServer(app);

// Connect to MongoDB
connectDB();

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(
    helmet({
        contentSecurityPolicy: false, // Disable CSP để cho phép inline scripts trong test HTML
    })
);
app.use(
    cors({
        origin: "*", // Cho phép tất cả origins để test
        credentials: true,
    })
);
app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Project Management AI Assistant API",
        version: "1.0.0",
        status: "running",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// Serve test HTML page
app.get("/test-register", (req, res) => {
    res.sendFile(path.join(__dirname, "../test-register.html"));
});

// Database test route
app.get("/api/test-db", async (req, res) => {
    try {
        const { User, Project, Task } = require("./models");

        const [userCount, projectCount, taskCount] = await Promise.all([
            User.countDocuments(),
            Project.countDocuments(),
            Task.countDocuments(),
        ]);

        res.json({
            status: "Database connected",
            collections: {
                users: userCount,
                projects: projectCount,
                tasks: taskCount,
            },
            message: "✅ Database is working!",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});

// API Routes
app.use("/api/auth", authRoutes);

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "production" ? {} : err.message,
    });
});

// 404 handler - FIX: Thay đổi từ '*' thành catch-all
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.path,
        method: req.method,
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API docs: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = { app, server, io };
