// ============================================================
// FILE: firebase-config.js
// CHỨC NĂNG: Lưu thông tin cấu hình để kết nối project web với Firebase
//
// HƯỚNG DẪN:
//   - CHỈ điền object firebaseConfig bên dưới
//   - KHÔNG copy dòng import hay initializeApp từ Firebase Console
//   - Lấy config tại: Firebase Console → Project Settings → Your apps
// ============================================================

// Object chứa "địa chỉ" của Firebase project trên cloud
// Mỗi field là 1 thông tin định danh project — Firebase dùng để biết app nào đang kết nối
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Khóa API công khai của project
  authDomain: "YOUR_AUTH_DOMAIN",      // Domain xác thực (vd: ten-project.firebaseapp.com)
  projectId: "YOUR_PROJECT_ID",        // ID duy nhất của project
  storageBucket: "YOUR_STORAGE_BUCKET", // Bucket lưu trữ file (dùng ở buổi sau)
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // ID gửi thông báo push
  appId: "YOUR_APP_ID"                 // ID của web app trong project
  // measurementId: "G-..."            // (Tùy chọn) Dùng cho Google Analytics
};
