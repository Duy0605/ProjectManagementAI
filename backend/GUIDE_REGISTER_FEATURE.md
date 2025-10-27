# 🎯 HƯỚNG DẪN HOÀN CHỈNH - CHỨC NĂNG ĐĂNG KÝ

## ✅ CÁC BƯỚC ĐÃ LÀM

### 1. Backend Files Created:

```
backend/
├── src/
│   ├── controllers/
│   │   └── UserController.js        ✅ CREATED
│   ├── middleware/
│   │   └── auth.middleware.js       ✅ CREATED
│   ├── routes/
│   │   └── auth.routes.js           ✅ CREATED
│   └── server.js                    ✅ UPDATED
```

### 2. API Endpoints Available:

- **POST** `/api/auth/register` - Đăng ký
- **POST** `/api/auth/login` - Đăng nhập
- **GET** `/api/auth/me` - Lấy thông tin user (cần token)

---

## 🧪 CÁCH 1: TEST BẰNG TRÌNH DUYỆT (ĐƠN GIẢN NHẤT)

### Bước 1: Đảm bảo server đang chạy

```bash
cd backend
npm run dev
```

Thấy dòng này là OK:

```
🚀 Server running on port 5000
✅ MongoDB Connected: localhost
```

### Bước 2: Tạo file HTML test

Tạo file `test-register.html` trong thư mục `backend`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Test Register API</title>
        <style>
            body {
                font-family: Arial;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
            }
            input {
                width: 100%;
                padding: 10px;
                margin: 5px 0;
            }
            button {
                padding: 10px 20px;
                background: #4caf50;
                color: white;
                border: none;
                cursor: pointer;
            }
            button:hover {
                background: #45a049;
            }
            pre {
                background: #f4f4f4;
                padding: 15px;
                border-radius: 5px;
                overflow-x: auto;
            }
            .success {
                color: green;
            }
            .error {
                color: red;
            }
        </style>
    </head>
    <body>
        <h1>🧪 Test Register API</h1>

        <form id="registerForm">
            <label>Tên:</label>
            <input type="text" id="name" placeholder="Nguyen Van A" required />

            <label>Email:</label>
            <input
                type="email"
                id="email"
                placeholder="test@example.com"
                required
            />

            <label>Mật khẩu:</label>
            <input
                type="password"
                id="password"
                placeholder="123456"
                required
            />

            <label>Xác nhận mật khẩu:</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="123456"
                required
            />

            <br /><br />
            <button type="submit">Đăng Ký</button>
        </form>

        <h3>Response:</h3>
        <pre id="response">Chưa có kết quả...</pre>

        <script>
            document
                .getElementById("registerForm")
                .addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const data = {
                        name: document.getElementById("name").value,
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        confirmPassword:
                            document.getElementById("confirmPassword").value,
                    };

                    document.getElementById("response").innerHTML =
                        "Đang gửi request...";

                    try {
                        const response = await fetch(
                            "http://localhost:5000/api/auth/register",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            }
                        );

                        const result = await response.json();

                        if (result.success) {
                            document.getElementById("response").className =
                                "success";
                            document.getElementById("response").innerHTML =
                                "✅ THÀNH CÔNG!\n\n" +
                                JSON.stringify(result, null, 2);

                            // Lưu token vào localStorage
                            localStorage.setItem("token", result.data.token);
                            alert(
                                "Đăng ký thành công! Token đã được lưu vào localStorage"
                            );
                        } else {
                            document.getElementById("response").className =
                                "error";
                            document.getElementById("response").innerHTML =
                                "❌ LỖI!\n\n" + JSON.stringify(result, null, 2);
                        }
                    } catch (error) {
                        document.getElementById("response").className = "error";
                        document.getElementById("response").innerHTML =
                            "❌ LỖI:\n\n" + error.message;
                    }
                });
        </script>
    </body>
</html>
```

### Bước 3: Mở file HTML

- Click đúp vào file `test-register.html`
- Nhập thông tin và click "Đăng Ký"
- Xem kết quả

---

## 🧪 CÁCH 2: TEST BẰNG POSTMAN (KHUYẾN NGHỊ)

### Bước 1: Download Postman

https://www.postman.com/downloads/

### Bước 2: Tạo request mới

1. Click "New" → "HTTP Request"
2. Chọn method: **POST**
3. URL: `http://localhost:5000/api/auth/register`
4. Tab "Body" → chọn "raw" → chọn "JSON"
5. Paste JSON này:

```json
{
    "name": "Nguyen Van Test",
    "email": "testuser@example.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

6. Click "Send"

### Bước 3: Xem Response

**Thành công (Status 201):**

```json
{
    "success": true,
    "message": "Đăng ký thành công!",
    "data": {
        "user": {
            "id": "672e1234567890abcdef",
            "name": "Nguyen Van Test",
            "email": "testuser@example.com",
            "role": "member",
            "avatar": null,
            "createdAt": "2025-10-27T..."
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

**Lỗi - Email đã tồn tại (Status 409):**

```json
{
    "success": false,
    "message": "Email này đã được sử dụng"
}
```

**Lỗi - Mật khẩu không khớp (Status 400):**

```json
{
    "success": false,
    "message": "Mật khẩu xác nhận không khớp"
}
```

---

## 🧪 CÁCH 3: TEST BẰNG THUNDER CLIENT (VS CODE EXTENSION)

### Bước 1: Cài Extension

1. Mở VS Code
2. Tìm extension "Thunder Client"
3. Click Install

### Bước 2: Tạo Request

1. Click icon Thunder Client ở sidebar
2. Click "New Request"
3. Method: **POST**
4. URL: `http://localhost:5000/api/auth/register`
5. Tab "Body" → chọn "JSON"
6. Paste:

```json
{
    "name": "Test User",
    "email": "thunder@example.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

7. Click "Send"

---

## 📊 KIỂM TRA DATABASE SAU KHI ĐĂNG KÝ

### Cách 1: MongoDB Compass

1. Mở MongoDB Compass
2. Chọn database `project-management-ai`
3. Chọn collection `users`
4. Sẽ thấy user mới được thêm vào

### Cách 2: Chạy script Node.js

Tạo file `check-users.js`:

```javascript
const { User } = require("./src/models");
require("dotenv").config();

async function checkUsers() {
    const mongoose = require("mongoose");
    await mongoose.connect(process.env.MONGODB_URI);

    const users = await User.find().select("-passwordHash");
    console.log("📊 Total Users:", users.length);
    console.log("\n👥 Users:");
    users.forEach((user) => {
        console.log(`   - ${user.name} (${user.email}) [${user.role}]`);
    });

    await mongoose.disconnect();
}

checkUsers();
```

Chạy:

```bash
node check-users.js
```

---

## ✅ CHECKLIST - ĐÃ HOÀN THÀNH

- [x] Tạo UserController với hàm register
- [x] Tạo auth middleware để verify JWT
- [x] Tạo auth routes
- [x] Kết nối routes vào server
- [x] Cài đặt packages cần thiết (bcryptjs, jsonwebtoken)
- [x] Cấu hình JWT_SECRET trong .env
- [x] Server đang chạy trên port 5000

---

## 🎯 BƯỚC TIẾP THEO - KẾT NỐI FRONTEND

Bạn đã hoàn thành Backend! Giờ cần kết nối Frontend.

### Tóm tắt cần làm:

1. **Tạo API Service** (frontend/src/services/api.js)
2. **Tạo Auth Service** (frontend/src/services/authService.js)
3. **Cập nhật Register Page** để gọi API
4. **Thêm Toast notification** để hiển thị thông báo
5. **Redirect sau khi đăng ký thành công**

---

## 💡 TIPS

### Để xem logs trong console:

Server sẽ log các request:

```
POST /api/auth/register 201 350ms
POST /api/auth/login 200 250ms
```

### Để debug:

Thêm `console.log` trong UserController.js:

```javascript
console.log("📦 Request Body:", req.body);
```

### Test các trường hợp lỗi:

1. **Email trống:**

```json
{
    "name": "Test",
    "email": "",
    "password": "123456",
    "confirmPassword": "123456"
}
```

2. **Email không hợp lệ:**

```json
{
    "name": "Test",
    "email": "invalid-email",
    "password": "123456",
    "confirmPassword": "123456"
}
```

3. **Mật khẩu quá ngắn:**

```json
{
    "name": "Test",
    "email": "test@example.com",
    "password": "123",
    "confirmPassword": "123"
}
```

4. **Mật khẩu không khớp:**

```json
{
    "name": "Test",
    "email": "test@example.com",
    "password": "123456",
    "confirmPassword": "654321"
}
```

---

## 🚀 READY TO GO!

Backend API đã sẵn sàng! Bạn có thể:

1. Test bằng một trong 3 cách trên
2. Kết nối với Frontend (tôi sẽ hướng dẫn tiếp)

**Hãy thử test API trước, sau đó báo tôi kết quả nhé!** 🎉
