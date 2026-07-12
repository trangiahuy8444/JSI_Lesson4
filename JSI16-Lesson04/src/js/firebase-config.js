// ============================================================
// FILE: firebase-config.js
// MỤC ĐÍCH: Kết nối project web với Firebase
// HƯỚNG DẪN: Thay YOUR_* bằng config từ Firebase Console
//   → Project Settings → Your apps → SDK setup and configuration
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Khởi tạo Firebase App
firebase.initializeApp(firebaseConfig);

// Tạo biến toàn cục để dùng ở các file JS khác
const auth = firebase.auth();       // Xác thực người dùng
const db = firebase.firestore();    // Cơ sở dữ liệu Firestore

console.log("✅ Firebase connected successfully!");
