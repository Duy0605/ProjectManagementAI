# 🔍 HƯỚNG DẪN DEBUG - TẠI SAO USER KHÔNG LƯU VÀO DATABASE

## 🎯 VẤN ĐỀ

Bạn đăng ký thành công (nhận được response success) nhưng user không xuất hiện trong MongoDB Compass.

---

## ✅ CÁC BƯỚC ĐÃ LÀM

1. ✅ Thêm logging vào UserController
2. ✅ Khởi động lại server
3. ✅ Mở file test-register.html

---

## 🧪 CÁC BƯỚC DEBUG

### BƯỚC 1: Kiểm tra server có chạy không

```bash
netstat -ano | findstr :5000
```

Nếu thấy kết quả → Server đang chạy ✅

### BƯỚC 2: Test API từ HTML

1. Mở file: `backend/test-register.html`
2. Click nút "Đăng Ký"
3. **QUAN TRỌNG**: Xem terminal backend

Bạn sẽ thấy log như này:

```
🔔 REGISTER REQUEST RECEIVED
📦 Request Body: { name: 'Test User', email: 'user1234@example.com', ... }
💾 Creating user in database...
✅ User created successfully: 672e1234567890abcdef
🔑 Generating JWT token...
✅ Registration completed successfully!
📧 Email: user1234@example.com
🎫 Token generated
```

### BƯỚC 3: Kiểm tra database NGAY LẬP TỨC

**Trong terminal khác**, chạy:

```bash
cd backend
node list-users.js
```

Hoặc **refresh MongoDB Compass** (F5 hoặc click nút Refresh)

---

## 🔍 CÁC TRƯỜNG HỢP CÓ THỂ XẢY RA

### Trường hợp 1: Server không nhận được request

**Triệu chứng:**

- Không thấy log `🔔 REGISTER REQUEST RECEIVED` trong terminal
- HTML hiển thị lỗi "Unable to connect"

**Nguyên nhân:**

- Server không chạy
- CORS blocking request
- Port sai

**Giải pháp:**

```bash
# Kiểm tra server
netstat -ano | findstr :5000

# Xem log server
# Terminal sẽ có: "🚀 Server running on port 5000"
```

---

### Trường hợp 2: Request đến nhưng validation lỗi

**Triệu chứng:**

- Thấy log `🔔 REGISTER REQUEST RECEIVED`
- KHÔNG thấy log `💾 Creating user in database...`
- Response trả về lỗi validation

**Nguyên nhân:**

- Email không hợp lệ
- Password < 6 ký tự
- Password không khớp

**Giải pháp:**

- Xem response trong HTML (bên phải form)
- Fix data theo thông báo lỗi

---

### Trường hợp 3: User được tạo nhưng lưu nhầm database

**Triệu chứng:**

- Thấy log `✅ User created successfully`
- Nhưng không thấy trong Compass

**Nguyên nhân:**

- Đang xem nhầm database
- Database khác trong connection string

**Giải pháp:**

1. Kiểm tra .env:

```bash
# Xem file backend/.env
MONGODB_URI=mongodb://localhost:27017/project-management-ai
```

2. Kiểm tra database thực tế:

```bash
cd backend
node check-databases.js
```

3. Trong Compass, đảm bảo đang xem database: `project-management-ai`

---

### Trường hợp 4: Compass không tự động refresh

**Triệu chứng:**

- User đã được tạo trong database
- Nhưng Compass không hiển thị

**Nguyên nhân:**

- MongoDB Compass cache data
- Không tự động refresh

**Giải pháp:**

1. **Click nút Refresh** ở góc trên bên phải
2. Hoặc **đóng và mở lại collection** `users`
3. Hoặc **F5** trong Compass
4. Hoặc **disconnect và connect lại**

---

## 🧪 TEST SCRIPT ĐỂ XÁC NHẬN

Chạy script này SAU KHI đăng ký:

```bash
cd backend
node list-users.js
```

Output sẽ là:

```
📊 TOTAL USERS: 4  ← Tăng từ 3 lên 4

1. 👤 Test User           ← USER MỚI
   📧 Email: user1234@example.com
   🎭 Role: member
   📅 Created: 27/10/2025 (vừa xong)

2. 👤 Bob Wilson
   📧 Email: bob@projectai.com
   ...
```

---

## 💡 GỢI Ý DEBUG

### Debug 1: Xem log realtime

Terminal backend đang chạy `npm run dev` sẽ hiển thị:

✅ **Success:**

```
🔔 REGISTER REQUEST RECEIVED
📦 Request Body: { ... }
💾 Creating user in database...
✅ User created successfully: 672e...
✅ Registration completed successfully!
```

❌ **Error:**

```
🔔 REGISTER REQUEST RECEIVED
📦 Request Body: { ... }
❌ Register Error: E11000 duplicate key error
```

### Debug 2: Check MongoDB connection

```javascript
// Trong terminal backend
const mongoose = require("mongoose");
console.log("Connected:", mongoose.connection.readyState === 1);
```

1 = Connected ✅
0 = Disconnected ❌

---

## 🎯 CHECKLIST XÁC NHẬN

Sau khi đăng ký, hãy kiểm tra:

- [ ] HTML hiển thị "✅ THÀNH CÔNG!"
- [ ] Token xuất hiện trong response
- [ ] Terminal backend có log `🔔 REGISTER REQUEST RECEIVED`
- [ ] Terminal backend có log `✅ User created successfully`
- [ ] Chạy `node list-users.js` thấy user mới
- [ ] Refresh MongoDB Compass thấy user mới

Nếu TẤT CẢ đều ✅ → User ĐÃ được lưu vào database!

---

## 🚨 NẾU VẪN KHÔNG THẤY USER

Hãy gửi cho tôi:

1. **Screenshot HTML response** (bên phải form)
2. **Copy log từ terminal backend** (từ lúc click Đăng Ký)
3. **Kết quả của lệnh:**
    ```bash
    cd backend
    node list-users.js
    ```

Tôi sẽ giúp bạn debug!

---

## 📞 QUICK TEST

Chạy lệnh này để test API trực tiếp:

```bash
cd backend
node -e "
const http = require('http');
const data = JSON.stringify({
  name: 'Direct Test User',
  email: 'direct' + Date.now() + '@test.com',
  password: '123456',
  confirmPassword: '123456'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let result = '';
  res.on('data', (chunk) => { result += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', result);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();
"
```

Nếu thành công → API hoạt động bình thường!
