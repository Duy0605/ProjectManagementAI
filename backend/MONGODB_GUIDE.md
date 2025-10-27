# Hướng dẫn MongoDB cho ProjectAI

## 📋 Mục lục

- [Cài đặt MongoDB](#cài-đặt-mongodb)
- [Cấu trúc Database](#cấu-trúc-database)
- [Sử dụng Models](#sử-dụng-models)
- [Queries thường dùng](#queries-thường-dùng)
- [Indexes & Performance](#indexes--performance)

---

## 🚀 Cài đặt MongoDB

### Windows

```bash
# Download MongoDB Community Server từ:
https://www.mongodb.com/try/download/community

# Hoặc dùng Chocolatey:
choco install mongodb

# Khởi động MongoDB:
mongod
```

### macOS

```bash
# Dùng Homebrew:
brew tap mongodb/brew
brew install mongodb-community

# Khởi động MongoDB:
brew services start mongodb-community
```

### Linux (Ubuntu)

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Kiểm tra kết nối

```bash
# Mở MongoDB Shell:
mongosh

# Hoặc dùng MongoDB Compass (GUI):
https://www.mongodb.com/products/compass
```

---

## 📊 Cấu trúc Database

### Collections được tạo theo Class Diagram

```
projectai/
├── users                  # Người dùng
├── projects              # Dự án
├── projectmembers        # Thành viên dự án (liên kết)
├── tasks                 # Công việc
├── taskassignments       # Phân công task (liên kết)
├── messages              # Tin nhắn
├── messageattachments    # File đính kèm
├── notifications         # Thông báo
└── aisuggestions        # Gợi ý AI
```

### Relationships (Mối quan hệ)

1. **User ↔ Project** (Many-to-Many qua ProjectMember)
    - Một user có thể tham gia nhiều projects
    - Một project có thể có nhiều users

2. **User ↔ Task** (Many-to-Many qua TaskAssignment)
    - Một user có thể được giao nhiều tasks
    - Một task có thể có nhiều assignees

3. **Project → Task** (One-to-Many)
    - Một project có nhiều tasks
    - Một task thuộc về một project

4. **Project → Message** (One-to-Many)
    - Một project có nhiều messages
    - Một message thuộc về một project

5. **Message → MessageAttachment** (One-to-Many)
    - Một message có thể có nhiều attachments
    - Một attachment thuộc về một message

---

## 💻 Sử dụng Models

### 1. User Model

```javascript
const { User } = require("./models");

// Tạo user mới
const newUser = await User.create({
    name: "John Doe",
    email: "john@example.com",
    passwordHash: "password123", // Sẽ tự động hash
    role: "member",
});

// Tìm user theo email
const user = await User.findOne({ email: "john@example.com" });

// So sánh password
const isMatch = await user.comparePassword("password123");

// Cập nhật user
await User.findByIdAndUpdate(userId, {
    name: "John Updated",
    avatar: "https://...",
});
```

### 2. Project Model

```javascript
const { Project } = require("./models");

// Tạo project mới
const project = await Project.create({
    name: "E-Commerce Platform",
    description: "Build modern shopping website",
    startDate: new Date(),
    endDate: new Date("2025-12-31"),
    status: "Active",
});

// Tìm active projects
const activeProjects = await Project.findActive();

// Kiểm tra project overdue
if (project.isOverdue()) {
    console.log("Project is overdue!");
}
```

### 3. ProjectMember Model

```javascript
const { ProjectMember } = require("./models");

// Thêm member vào project
const member = await ProjectMember.create({
    projectMemberId: {
        projectId: projectId,
        userId: userId,
    },
    role: "Member",
});

// Lấy members của project
const members = await ProjectMember.findByProject(projectId);

// Kiểm tra user có phải member không
const isMember = await ProjectMember.isMember(projectId, userId);

// Lấy role của user trong project
const role = await ProjectMember.getUserRole(projectId, userId);
```

### 4. Task Model

```javascript
const { Task } = require("./models");

// Tạo task mới
const task = await Task.create({
    projectId: projectId,
    title: "Design homepage UI",
    description: "Create wireframe and mockup",
    priority: "High",
    status: "To Do",
    deadline: new Date("2025-12-01"),
});

// Lấy tasks theo project và status
const todoTasks = await Task.findByProject(projectId, "To Do");

// Tìm overdue tasks
const overdueTasks = await Task.findOverdue(projectId);

// Lấy statistics
const stats = await Task.getStatistics(projectId);
// Output: [{ _id: 'To Do', count: 5 }, { _id: 'Done', count: 10 }, ...]
```

### 5. TaskAssignment Model

```javascript
const { TaskAssignment } = require("./models");

// Giao task cho user
const assignment = await TaskAssignment.create({
    taskAssignmentId: {
        taskId: taskId,
        userId: userId,
    },
});

// Lấy assignments của task
const assignees = await TaskAssignment.findByTask(taskId);

// Lấy tasks của user
const userTasks = await TaskAssignment.findByUser(userId);

// Đếm tasks của user theo status
const count = await TaskAssignment.countUserTasks(userId, "In Progress");
```

### 6. Message Model

```javascript
const { Message } = require("./models");

// Gửi message
const message = await Message.create({
    projectId: projectId,
    senderId: userId,
    content: "Hello team!",
    type: "Text",
});

// Lấy messages của project
const messages = await Message.findByProject(projectId, 50, 0);

// Search messages
const results = await Message.searchMessages(projectId, "deadline");

// Đếm messages
const count = await Message.countByProject(projectId);
```

### 7. Notification Model

```javascript
const { Notification } = require("./models");

// Tạo notification
const notification = await Notification.create({
    userId: userId,
    projectId: projectId,
    taskId: taskId,
    content: "You have been assigned a new task",
    type: "TaskAssigned",
});

// Lấy notifications của user
const notifications = await Notification.findByUser(userId, 50, false);

// Đếm unread notifications
const unreadCount = await Notification.countUnread(userId);

// Đánh dấu đã đọc
await Notification.markAsRead([notificationId1, notificationId2]);

// Đánh dấu tất cả đã đọc
await Notification.markAllAsRead(userId);
```

### 8. AISuggestion Model

```javascript
const { AISuggestion } = require("./models");

// Tạo AI suggestion
const suggestion = await AISuggestion.create({
    projectId: projectId,
    taskId: taskId,
    type: "RiskAlert",
    content: "This task is at risk of missing deadline",
});

// Lấy suggestions của project
const suggestions = await AISuggestion.findByProject(projectId, 20);

// Lấy suggestions theo type
const riskAlerts = await AISuggestion.findByType(projectId, "RiskAlert");

// Lấy recent suggestions (24h)
const recent = await AISuggestion.findRecent(projectId, 24);
```

---

## 🔍 Queries Thường Dùng

### Populate (Join) Relations

```javascript
// Populate user trong project members
const members = await ProjectMember.find({
    "projectMemberId.projectId": projectId,
}).populate("projectMemberId.userId", "name email avatar");

// Populate multiple relations
const tasks = await Task.find({ projectId })
    .populate("projectId", "name status")
    .populate({
        path: "assignments",
        populate: {
            path: "taskAssignmentId.userId",
            select: "name avatar",
        },
    });

// Populate messages với sender và attachments
const messages = await Message.find({ projectId })
    .populate("senderId", "name avatar")
    .populate("attachments");
```

### Aggregation (Tổng hợp dữ liệu)

```javascript
// Thống kê tasks theo status
const taskStats = await Task.aggregate([
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

// Tính trung bình số tasks per user
const avgTasks = await TaskAssignment.aggregate([
    {
        $group: {
            _id: "$taskAssignmentId.userId",
            taskCount: { $sum: 1 },
        },
    },
    {
        $group: {
            _id: null,
            avgTasksPerUser: { $avg: "$taskCount" },
        },
    },
]);
```

### Text Search

```javascript
// Tìm kiếm tasks
const tasks = await Task.find({
    projectId: projectId,
    $or: [
        { title: { $regex: "design", $options: "i" } },
        { description: { $regex: "design", $options: "i" } },
    ],
});

// Tìm messages
const messages = await Message.find({
    projectId: projectId,
    content: { $regex: searchText, $options: "i" },
});
```

---

## ⚡ Indexes & Performance

### Indexes đã được tạo sẵn

Tất cả models đều có indexes được định nghĩa sẵn:

```javascript
// User
email: unique index
createdAt: descending index

// Project
status, createdAt, members.userId

// Task
projectId, status, priority, deadline
Compound: (projectId + status)

// Message
(projectId + createdAt), senderId

// Notification
(userId + createdAt), (userId + isRead)
Compound: (userId + isRead + createdAt)
```

### Kiểm tra indexes

```javascript
// MongoDB Shell
use projectai;
db.users.getIndexes();
db.tasks.getIndexes();
```

### Performance Tips

1. **Luôn sử dụng indexes** cho queries thường xuyên
2. **Limit kết quả** khi query danh sách: `.limit(50)`
3. **Select fields cần thiết**: `.select('name email')`
4. **Sử dụng lean()** cho read-only data: `.lean()`
5. **Pagination**: Skip & Limit thay vì load tất cả

```javascript
// Good ✅
const tasks = await Task.find({ projectId })
    .select("title status priority")
    .limit(20)
    .lean();

// Bad ❌
const tasks = await Task.find({ projectId }); // Load all fields & documents
```

---

## 🛠 Utilities & Helpers

### Tạo file seed data (test data)

```javascript
// backend/scripts/seed.js
const { User, Project, Task } = require("../src/models");

async function seed() {
    // Xóa data cũ
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Tạo users
    const users = await User.create([
        {
            name: "Admin",
            email: "admin@test.com",
            passwordHash: "admin123",
            role: "admin",
        },
        {
            name: "Manager",
            email: "manager@test.com",
            passwordHash: "manager123",
            role: "manager",
        },
        {
            name: "Member",
            email: "member@test.com",
            passwordHash: "member123",
            role: "member",
        },
    ]);

    // Tạo project
    const project = await Project.create({
        name: "Test Project",
        description: "Testing project",
        status: "Active",
    });

    // Tạo tasks
    await Task.create([
        {
            projectId: project._id,
            title: "Task 1",
            status: "To Do",
            priority: "High",
        },
        {
            projectId: project._id,
            title: "Task 2",
            status: "In Progress",
            priority: "Medium",
        },
        {
            projectId: project._id,
            title: "Task 3",
            status: "Done",
            priority: "Low",
        },
    ]);

    console.log("✅ Seed completed!");
}
```

### Backup & Restore

```bash
# Backup database
mongodump --db projectai --out ./backup

# Restore database
mongorestore --db projectai ./backup/projectai
```

---

## 📚 Tài liệu tham khảo

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB University (Free courses)](https://university.mongodb.com/)

---

**Lưu ý:** Nhớ cập nhật file `.env` với MONGODB_URI trước khi chạy:

```env
MONGODB_URI=mongodb://localhost:27017/projectai
```
