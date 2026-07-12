# Hướng dẫn Học sinh — Buổi 4: Firebase Auth

> Làm theo từng bước. Mỗi bước xong thì **test ngay** trước khi sang bước tiếp.

---

## Bước 0: Chuẩn bị

1. Copy folder `JSI16-Lesson04` về máy
2. Mở bằng VS Code / Cursor
3. Cài extension **Live Server**
4. Có tài khoản Google

---

## Bước 1: Tạo Firebase Project (10 phút)

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. **Add project** → đặt tên: `mindx-coffee-[tên-bạn]`
3. Chọn biểu tượng Web `</>` → đặt tên app → **Register**
4. Copy đoạn `firebaseConfig`
5. Mở `src/js/firebase-config.js` → dán config vào (thay `YOUR_*`)

**Test:** Mở `index.html` bằng Live Server → F12 Console → thấy:
```
✅ Firebase connected successfully!
```

---

## Bước 2: Bật Authentication (5 phút)

1. Firebase Console → **Build** → **Authentication** → **Get Started**
2. Tab **Sign-in method**:
   - Bật **Email/Password** → Save
   - Bật **Google** → chọn Support email → Save

---

## Bước 3: Bật Firestore (5 phút)

1. Firebase Console → **Build** → **Firestore Database** → **Create database**
2. Chọn **Start in test mode** → chọn region → **Enable**

---

## Bước 4: Đăng ký tài khoản (10 phút)

**File cần xem:** `register.html` + `src/js/register.js`

1. Mở `register.html` bằng Live Server
2. Nhập email + mật khẩu → **Đăng ký**
3. Kiểm tra Firebase Console:
   - Authentication → Users → có user mới
   - Firestore → `users` → có document với `role_id: 2`

---

## Bước 5: Đăng nhập (10 phút)

**File cần xem:** `login.html` + `src/js/login.js`

1. Mở `login.html`
2. Đăng nhập bằng email vừa tạo
3. Thử đăng nhập Google (nút "Đăng nhập với Google")
4. Sau khi login → về `index.html` → click icon user → thấy email của bạn

---

## Bước 6: Đăng xuất (5 phút)

**File cần xem:** `src/js/guest.js`

1. Click icon user → **Đăng xuất**
2. Menu đổi lại thành "Đăng nhập / Đăng ký"
3. Thử vào `order.html` khi chưa login → tự chuyển về `login.html`

---

## Bước 7: Đặt hàng (15 phút)

**File cần xem:** `order.html` + `src/js/order.js`

1. Đăng nhập lại
2. Vào **Đơn hàng** (icon túi hoặc menu)
3. Click **Đặt đồ uống** → điền thông tin → **Xác nhận**
4. Kiểm tra bảng hiện đơn hàng
5. Firestore → collection `orders` → thấy document mới

---

## Bước 8: Phân quyền Admin (5 phút)

1. Vào Firestore → `users` → document của bạn
2. Sửa `role_id` từ `2` thành `1`
3. Reload `order.html` → thấy nút **Xóa** xuất hiện
4. Sửa lại `role_id: 2` → nút Xóa biến mất

> **Hiểu bài:** Admin (1) có quyền cao hơn Guest (2)

---

## Bước 9: Ví điện tử (10 phút)

**File cần xem:** `balance.html` + `src/js/balance.js`

1. Vào **Ví điện tử**
2. Nạp 50.000đ → chọn ngân hàng → **Xác nhận**
3. Số dư cập nhật
4. Firestore → collection `wallets` → thấy balance

---

## Checklist nộp bài

- [ ] `firebase-config.js` đã điền config thật
- [ ] Đăng ký Email/Password thành công
- [ ] Đăng nhập Email thành công
- [ ] Đăng nhập Google thành công (bonus)
- [ ] Menu đổi sau login/logout
- [ ] Đặt được ít nhất 1 đơn hàng
- [ ] Nạp tiền ví thành công
- [ ] Chụp màn hình Console + Firestore + giao diện

---

## Cấu trúc file (tham khảo)

| File | Chức năng |
|------|-----------|
| `firebase-config.js` | Kết nối Firebase |
| `register.js` | Đăng ký tài khoản |
| `login.js` | Đăng nhập Email + Google |
| `guest.js` | Đăng xuất + menu động |
| `check_session.js` | Bảo vệ trang cần login |
| `order.js` | Quản lý đơn hàng |
| `balance.js` | Ví điện tử |
| `index.js` | Hiển thị sản phẩm |
