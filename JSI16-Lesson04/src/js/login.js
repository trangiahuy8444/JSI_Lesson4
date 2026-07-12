// ============================================================
// FILE: login.js
// MỤC ĐÍCH: Xử lý đăng nhập Email/Password và Google Auth
// API dùng:
//   - auth.signInWithEmailAndPassword(email, password)
//   - auth.signInWithPopup(GoogleAuthProvider)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  // --- PHẦN 1: Đăng nhập bằng Email/Password ---
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        // Đăng nhập thành công → chuyển về trang chủ
        window.location.href = "./index.html";
      })
      .catch(function (error) {
        console.error("Login error:", error.message);
        alert("Lỗi đăng nhập: " + error.message);
      });
  });

  // --- PHẦN 2: Đăng nhập bằng Google ---
  const googleBtn = document.getElementById("googleLoginBtn");

  googleBtn.addEventListener("click", function () {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;

        // Nếu user mới (đăng nhập Google lần đầu) → lưu vào Firestore
        return db.collection("users").doc(user.uid).get().then(function (doc) {
          if (!doc.exists) {
            return db.collection("users").doc(user.uid).set({
              email: user.email,
              displayName: user.displayName,
              role_id: 2,
              createdAt: new Date()
            });
          }
        });
      })
      .then(function () {
        window.location.href = "./index.html";
      })
      .catch(function (error) {
        console.error("Google login error:", error.message);
        alert("Lỗi Google login: " + error.message);
      });
  });
});
