// ============================================================
// FILE: app.js
// CHỨC NĂNG: Khởi tạo Firebase và kiểm tra kết nối thành công
//
// YÊU CẦU BÀI 1: In thông báo "Firebase connected successfully!" ra Console
// ============================================================

try {
  // firebase.initializeApp() — Kết nối app web với Firebase project
  // Tham số: firebaseConfig (định nghĩa ở firebase-config.js)
  // Biến `firebase` có sẵn nhờ thẻ <script> CDN trong index.html
  firebase.initializeApp(firebaseConfig);

  // In thông báo ra Console (F12) để xác nhận kết nối thành công
  console.log("✅ Firebase connected successfully!");

} catch (error) {
  // Bắt lỗi nếu config sai hoặc SDK chưa load
  console.error("❌ Firebase connection failed:", error.message);
  console.log("→ Kiểm tra firebase-config.js và thứ tự load script trong index.html");
}
