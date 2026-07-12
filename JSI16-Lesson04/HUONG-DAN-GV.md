# Hướng dẫn Giáo viên — Buổi 4

> Code mẫu đầy đủ trong folder `JSI16-Lesson04/`.  
> GV **không cần code live** — mở file và giải thích theo thứ tự dưới đây.

---

## Trước buổi học (15 phút)

1. Tạo sẵn 1 Firebase project demo trên Console
2. Bật **Authentication** → Email/Password + Google
3. Bật **Firestore Database** → Start in **test mode**
4. Copy `firebaseConfig` vào file mẫu `src/js/firebase-config.js`
5. Test chạy project bằng Live Server

---

## Kịch bản dạy theo thời gian

### Phần 1: Giới thiệu (10 phút)

**Nói:** "Buổi trước ta làm giao diện MindX Coffee. Hôm nay thêm tính năng đăng nhập, đặt hàng, ví điện tử bằng Firebase."

**Demo:** Mở trang chủ → click icon user → chưa đăng nhập thì thấy "Đăng nhập / Đăng ký"

---

### Phần 2: Firebase SDK (10 phút)

**Mở file:** `src/js/firebase-config.js`

**Giải thích từng dòng:**
```javascript
firebase.initializeApp(firebaseConfig);  // Kết nối project
const auth = firebase.auth();              // Dùng cho đăng nhập
const db = firebase.firestore();           // Dùng cho lưu dữ liệu
```

**Mở file:** `login.html` (cuối file) → chỉ thứ tự load script:
1. Firebase SDK (CDN)
2. `firebase-config.js`
3. `login.js`

**Yêu cầu HS:** Mở Firebase Console, tạo project, copy config vào file của mình.

---

### Phần 3: Đăng ký (15 phút)

**Mở file:** `register.html` → giải thích cấu trúc form  
**Mở file:** `src/js/register.js` → giải thích 4 bước có comment

**Demo live:**
1. Mở `register.html`
2. Đăng ký email test
3. Vào Firebase Console → Authentication → Users → thấy user mới
4. Vào Firestore → collection `users` → thấy `role_id: 2`

**Yêu cầu HS:** Làm theo, đăng ký tài khoản của mình.

---

### Phần 4: Đăng nhập (15 phút)

**Mở file:** `src/js/login.js`

**Giải thích 2 phần:**
- Phần 1: `signInWithEmailAndPassword` — dòng 18–27
- Phần 2: `signInWithPopup(GoogleAuthProvider)` — dòng 33–55

**Demo live:**
1. Đăng nhập bằng email vừa tạo
2. Quay về `index.html` → menu user hiện email + "Đăng xuất"

**Mở file:** `src/js/guest.js` → giải thích `onAuthStateChanged` và `signOut()`

**Yêu cầu HS:** Code xong phần login, test đăng nhập/đăng xuất.

---

### Phần 5: Quản lý đơn hàng (20 phút)

**Mở file:** `order.html` → giải thích bảng `<table>` và modal đặt hàng

**Mở file:** `src/js/order.js` → giải thích:
- `requireAuth()` — bảo vệ trang
- `role_id === 1` → Admin thấy nút Xóa
- `role_id === 2` → Guest chỉ thấy đơn của mình

**Demo live:**
1. Đăng nhập → vào `order.html`
2. Click "Đặt đồ uống" → điền form → Xác nhận
3. Firestore → collection `orders` → thấy đơn mới

**Tạo Admin demo:** Vào Firestore → `users/{uid}` → sửa `role_id` thành `1` → reload → thấy nút Xóa

**Yêu cầu HS:** Làm theo, tạo ít nhất 1 đơn hàng.

---

### Phần 6: Ví điện tử (10 phút)

**Mở file:** `balance.html` + `src/js/balance.js`

**Demo live:**
1. Vào Ví điện tử → số dư 0đ
2. Nạp 50.000đ → số dư cập nhật
3. Firestore → collection `wallets` → thấy balance

**Yêu cầu HS:** Nạp tiền thử.

---

### Phần 7: Kiểm tra & dặn dò (10 phút)

**Checklist nhanh cho từng HS:**
- [ ] Firebase config đã điền
- [ ] Đăng ký được
- [ ] Đăng nhập được
- [ ] Menu đổi sau khi login
- [ ] Đăng xuất được
- [ ] Đặt hàng được
- [ ] Nạp tiền được

---

## Xử lý lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|------------|
| `Firebase: Error (auth/...)` | Chưa bật Email/Password trên Console |
| `firebase is not defined` | Script SDK chưa load trước config |
| Google login lỗi popup | Bật Google Auth trên Console + chọn Support email |
| Firestore permission denied | Firestore chưa bật hoặc rules quá chặt → dùng test mode |
| Menu không đổi | Thiếu `guest.js` hoặc thiếu `id="author-menu-drd"` |

---

## Firestore Security Rules (test mode — chỉ dùng khi học)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> Cảnh báo HS: Test mode chỉ dùng khi học, không deploy production.
