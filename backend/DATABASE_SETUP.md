# 🗄️ Hướng Dẫn Thiết Lập MongoDB - ProjectAI

## 📋 Tổng quan

Dựa trên Class Diagram, hệ thống ProjectAI có **9 collections** chính:

| Collection             | Mô tả            | Quan hệ                         |
| ---------------------- | ---------------- | ------------------------------- |
| **users**              | Người dùng       | 1-n với projects, tasks         |
| **projects**           | Dự án            | 1-n với tasks, messages         |
| **projectmembers**     | Thành viên dự án | n-n giữa users và projects      |
| **tasks**              | Công việc        | n-1 với projects, n-n với users |
| **taskassignments**    | Phân công task   | n-n giữa tasks và users         |
| **messages**           | Tin nhắn         | n-1 với projects                |
| **messageattachments** | File đính kèm    | n-1 với messages                |
| **notifications**      | Thông báo        | n-1 với users                   |
| **aisuggestions**      | Gợi ý AI         | n-1 với projects                |

---

## 🚀 Bước 1: Cài đặt MongoDB

### Windows

```bash
# Download MongoDB Community Server:
https://www.mongodb.com/try/download/community

# Cài đặt và chạy:
mongod --dbpath="C:\data\db"
```

### macOS

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Kiểm tra

```bash
# Mở MongoDB Shell:
mongosh

# Trong shell:
show dbs
use projectai
```

---

## 📦 Bước 2: Cài đặt dependencies

```bash
cd backend
npm install mongoose bcryptjs
```

---

## ⚙️ Bước 3: Cấu hình .env

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật thông tin MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/projectai
JWT_SECRET=your_secret_key_here
```

---

## 📁 Bước 4: Cấu trúc Files đã tạo

```
backend/
├── config/
│   └── database.js          ✅ Kết nối MongoDB
├── src/
│   ├── models/
│   │   ├── User.js          ✅ Schema User
│   │   ├── Project.js       ✅ Schema Project
│   │   ├── ProjectMember.js ✅ Schema ProjectMember
│   │   ├── Task.js          ✅ Schema Task
│   │   ├── TaskAssignment.js✅ Schema TaskAssignment
│   │   ├── Message.js       ✅ Schema Message
│   │   ├── MessageAttachment.js ✅ Schema Attachment
│   │   ├── Notification.js  ✅ Schema Notification
│   │   ├── AISuggestion.js  ✅ Schema AISuggestion
│   │   └── index.js         ✅ Export all models
│   └── server.js            ✅ Đã cập nhật với connectDB()
├── .env.example             ✅ Template env variables
└── MONGODB_GUIDE.md         ✅ Chi tiết sử dụng
```

---

## 🔧 Bước 5: Khởi động Server

```bash
cd backend
npm run dev
```

Bạn sẽ thấy:

```
✅ MongoDB Connected: localhost
📊 Database: projectai
🔗 Mongoose connected to MongoDB
🚀 Server running on port 5000
```

---

## 💡 Bước 6: Test Models

### Tạo file test đơn giản

Tạo file `backend/test-db.js`:

```javascript
require("dotenv").config();
const connectDB = require("./config/database");
const { User, Project, Task } = require("./src/models");

async function testDatabase() {
    try {
        // Kết nối DB
        await connectDB();

        console.log("🧪 Testing database operations...\n");

        // 1. Tạo User
        console.log("1️⃣ Creating user...");
        const user = await User.create({
            name: "Test User",
            email: "test@example.com",
            passwordHash: "password123",
            role: "member",
        });
        console.log("✅ User created:", user.name);

        // 2. Tạo Project
        console.log("\n2️⃣ Creating project...");
        const project = await Project.create({
            name: "Test Project",
            description: "This is a test project",
            status: "Active",
        });
        console.log("✅ Project created:", project.name);

        // 3. Tạo Task
        console.log("\n3️⃣ Creating task...");
        const task = await Task.create({
            projectId: project._id,
            title: "Test Task",
            description: "This is a test task",
            priority: "High",
            status: "To Do",
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        });
        console.log("✅ Task created:", task.title);

        // 4. Query dữ liệu
        console.log("\n4️⃣ Querying data...");
        const allUsers = await User.find();
        const allProjects = await Project.find();
        const allTasks = await Task.find();

        console.log(`✅ Total users: ${allUsers.length}`);
        console.log(`✅ Total projects: ${allProjects.length}`);
        console.log(`✅ Total tasks: ${allTasks.length}`);

        console.log("\n✅ All tests passed!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

testDatabase();
```

### Chạy test

```bash
node test-db.js
```

---

## 📊 Bước 7: Xem dữ liệu (MongoDB Compass)

1. Download **MongoDB Compass**: https://www.mongodb.com/products/compass
2. Kết nối với: `mongodb://localhost:27017`
3. Chọn database: `projectai`
4. Xem các collections đã tạo

---

## 🎯 Các Models Chính và Cách Sử Dụng

### 1. User Model

```javascript
const { User } = require("./models");

// Tạo user
const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    passwordHash: "password123", // Auto hash bởi pre-save hook
    avatar: "https://...",
    role: "member",
});

// Tìm user
const user = await User.findOne({ email: "john@example.com" });

// So sánh password
const isMatch = await user.comparePassword("password123");

// Update user
await User.findByIdAndUpdate(userId, { name: "John Updated" });
```

### 2. Project Model

```javascript
const { Project } = require("./models");

// Tạo project
const project = await Project.create({
    name: "E-Commerce Platform",
    description: "Build shopping website",
    startDate: new Date(),
    endDate: new Date("2025-12-31"),
    status: "Active",
});

// Query active projects
const activeProjects = await Project.findActive();

// Check overdue
if (project.isOverdue()) {
    console.log("Project is overdue!");
}
```

### 3. Task Model

```javascript
const { Task } = require("./models");

// Tạo task
const task = await Task.create({
    projectId: projectId,
    title: "Design homepage",
    description: "Create UI mockup",
    priority: "High",
    status: "To Do",
    deadline: new Date("2025-12-01"),
});

// Query tasks
const todoTasks = await Task.findByProject(projectId, "To Do");
const overdueTasks = await Task.findOverdue(projectId);

// Statistics
const stats = await Task.getStatistics(projectId);
```

### 4. Relationship Models

```javascript
const { ProjectMember, TaskAssignment } = require("./models");

// Thêm member vào project
await ProjectMember.create({
    projectMemberId: {
        projectId: projectId,
        userId: userId,
    },
    role: "Member",
});

// Giao task cho user
await TaskAssignment.create({
    taskAssignmentId: {
        taskId: taskId,
        userId: userId,
    },
});

// Check membership
const isMember = await ProjectMember.isMember(projectId, userId);

// Get user role
const role = await ProjectMember.getUserRole(projectId, userId);
```

---

## 🔍 Queries Nâng Cao

### Populate (Join)

```javascript
// Lấy project với members
const project = await Project.findById(projectId).populate({
    path: "members",
    populate: {
        path: "projectMemberId.userId",
        select: "name email avatar",
    },
});

// Lấy task với assignees
const task = await Task.findById(taskId).populate({
    path: "assignments",
    populate: {
        path: "taskAssignmentId.userId",
        select: "name avatar",
    },
});
```

### Aggregation

```javascript
// Task statistics
const stats = await Task.aggregate([
    { $match: { projectId: mongoose.Types.ObjectId(projectId) } },
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 },
            highPriority: {
                $sum: { $cond: [{ $eq: ["$priority", "High"] }, 1, 0] },
            },
        },
    },
]);
```

---

## ⚡ Performance Tips

1. **Indexes**: Tất cả models đã có indexes định nghĩa sẵn
2. **Limit results**: `.limit(50)` để tránh load quá nhiều data
3. **Select fields**: `.select('name email')` chỉ lấy fields cần thiết
4. **Lean queries**: `.lean()` cho read-only data (nhanh hơn 5x)
5. **Pagination**: Dùng skip & limit thay vì load all

```javascript
// Good ✅
const tasks = await Task.find({ projectId })
    .select("title status priority")
    .limit(20)
    .lean();

// Bad ❌
const tasks = await Task.find({ projectId });
```

---

## 🛠️ Troubleshooting

### Lỗi kết nối MongoDB

```bash
# Kiểm tra MongoDB đang chạy:
mongosh

# Nếu không chạy được, start lại:
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongodb
```

### Lỗi Mongoose validation

```javascript
// Kiểm tra required fields
const user = new User({
    name: "Test",
    email: "test@example.com",
    passwordHash: "pass123",
});

const error = user.validateSync();
if (error) console.log(error.errors);
```

### Xóa tất cả data (reset database)

```javascript
await User.deleteMany({});
await Project.deleteMany({});
await Task.deleteMany({});
// ... các collections khác
```

---

## 📚 Tài liệu tham khảo

- **MongoDB Docs**: https://docs.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/docs/
- **MongoDB University** (Free): https://university.mongodb.com/

---

## ✅ Checklist Setup

- [ ] MongoDB đã cài đặt và chạy
- [ ] Dependencies đã install (`mongoose`, `bcryptjs`)
- [ ] File `.env` đã tạo với `MONGODB_URI`
- [ ] Server chạy thành công và kết nối DB
- [ ] Test tạo user/project/task thành công
- [ ] MongoDB Compass kết nối và xem được data

---

**🎉 Hoàn thành! Bạn đã setup xong MongoDB cho ProjectAI!**

Nếu cần trợ giúp thêm, xem file `MONGODB_GUIDE.md` để biết chi tiết về từng model và cách sử dụng.
