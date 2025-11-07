# 📸 Avatar Upload với Cloudinary

## ✅ Setup đã hoàn tất!

### 🎯 Tính năng:

- ✅ Upload avatar lên Cloudinary (cloud storage)
- ✅ Tự động resize: 500x500px
- ✅ Tự động crop to face (smart crop)
- ✅ Optimize quality
- ✅ Giới hạn: 5MB/file
- ✅ Support: JPG, PNG, GIF, WEBP

### 📦 Packages đã cài:

```bash
npm install cloudinary multer multer-storage-cloudinary
```

### 🔧 Cấu hình:

#### 1. Tạo tài khoản Cloudinary (MIỄN PHÍ):

- Truy cập: https://cloudinary.com/users/register/free
- Đăng ký với email
- Xác nhận email

#### 2. Lấy credentials:

- Vào Dashboard: https://console.cloudinary.com/console
- Copy:
    - **Cloud Name** (ví dụ: `dxy123abc`)
    - **API Key** (ví dụ: `123456789012345`)
    - **API Secret** (ví dụ: `AbCdEfGhIjKlMnOpQrStUvWxYz`)

#### 3. Cập nhật `.env`:

```env
CLOUDINARY_CLOUD_NAME=dxy123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

### 🚀 Cách sử dụng:

#### Frontend:

```typescript
// User click vào avatar hoặc "Change Photo"
const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload lên Cloudinary qua API
    const response = await userApi.uploadAvatar(file);

    // Response trả về:
    {
        success: true,
        data: {
            avatar: "https://res.cloudinary.com/...", // Cloudinary URL
            user: { ... }
        }
    }
};
```

#### Backend API:

```
POST /api/users/avatar
Headers: Authorization: Bearer <token>
Body: FormData with "avatar" file

Response:
{
    "success": true,
    "message": "Upload avatar thành công",
    "data": {
        "avatar": "https://res.cloudinary.com/dxy123abc/image/upload/v1234567890/project-management-ai/avatars/abc123.jpg",
        "user": { ... }
    }
}
```

### 📁 Files đã tạo/sửa:

**Backend:**

- ✅ `config/cloudinary.js` - Cloudinary config & Multer setup
- ✅ `src/routes/user.routes.js` - POST /api/users/avatar route
- ✅ `src/controllers/UserController.js` - uploadAvatar() method
- ✅ `.env` - Thêm CLOUDINARY\_\* variables

**Frontend:**

- ✅ `src/services/api.ts` - uploadAvatar() function
- ✅ `src/pages/Profile.tsx` - handleAvatarChange() & file input

### 🎨 UI Flow:

1. User click vào camera icon hoặc "Change Photo"
2. File input mở → user chọn ảnh
3. Frontend validate (type, size)
4. Upload qua API (FormData)
5. Backend:
    - Multer nhận file
    - Upload lên Cloudinary
    - Cloudinary transform (resize, crop)
    - Trả về URL
6. Save URL vào MongoDB
7. Frontend refresh user data
8. Header & Sidebar cập nhật avatar mới

### ⚡ Cloudinary Features:

**Free Plan:**

- 25 GB storage
- 25 GB bandwidth/tháng
- 25,000 transformations/tháng
- CDN global

**Auto Transformations:**

```javascript
{
    width: 500,
    height: 500,
    crop: "fill",
    gravity: "face",  // Smart crop to face
    quality: "auto"   // Auto optimize
}
```

### 🔒 Security:

- ✅ Auth required (authMiddleware)
- ✅ File type validation (images only)
- ✅ File size limit (5MB)
- ✅ Cloudinary API credentials in .env (không commit)

### 📊 MongoDB Schema:

```javascript
avatar: {
    type: String,
    default: "https://aic.com.vn/wp-content/uploads/2024/10/avatar-fb-mac-dinh-2.jpg"
}
```

Chỉ lưu URL string, không lưu file binary!

### 🐛 Troubleshooting:

**Lỗi "Upload failed":**

- Check CLOUDINARY\_\* trong .env
- Check internet connection
- Check file size < 5MB
- Check file type (image/\*)

**Avatar không update:**

- Check token trong localStorage
- Check Network tab (F12) → Upload request
- Check backend console log

### 📝 Example URLs:

**Cloudinary URL:**

```
https://res.cloudinary.com/dxy123abc/image/upload/
v1234567890/
project-management-ai/avatars/
abc123.jpg
```

**With transformations:**

```
https://res.cloudinary.com/dxy123abc/image/upload/
w_500,h_500,c_fill,g_face,q_auto/
v1234567890/
project-management-ai/avatars/
abc123.jpg
```

---

## ✅ Done! Ready to use!

Giờ bạn có thể:

1. Setup Cloudinary credentials
2. Test upload avatar
3. Ảnh tự động optimize và lưu trên cloud
4. Header & Sidebar update real-time

🎉 Không còn lưu ảnh trong MongoDB nữa!
