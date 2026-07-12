# Bài 1 — Cài đặt Firebase và tích hợp vào dự án QUIZ

> Trải nghiệm demo: [https://quickquiz-4cb8a.web.app/](https://quickquiz-4cb8a.web.app/)

---

## Yêu cầu

1. Tạo một dự án Firebase mới trên Firebase Console
2. Thiết lập Firebase SDK trong ứng dụng web (HTML, CSS, JS)
3. Kết nối ứng dụng với Firebase bằng `firebaseConfig`
4. Kiểm tra kết nối thành công (in thông báo trên Console)

---

## Cấu trúc thư mục (Bài 1)

```
bai1/quiz/
├── index.html
└── js/
    ├── firebase-config.js   ← Config Firebase
    └── app.js               ← Khởi tạo + kiểm tra kết nối
```

---

## Bước 1: Tạo Firebase Project

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. **Add project** → đặt tên, ví dụ: `my-quick-quiz`
3. Chờ tạo xong → **Continue**

---

## Bước 2: Đăng ký Web App & lấy firebaseConfig

1. Trong project, chọn biểu tượng **Web** (`</>`)
2. Nickname: `Quick Quiz Web` → **Register app**
3. Firebase sẽ hiện một đoạn code dài — **CHỈ copy phần `firebaseConfig`**

---

### ⚠️ Quan trọng: Chỉ copy `firebaseConfig`, KHÔNG copy toàn bộ

Firebase Console thường hiện code dạng **ES Module** (có `import`):

```javascript
// ❌ KHÔNG copy phần này vào project
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = { ... };

const app = initializeApp(firebaseConfig);      // ❌ KHÔNG copy
const analytics = getAnalytics(app);            // ❌ KHÔNG copy
```

**Lý do:** Project homework dùng **Firebase CDN** (thẻ `<script>` trong `index.html`), không dùng `import`. Copy cả đoạn trên sẽ gây lỗi:
- `Cannot use import statement outside a module`
- `firebase is not defined`

---

### ✅ Chỉ copy phần này

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-quick-quiz.firebaseapp.com",
  projectId: "my-quick-quiz",
  storageBucket: "my-quick-quiz.firebasestorage.app",
  messagingSenderId: "89609090959",
  appId: "1:89609090959:web:05500472f6ab2824757dfa",
  measurementId: "G-6SNEWYGH1L"   // tùy chọn, có thì thêm
};
```

Dán vào file `js/firebase-config.js`, thay các giá trị `YOUR_*` bằng config của bạn.

---

### Ai làm gì?

| Phần | File | Ai viết |
|------|------|---------|
| `firebaseConfig` | `firebase-config.js` | **Bạn copy** từ Console |
| Load Firebase SDK | `index.html` | **Đã có sẵn** (CDN) |
| `firebase.initializeApp(...)` | `app.js` | **Đã có sẵn** |

Bạn **không cần** tự viết `import` hay `initializeApp` — project đã tách sẵn.

---

## Bước 3: Thiết lập Firebase SDK trong project

Mở `bai1/quiz/index.html` — phần cuối file đã có sẵn thứ tự script:

```html
<!-- 1. Firebase SDK (CDN) — load TRƯỚC -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>

<!-- 2. File config của bạn -->
<script src="js/firebase-config.js"></script>

<!-- 3. Logic kiểm tra kết nối -->
<script src="js/app.js"></script>
```

> **Thứ tự quan trọng:** SDK → config → app.js. Sai thứ tự sẽ lỗi `firebase is not defined`.

---

## Bước 4: Điền firebaseConfig

Mở `js/firebase-config.js`, thay `YOUR_*` bằng config thật:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Bước 5: Kiểm tra kết nối

File `js/app.js` đã có code kiểm tra:

```javascript
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase connected successfully!");
```

**Cách test:**
1. Mở `index.html` bằng **Live Server**
2. Nhấn **F12** → tab **Console**
3. Phải thấy: `✅ Firebase connected successfully!`

---

## Checklist nộp Bài 1

- [ ] Đã tạo Firebase project trên Console
- [ ] Đã thêm Web app và copy `firebaseConfig`
- [ ] Đã điền config vào `firebase-config.js`
- [ ] Console hiện `✅ Firebase connected successfully!`
- [ ] Chụp màn hình Console làm bằng chứng

---

## Xử lý lỗi

| Lỗi | Cách xử lý |
|-----|------------|
| `Cannot use import statement outside a module` | Đã copy nhầm dòng `import` — xóa hết, chỉ giữ `firebaseConfig` |
| `firebase is not defined` | SDK chưa load trước `app.js` — kiểm tra thứ tự `<script>` |
| `Firebase: Firebase App named '[DEFAULT]' already exists` | Gọi `initializeApp` 2 lần — xóa `initializeApp` trong `firebase-config.js`, chỉ để trong `app.js` |
| Config sai / app không chạy | So lại từng field với Console → Project Settings → Your apps |

---

## Tài liệu tham khảo

- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Firebase Console](https://console.firebase.google.com/)
