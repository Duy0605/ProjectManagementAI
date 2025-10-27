# 🚀 Quick Start - MongoDB Setup

## Đã tạo xong các files sau:

### ✅ Configuration

- `config/database.js` - Kết nối MongoDB với error handling

### ✅ Models (9 collections)

1. `models/User.js` - Người dùng (authentication, profile)
2. `models/Project.js` - Dự án
3. `models/ProjectMember.js` - Liên kết User-Project (n-n)
4. `models/Task.js` - Công việc
5. `models/TaskAssignment.js` - Liên kết Task-User (n-n)
6. `models/Message.js` - Tin nhắn chat
7. `models/MessageAttachment.js` - File đính kèm
8. `models/Notification.js` - Thông báo
9. `models/AISuggestion.js` - Gợi ý AI
10. `models/index.js` - Export tất cả models

### ✅ Documentation

- `DATABASE_SETUP.md` - Hướng dẫn setup từng bước
- `MONGODB_GUIDE.md` - Chi tiết sử dụng từng model
- `.env.example` - Template biến môi trường

### ✅ Testing

- `test-database.js` - Script test tạo sample data

### ✅ Server

- `src/server.js` - Đã cập nhật kết nối MongoDB

---

## 🏃 Chạy ngay

### 1. Cài MongoDB

```bash
# Windows: Download từ mongodb.com
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb
```

### 2. Setup Backend

```bash
cd backend

# Cài dependencies
npm install mongoose bcryptjs

# Tạo .env
cp .env.example .env

# Sửa MONGODB_URI trong .env:
MONGODB_URI=mongodb://localhost:27017/projectai
```

### 3. Start MongoDB

```bash
# Windows:
mongod

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongodb
```

### 4. Test Database

```bash
# Chạy server
npm run dev

# Hoặc test riêng database
node test-database.js
```

---

## 📊 Kiểm tra kết quả

### MongoDB Shell

```bash
mongosh
use projectai
show collections
db.users.find()
```

### MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/products/compass
2. Connect: `mongodb://localhost:27017`
3. Database: `projectai`

---

## 🎯 Models Overview

```
User
├── name, email, passwordHash
├── avatar, role (admin/manager/member)
├── Methods: comparePassword()
└── Relations: → Projects (via ProjectMember)

Project
├── name, description, dates
├── status (Active/Completed/Paused/Archived)
└── Relations: → Members, Tasks, Messages

Task
├── title, description, priority, status
├── deadline
└── Relations: → Project, Assignees (via TaskAssignment)

Message
├── content, type (Text/Media/File)
└── Relations: → Project, Sender (User), Attachments

Notification
├── content, type, isRead
└── Relations: → User, Project, Task

AISuggestion
├── type, content
└── Relations: → Project, Task
```

---

## 💡 Sử dụng Models

```javascript
// Import
const { User, Project, Task } = require("./src/models");

// Tạo user
const user = await User.create({
    name: "John",
    email: "john@test.com",
    passwordHash: "pass123",
});

// Tạo project
const project = await Project.create({
    name: "My Project",
    status: "Active",
});

// Tạo task
const task = await Task.create({
    projectId: project._id,
    title: "First Task",
    status: "To Do",
    priority: "High",
});

// Query
const tasks = await Task.findByProject(project._id);
const overdue = await Task.findOverdue();
```

---

## ✨ Features của Models

### User

- ✅ Auto hash password (BCrypt)
- ✅ Method `comparePassword()`
- ✅ Virtual relations với projects
- ✅ Indexes: email (unique)

### Task

- ✅ Methods: `isOverdue()`, `remainingDays()`
- ✅ Static: `findOverdue()`, `getStatistics()`
- ✅ Indexes: projectId, status, priority

### Notification

- ✅ Static: `markAsRead()`, `countUnread()`
- ✅ Auto create with realtime events
- ✅ Compound indexes cho performance

### All Models

- ✅ Timestamps (createdAt, updatedAt)
- ✅ Virtuals cho relations
- ✅ Indexes được optimize
- ✅ Validation rules
- ✅ Helper methods

---

## 🔥 Next Steps

1. **Test Database:**

    ```bash
    node test-database.js
    ```

2. **Xem Data:**
    - MongoDB Compass: `mongodb://localhost:27017/projectai`
    - Shell: `mongosh` → `use projectai` → `db.users.find()`

3. **Tạo Controllers:**
    - UserController
    - ProjectController
    - TaskController
    - etc.

4. **Tạo Routes:**
    - `/api/users`
    - `/api/projects`
    - `/api/tasks`
    - etc.

5. **Integrate với Frontend:**
    - Setup API calls
    - Connect Socket.IO
    - Test end-to-end

---

## 📚 Tài liệu

- **Chi tiết:** Xem `DATABASE_SETUP.md`
- **Hướng dẫn:** Xem `MONGODB_GUIDE.md`
- **Mongoose Docs:** https://mongoosejs.com/docs/

---

**🎉 Setup hoàn tất! Ready to code!**
