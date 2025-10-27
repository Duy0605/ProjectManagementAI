require("dotenv").config();
const connectDB = require("./config/database");
const {
    User,
    Project,
    ProjectMember,
    Task,
    TaskAssignment,
    Message,
    Notification,
} = require("./src/models");

async function testDatabase() {
    try {
        // Kết nối DB
        await connectDB();

        console.log("\n🧪 Testing ProjectAI Database...\n");
        console.log("═".repeat(50));

        // 1. Tạo Users
        console.log("\n1️⃣ Creating users...");
        const users = await User.create([
            {
                name: "John Doe",
                email: "john@projectai.com",
                passwordHash: "password123",
                role: "manager",
            },
            {
                name: "Jane Smith",
                email: "jane@projectai.com",
                passwordHash: "password123",
                role: "member",
            },
            {
                name: "Bob Wilson",
                email: "bob@projectai.com",
                passwordHash: "password123",
                role: "member",
            },
        ]);
        console.log(`✅ Created ${users.length} users`);
        users.forEach((u) => console.log(`   - ${u.name} (${u.email})`));

        // 2. Tạo Project
        console.log("\n2️⃣ Creating project...");
        const project = await Project.create({
            name: "E-Commerce Platform",
            description:
                "Build a modern online shopping platform with AI features",
            startDate: new Date(),
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            status: "Active",
        });
        console.log(`✅ Project created: "${project.name}"`);
        console.log(`   Status: ${project.status}`);
        console.log(`   End Date: ${project.endDate.toLocaleDateString()}`);

        // 3. Thêm Members vào Project
        console.log("\n3️⃣ Adding members to project...");
        const members = await ProjectMember.create([
            {
                projectMemberId: {
                    projectId: project._id,
                    userId: users[0]._id,
                },
                role: "Owner",
            },
            {
                projectMemberId: {
                    projectId: project._id,
                    userId: users[1]._id,
                },
                role: "Member",
            },
            {
                projectMemberId: {
                    projectId: project._id,
                    userId: users[2]._id,
                },
                role: "Member",
            },
        ]);
        console.log(`✅ Added ${members.length} members to project`);

        // 4. Tạo Tasks
        console.log("\n4️⃣ Creating tasks...");
        const tasks = await Task.create([
            {
                projectId: project._id,
                title: "Design homepage UI",
                description: "Create wireframe and mockup for homepage",
                priority: "High",
                status: "To Do",
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            {
                projectId: project._id,
                title: "Setup backend API",
                description: "Initialize Node.js backend with Express",
                priority: "High",
                status: "In Progress",
                deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            },
            {
                projectId: project._id,
                title: "Implement authentication",
                description: "Add JWT-based authentication",
                priority: "Medium",
                status: "To Do",
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            },
            {
                projectId: project._id,
                title: "Create product catalog",
                description: "Build product listing and detail pages",
                priority: "Medium",
                status: "To Do",
                deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`✅ Created ${tasks.length} tasks`);
        tasks.forEach((t) =>
            console.log(
                `   - ${t.title} [${t.status}] (${t.priority} priority)`
            )
        );

        // 5. Giao Tasks cho Users
        console.log("\n5️⃣ Assigning tasks to users...");
        await TaskAssignment.create([
            {
                taskAssignmentId: {
                    taskId: tasks[0]._id,
                    userId: users[1]._id, // Jane
                },
            },
            {
                taskAssignmentId: {
                    taskId: tasks[1]._id,
                    userId: users[2]._id, // Bob
                },
            },
            {
                taskAssignmentId: {
                    taskId: tasks[2]._id,
                    userId: users[2]._id, // Bob
                },
            },
            {
                taskAssignmentId: {
                    taskId: tasks[3]._id,
                    userId: users[1]._id, // Jane
                },
            },
        ]);
        console.log("✅ Tasks assigned to team members");

        // 6. Tạo Messages
        console.log("\n6️⃣ Creating messages...");
        await Message.create([
            {
                projectId: project._id,
                senderId: users[0]._id,
                content:
                    "Welcome to the project team! Let's build something amazing! 🚀",
                type: "Text",
            },
            {
                projectId: project._id,
                senderId: users[1]._id,
                content: "Excited to work on this project!",
                type: "Text",
            },
            {
                projectId: project._id,
                senderId: users[2]._id,
                content: "Started working on the backend setup",
                type: "Text",
            },
        ]);
        console.log("✅ Created team chat messages");

        // 7. Tạo Notifications
        console.log("\n7️⃣ Creating notifications...");
        await Notification.create([
            {
                userId: users[1]._id,
                projectId: project._id,
                taskId: tasks[0]._id,
                content: 'You have been assigned to "Design homepage UI"',
                type: "TaskAssigned",
            },
            {
                userId: users[2]._id,
                projectId: project._id,
                taskId: tasks[1]._id,
                content: 'You have been assigned to "Setup backend API"',
                type: "TaskAssigned",
            },
            {
                userId: users[0]._id,
                projectId: project._id,
                content: 'Project "E-Commerce Platform" has been created',
                type: "ProjectUpdate",
            },
        ]);
        console.log("✅ Created notifications");

        // 8. Statistics
        console.log("\n8️⃣ Database Statistics:");
        console.log("═".repeat(50));
        const stats = {
            users: await User.countDocuments(),
            projects: await Project.countDocuments(),
            members: await ProjectMember.countDocuments(),
            tasks: await Task.countDocuments(),
            assignments: await TaskAssignment.countDocuments(),
            messages: await Message.countDocuments(),
            notifications: await Notification.countDocuments(),
        };

        console.log(`📊 Users: ${stats.users}`);
        console.log(`📊 Projects: ${stats.projects}`);
        console.log(`📊 Project Members: ${stats.members}`);
        console.log(`📊 Tasks: ${stats.tasks}`);
        console.log(`📊 Task Assignments: ${stats.assignments}`);
        console.log(`📊 Messages: ${stats.messages}`);
        console.log(`📊 Notifications: ${stats.notifications}`);

        // 9. Query Examples
        console.log("\n9️⃣ Query Examples:");
        console.log("═".repeat(50));

        // Find tasks by project
        const projectTasks = await Task.findByProject(project._id);
        console.log(`📝 Tasks in project: ${projectTasks.length}`);

        // Find overdue tasks
        const overdueTasks = await Task.findOverdue();
        console.log(`⏰ Overdue tasks: ${overdueTasks.length}`);

        // Count unread notifications for user
        const unreadCount = await Notification.countUnread(users[1]._id);
        console.log(
            `🔔 Unread notifications for ${users[1].name}: ${unreadCount}`
        );

        // Get project members
        const projectMembers = await ProjectMember.findByProject(project._id);
        console.log(`👥 Project members: ${projectMembers.length}`);

        console.log("\n" + "═".repeat(50));
        console.log("✅ All database tests completed successfully!");
        console.log("═".repeat(50));
        console.log("\n💡 Tip: Use MongoDB Compass to view the data visually");
        console.log(
            "   Connection string: mongodb://localhost:27017/projectai\n"
        );

        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error during testing:", error.message);
        console.error(error);
        process.exit(1);
    }
}

// Run test
testDatabase();
