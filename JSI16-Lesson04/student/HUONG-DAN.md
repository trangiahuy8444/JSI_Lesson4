# Hướng dẫn thực hành — Buổi 4

> **Folder làm bài:** `JSI16-Lesson04/student/`  
> Giáo viên sẽ demo code hoàn chỉnh trên màn hình — bạn code theo hướng dẫn dưới đây.

---

## Chuẩn bị

1. Clone repo (đã có folder `student/`)
2. Mở `JSI16-Lesson04/student/` bằng VS Code / Cursor + Live Server
3. Có tài khoản Google để tạo Firebase project

---

## Cấu trúc folder

```
student/
├── HUONG-DAN.md          ← File này
├── index.html            ← Trang chủ (từ Lesson 3)
├── login.html            ← HTML sẵn, JS làm theo buổi học
├── register.html
├── order.html
├── balance.html
└── src/js/
    ├── firebase-config.js   ← Bước 1
    ├── register.js          ← Bước 2
    ├── login.js             ← Bước 3
    ├── guest.js             ← Bước 4
    ├── check_session.js     ← Bước 5
    ├── order.js             ← Bước 6
    ├── balance.js           ← Bước 7
    └── index.js             ← Bước 8
```

Mỗi file JS có dòng `// TODO` — làm theo khi giáo viên hướng dẫn từng phần.

---

## Các bước thực hành

### Bước 1: Firebase Config
- Tạo project trên [Firebase Console](https://console.firebase.google.com/)
- Copy **chỉ object `firebaseConfig`** vào `src/js/firebase-config.js`
- Thêm Firebase SDK vào `index.html` (theo GV)
- F12 Console → `✅ Firebase connected successfully!`

### Bước 2: Đăng ký
- Code `register.js` theo GV demo
- Bật Email/Password trên Firebase Console
- Test đăng ký tài khoản

### Bước 3: Đăng nhập
- Code `login.js` — Email/Password + Google Auth
- Test đăng nhập → menu đổi hiện email

### Bước 4: Menu & Đăng xuất
- Code `guest.js` — menu động + nút đăng xuất

### Bước 5: Bảo vệ trang
- Code `check_session.js` — chỉ dùng ở `order.html`, `balance.html`

### Bước 6: Quản lý đơn hàng
- Code `order.js` — đặt hàng + phân quyền Admin/Guest

### Bước 7: Ví điện tử
- Code `balance.js` — hiển thị số dư + nạp tiền

### Bước 8: Sản phẩm trang chủ
- Code `index.js` — hiển thị danh sách đồ uống

---

## Cuối buổi: Pull đáp án

```bash
git pull
```

Folder `JSI16-Lesson04/complete/` sẽ xuất hiện — dùng để so sánh với bài của bạn.

---

## Lưu ý

- **Chỉ copy `firebaseConfig`** — không copy dòng `import` từ Firebase Console
- `index.html` là trang công khai — **không** dùng `requireAuth()` ở đây
- `order.html` và `balance.html` cần đăng nhập mới vào được

---

## Checklist

- [ ] Firebase config đã điền
- [ ] Đăng ký / đăng nhập / đăng xuất OK
- [ ] Menu động trên trang chủ
- [ ] Đặt hàng thành công
- [ ] Nạp tiền ví thành công
- [ ] Đã `git pull` và xem folder `complete/`
