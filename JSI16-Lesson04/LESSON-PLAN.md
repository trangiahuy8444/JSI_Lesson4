# JSI16 — Buổi 4: Firebase và Xác thực người dùng

> **Dự án:** MindX Coffee — Quản lý đặt hàng cà phê  
> **Thời lượng:** 120 phút | **Độ tuổi:** 13–16  
> **Tiên quyết:** JSI16-Lesson03 (HTML/CSS cơ bản, giao diện trang chủ)

---

## Mục tiêu bài học

### Kiến thức
- Hiểu khái niệm và tầm quan trọng của **Firebase Authentication**
- Nắm các phương thức đăng nhập: Email/Password, Google Auth
- Hiểu logic phân quyền: **Guest** vs **Admin**

### Kỹ năng
- Cấu hình và tích hợp Firebase Auth vào website
- Xây dựng tính năng đăng ký, đăng nhập, đăng xuất
- Thiết kế giao diện quản lý đơn hàng và ví điện tử
- Phân quyền chức năng theo `role_id`

---

## Tiến trình dạy — học

| Hoạt động | Thời gian | Nội dung |
|-----------|-----------|----------|
| **01** Warm-up & chữa homework | 10 phút | Điểm danh, chữa bài Buổi 3 |
| **02** Giới thiệu Firebase Auth | 2 phút | Tổng quan dịch vụ xác thực của Google |
| **03** Email/Password Auth | 5 phút | Demo đăng ký & đăng nhập bằng email |
| **04** Google Authentication | 5 phút | Demo đăng nhập bằng Google |
| **05** Tích hợp Firebase SDK | 5 phút | Cài SDK, tạo `firebase-config.js` |
| **06** Cấu hình Authentication | 5 phút | Bật Email/Password & Google trên Console |
| **07** Thực hành Auth | 15 phút | Code `register.js`, `login.js`, `guest.js` |
| **08** Thiết kế trang Order | 15 phút | HTML/CSS bảng quản lý đơn hàng |
| **09** Phân quyền Admin & Guest | — | `role_id`: 1 = Admin, 2 = Guest |
| **10** Form đặt đồ uống | 10 phút | Xây dựng form trên `order.html` |
| **11** Giao diện ví điện tử | 10 phút | Thiết kế `balance.html` |
| **12** Kiểm tra & đánh giá | 5 phút | Peer review + feedback GV |
| **13** Củng cố & dặn dò | 5 phút | Tóm tắt, giao homework |

---

## Cấu trúc project

```
JSI16-Lesson04/
├── index.html          ← Trang chủ (Guest view)
├── login.html          ← Đăng nhập
├── register.html       ← Đăng ký
├── order.html          ← Quản lý đơn hàng
├── balance.html        ← Ví điện tử
├── LESSON-PLAN.md      ← File này
└── src/
    ├── css/
    │   ├── main.css
    │   ├── guest.css
    │   └── auth.css
    ├── js/
    │   ├── firebase-config.js   ← Config Firebase (HV điền)
    │   ├── register.js          ← Đăng ký tài khoản
    │   ├── login.js             ← Đăng nhập
    │   ├── guest.js             ← Đăng xuất (signOut)
    │   ├── check_session.js     ← Kiểm tra phiên đăng nhập
    │   └── order.js             ← Logic đơn hàng + phân quyền
    └── img/
```

---

## Nội dung kỹ thuật chi tiết

### 1. Tích hợp Firebase SDK

**Bước 1:** Lấy `firebaseConfig` từ Firebase Console → Project Settings → Your apps

**Bước 2:** Thêm script CDN trước `</body>`:

```html
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script src="./src/js/firebase-config.js"></script>
```

**Bước 3:** Tạo `firebase-config.js`:

```javascript
const firebaseConfig = { /* config từ Console */ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
```

### 2. Cấu hình Authentication trên Console

1. Firebase Console → **Authentication** → **Get Started**
2. Tab **Sign-in method**:
   - Bật **Email/Password** → Save
   - Bật **Google** → điền Support email → Save

### 3. Đăng ký (register.js)

```javascript
auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const role_id = 2; // Mặc định Guest
    // Lưu thông tin user vào Firestore
    db.collection("users").doc(userCredential.user.uid).set({
      email: email,
      role_id: role_id
    });
  });
```

### 4. Đăng nhập (login.js)

```javascript
auth.signInWithEmailAndPassword(email, password)
  .then(() => window.location.href = "./index.html")
  .catch((error) => console.error(error.message));
```

### 5. Đăng xuất (guest.js)

```javascript
function logout() {
  auth.signOut()
    .then(() => window.location.href = "./login.html")
    .catch((error) => console.error(error.message));
}
```

### 6. Phân quyền Admin & Guest

| role_id | Vai trò | Quyền |
|---------|---------|-------|
| `1` | Admin | Xóa đơn, cập nhật trạng thái, xem tất cả |
| `2` | Guest | Đặt hàng, xem đơn của mình |

```javascript
// Kiểm tra role và ẩn/hiện nút
if (role_id === 1) {
  deleteBtn.style.display = "block"; // Admin mới thấy
}
```

---

## Checklist hoàn thành buổi học

- [ ] Firebase project đã tạo, SDK đã tích hợp
- [ ] Email/Password và Google Auth đã bật trên Console
- [ ] `register.html` + `register.js` hoạt động
- [ ] `login.html` + `login.js` hoạt động
- [ ] Nút Đăng xuất gọi `signOut()` thành công
- [ ] `order.html` hiển thị bảng đơn hàng
- [ ] Phân quyền Admin/Guest theo `role_id`
- [ ] `balance.html` giao diện ví điện tử

---

## Tài liệu tham khảo

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth/web/start)
- [Firebase Console](https://console.firebase.google.com/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
