# 🚀 Hướng Dẫn Kết Nối MongoDB (Không Cần Tạo Database Trước)

## ✅ Tình Trạng Hiện Tại

- ✅ MongoDB đã cài đặt (version 8.0.12)
- ✅ MongoDB service đang chạy
- ✅ File `.env` đã có với `MONGODB_URI=mongodb://localhost:27017/project-management-ai`
- ✅ Kết nối thành công! Database tự động được tạo

---

## 📚 Lý Thuyết: MongoDB Tự Động Tạo Database

### MongoDB hoạt động theo cơ chế:

1. **Lazy Creation** (Tạo khi cần):
    - Database chỉ thực sự được tạo khi bạn insert data đầu tiên
    - Collections cũng tự động tạo khi insert document đầu tiên

2. **Connection String Format**:

    ```
    mongodb://[host]:[port]/[database-name]
    ```

    - `host`: localhost (máy local)
    - `port`: 27017 (default MongoDB port)
    - `database-name`: Tên database muốn sử dụng (sẽ tự tạo nếu chưa có)

3. **Không cần CREATE DATABASE**:
    - Khác với MySQL/PostgreSQL, MongoDB không có lệnh CREATE DATABASE
    - Chỉ cần kết nối với tên database, nó sẽ tự tạo

---

## 🔧 Các Bước Đã Thực Hiện

### 1. Kiểm tra MongoDB Service

```bash
net start | findstr MongoDB
# Output: MongoDB Server (MongoDB) ✅
```

### 2. Kiểm tra Connection String

File `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/project-management-ai
```

### 3. Test Connection

```bash
node test-connection.js
# Output: ✅ Successfully connected!
```

---

## 💻 Cách Sử Dụng

### Option 1: Test Connection Đơn Giản

```bash
cd backend
node test-connection.js
```

**Kết quả:**

```
✅ Successfully connected to MongoDB!
📊 Connection Details:
   Host: localhost
   Database: project-management-ai
   Port: 27017
   Ready State: Connected
```

### Option 2: Tạo Data Mẫu (Khuyến nghị)

```bash
cd backend
node test-database.js
```

Script này sẽ:

1. Kết nối MongoDB
2. Tạo collections tự động (users, projects, tasks, etc.)
3. Insert sample data
4. Hiển thị statistics

**Output mẫu:**

```
✅ MongoDB Connected: localhost
📊 Database: project-management-ai

1️⃣ Creating users...
✅ Created 3 users
   - John Doe (john@projectai.com)
   - Jane Smith (jane@projectai.com)
   - Bob Wilson (bob@projectai.com)

2️⃣ Creating project...
✅ Project created: "E-Commerce Platform"

3️⃣ Adding members to project...
✅ Added 3 members to project

4️⃣ Creating tasks...
✅ Created 4 tasks
   - Design homepage UI [To Do] (High priority)
   - Setup backend API [In Progress] (High priority)
   ...
```

### Option 3: Chạy Backend Server

```bash
cd backend
npm run dev
```

Server sẽ:

1. Tự động kết nối MongoDB
2. Tạo database nếu chưa có
3. Ready để nhận API requests

---

## 🔍 Xem Database Sau Khi Tạo

### Method 1: MongoDB Shell (mongosh)

```bash
# Mở MongoDB Shell
mongosh

# Chuyển đến database
use project-management-ai

# Xem collections
show collections

# Xem users
db.users.find()

# Đếm documents
db.users.countDocuments()

# Thoát
exit
```

### Method 2: MongoDB Compass (GUI - Khuyến nghị)

1. Download: https://www.mongodb.com/products/compass
2. Kết nối: `mongodb://localhost:27017`
3. Chọn database: `project-management-ai`
4. Xem collections và data trực quan

### Method 3: VS Code Extension

1. Install extension: "MongoDB for VS Code"
2. Connect: `mongodb://localhost:27017`
3. Browse database trong VS Code

---

## 📊 Cấu Trúc Database Sau Khi Chạy test-database.js

```
project-management-ai/
├── users                  (3 documents)
├── projects              (1 document)
├── projectmembers        (3 documents)
├── tasks                 (4 documents)
├── taskassignments       (4 documents)
├── messages              (3 documents)
└── notifications         (3 documents)
```

---

## 🎯 Workflow Khuyến Nghị

### 1. Lần Đầu Setup (Bạn đang ở đây ✅)

```bash
# Đã hoàn thành:
✅ MongoDB installed
✅ MongoDB running
✅ .env configured
✅ Connection tested

# Bước tiếp theo:
cd backend
node test-database.js
```

### 2. Development (Sau khi có data mẫu)

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 3. Xem Database

```bash
# Option A: Shell
mongosh
use project-management-ai
show collections

# Option B: GUI (tốt hơn)
# Mở MongoDB Compass
```

---

## 🛠️ Troubleshooting

### Lỗi: "ECONNREFUSED"

**Nguyên nhân:** MongoDB service không chạy

**Giải pháp:**

```bash
# Windows:
net start MongoDB

# Kiểm tra:
net start | findstr MongoDB
```

### Lỗi: "MongooseServerSelectionError"

**Nguyên nhân:** Sai connection string hoặc MongoDB không lắng nghe đúng port

**Giải pháp:**

1. Kiểm tra `.env`:
    ```env
    MONGODB_URI=mongodb://localhost:27017/project-management-ai
    ```
2. Test bằng mongosh:
    ```bash
    mongosh mongodb://localhost:27017
    ```

### Database trống sau khi connect

**Đây là BÌNH THƯỜNG!**

MongoDB sử dụng "lazy creation":

- Database được tạo khi connect (nhưng không có collections)
- Collections được tạo khi insert document đầu tiên

**Giải pháp:** Chạy `node test-database.js` để tạo data mẫu

---

## 📝 Code Mẫu: Sử Dụng Models

### Import Models

```javascript
const { User, Project, Task } = require("./src/models");
```

### Tạo User (Collection tự động tạo)

```javascript
const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    passwordHash: "password123", // Auto hash bởi pre-save hook
    role: "member",
});

console.log("User created:", user._id);
// Collection "users" tự động được tạo!
```

### Tạo Project

```javascript
const project = await Project.create({
    name: "My First Project",
    description: "Testing MongoDB",
    status: "Active",
});

// Collection "projects" tự động được tạo!
```

### Query Data

```javascript
// Tìm tất cả users
const users = await User.find();

// Tìm user theo email
const user = await User.findOne({ email: "john@example.com" });

// Tìm active projects
const activeProjects = await Project.find({ status: "Active" });

// Count documents
const userCount = await User.countDocuments();
```

---

## ✅ Checklist

- [x] MongoDB installed
- [x] MongoDB service running
- [x] .env file configured with MONGODB_URI
- [x] Connection tested successfully
- [x] Database auto-created (empty)
- [ ] **NEXT: Run `node test-database.js` để tạo sample data**
- [ ] Xem data bằng MongoDB Compass
- [ ] Start backend server: `npm run dev`
- [ ] Test API endpoints

---

## 🎉 Kết Luận

**MongoDB đã sẵn sàng!** Bạn không cần tạo database trước, nó tự động tạo khi:

1. Kết nối với connection string có tên database
2. Insert document đầu tiên vào collection

**Bước tiếp theo:**

```bash
cd backend
node test-database.js
```

Sau đó mở MongoDB Compass để xem kết quả! 🚀
