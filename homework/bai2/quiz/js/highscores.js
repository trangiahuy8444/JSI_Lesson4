// ============================================================
// FILE: highscores.js
// CHỨC NĂNG: Hiển thị bảng xếp hạng từ localStorage
// Dùng ở: highscores.html
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  const scoresBody = document.getElementById("scoresBody"); // <tbody> của bảng xếp hạng

  // Đọc danh sách điểm đã lưu (từ game.js → localStorage key "highscores")
  // JSON.parse() chuyển chuỗi JSON thành mảng object JS
  const scores = JSON.parse(localStorage.getItem("highscores") || "[]");

  // Sắp xếp điểm cao → thấp
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Nếu chưa ai chơi → hiện thông báo trống
  if (scores.length === 0) {
    scoresBody.innerHTML =
      '<tr><td colspan="4" class="text-center">Chưa có điểm nào. Hãy chơi quiz!</td></tr>';
    return;
  }

  // Xóa nội dung cũ, render từng dòng
  scoresBody.innerHTML = "";

  scores.forEach(function (item, index) {
    const rank = index + 1; // Hạng (bắt đầu từ 1)

    // Tô màu đặc biệt cho top 3
    let rankClass = "";
    if (rank === 1) rankClass = "rank-1";       // Vàng
    else if (rank === 2) rankClass = "rank-2";   // Bạc
    else if (rank === 3) rankClass = "rank-3";   // Đồng

    // Tạo 1 dòng <tr> cho bảng
    const row = document.createElement("tr");
    row.innerHTML =
      '<td class="' + rankClass + '">' + rank + '</td>' +  // Cột hạng
      "<td>" + item.name + "</td>" +                         // Cột tên
      "<td><strong>" + item.score + "</strong></td>" +       // Cột điểm
      "<td>" + item.date + "</td>";                          // Cột ngày

    scoresBody.appendChild(row); // Thêm dòng vào bảng
  });
});
