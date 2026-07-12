// ============================================================
// FILE: guest.js
// MỤC ĐÍCH: Đăng xuất + cập nhật menu theo trạng thái đăng nhập
// API dùng: auth.signOut(), auth.onAuthStateChanged()
// ============================================================

// --- Hàm đăng xuất ---
function logout() {
  auth.signOut()
    .then(function () {
      // Đăng xuất thành công → chuyển về trang login
      window.location.href = "./login.html";
    })
    .catch(function (error) {
      console.error("Logout error:", error.message);
    });
}

// --- Theo dõi trạng thái đăng nhập và cập nhật menu ---
auth.onAuthStateChanged(function (user) {
  const menu = document.getElementById("author-menu-drd");
  if (!menu) return;

  if (user) {
    // ĐÃ đăng nhập → hiện email, link đơn hàng, ví, nút đăng xuất
    menu.innerHTML =
      '<li><span class="dropdown-item-text text-muted small px-3">' + user.email + '</span></li>' +
      '<li><hr class="dropdown-divider"></li>' +
      '<li><a class="dropdown-item" href="./order.html">Đơn hàng</a></li>' +
      '<li><a class="dropdown-item" href="./balance.html">Ví điện tử</a></li>' +
      '<li><a class="dropdown-item" href="#" onclick="logout(); return false;">Đăng xuất</a></li>';
  } else {
    // CHƯA đăng nhập → hiện link đăng nhập / đăng ký
    menu.innerHTML =
      '<li><a class="dropdown-item" href="./login.html">Đăng nhập</a></li>' +
      '<li><a class="dropdown-item" href="./register.html">Đăng ký</a></li>';
  }
});
