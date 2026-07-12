// ============================================================
// FILE: register.js
// MỤC ĐÍCH: Xử lý đăng ký tài khoản bằng Email/Password
// API dùng: auth.createUserWithEmailAndPassword(email, password)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn form reload trang

    // Bước 1: Lấy dữ liệu từ form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Bước 2: Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Bước 3: Gọi Firebase Auth tạo tài khoản
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        // userCredential.user chứa thông tin user vừa tạo
        const user = userCredential.user;

        // Bước 4: Lưu thêm thông tin vào Firestore
        const role_id = 2; // 1 = Admin, 2 = Guest (mặc định Guest)

        return db.collection("users").doc(user.uid).set({
          email: email,
          role_id: role_id,
          createdAt: new Date()
        });
      })
      .then(function () {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "./login.html";
      })
      .catch(function (error) {
        // Xử lý lỗi: email đã tồn tại, mật khẩu yếu, ...
        console.error("Register error:", error.message);
        alert("Lỗi đăng ký: " + error.message);
      });
  });
});
