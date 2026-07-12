// ============================================================
// FILE: home.js
// CHỨC NĂNG: Xử lý trang chủ — lưu lựa chọn và chuyển sang trang Quiz
// Dùng ở: index.html
// ============================================================

// DOMContentLoaded — chờ HTML load xong rồi mới chạy JS (tránh lỗi không tìm thấy element)
document.addEventListener("DOMContentLoaded", function () {

  // Lấy các phần tử HTML cần tương tác
  const playBtn = document.getElementById("playBtn");           // Nút "Play"
  const categorySelect = document.getElementById("category");   // Dropdown danh mục
  const difficultySelect = document.getElementById("difficulty"); // Dropdown độ khó

  // Gắn sự kiện click cho nút Play
  playBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn thẻ <a> chuyển trang mặc định (href="#")

    // Lưu lựa chọn vào localStorage — trình duyệt lưu tạm, dùng ở trang game.html
    localStorage.setItem("category", categorySelect.value);     // vd: "9" = General Knowledge
    localStorage.setItem("difficulty", difficultySelect.value); // vd: "easy"

    // Chuyển sang trang Quiz
    window.location.href = "game.html";
  });
});
