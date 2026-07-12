// ============================================================
// FILE: check_session.js
// MỤC ĐÍCH: Bảo vệ trang — chỉ cho phép user đã đăng nhập truy cập
// Dùng ở: order.html, balance.html (các trang cần đăng nhập)
// ============================================================

function requireAuth(redirectUrl) {
  redirectUrl = redirectUrl || "./login.html";

  auth.onAuthStateChanged(function (user) {
    if (!user) {
      // Chưa đăng nhập → chuyển về trang login
      window.location.href = redirectUrl;
    }
  });
}

// Lấy thông tin role của user hiện tại từ Firestore
function getCurrentUserRole() {
  if (!auth.currentUser) return Promise.resolve(null);

  return db.collection("users")
    .doc(auth.currentUser.uid)
    .get()
    .then(function (doc) {
      return doc.exists ? doc.data().role_id : 2;
    });
}
