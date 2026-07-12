// ============================================================
// FILE: order.js
// MỤC ĐÍCH: Quản lý đơn hàng + phân quyền Admin/Guest
// role_id = 1 → Admin (xem tất cả, được xóa)
// role_id = 2 → Guest (chỉ xem đơn của mình)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  requireAuth();

  const orderTableBody = document.getElementById("orderTableBody");
  const orderFormModal = document.getElementById("orderFormModal");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");

  let currentRoleId = 2;

  auth.onAuthStateChanged(function (user) {
    if (!user) return;

    // Lấy role_id từ Firestore
    db.collection("users").doc(user.uid).get()
      .then(function (doc) {
        if (doc.exists) {
          currentRoleId = doc.data().role_id;
        }
        loadOrders(user.uid);
      });
  });

  // --- Hiển thị danh sách đơn hàng ---
  function loadOrders(userId) {
    db.collection("orders").get()
      .then(function (snapshot) {
        orderTableBody.innerHTML = "";
        const orders = [];

        snapshot.forEach(function (doc) {
          const data = doc.data();
          // Guest chỉ thấy đơn của mình, Admin thấy tất cả
          if (currentRoleId === 1 || data.userId === userId) {
            orders.push({ id: doc.id, ...data });
          }
        });

        // Sắp xếp mới nhất trước
        orders.sort(function (a, b) {
          const timeA = a.createdAt ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        if (orders.length === 0) {
          orderTableBody.innerHTML =
            '<tr><td colspan="5" class="text-center text-muted py-4">Chưa có đơn hàng nào</td></tr>';
          return;
        }

        orders.forEach(function (order) {
          const isAdmin = currentRoleId === 1;
          const row = document.createElement("tr");

          row.innerHTML =
            '<td>' + order.productName + '</td>' +
            '<td>' + (order.price || 0).toLocaleString("vi-VN") + 'đ</td>' +
            '<td>' + order.quantity + '</td>' +
            '<td><span class="badge bg-warning text-dark">' + (order.status || "Đang xử lý") + '</span></td>' +
            '<td>' +
              (isAdmin
                ? '<button class="btn btn-sm btn-danger btn-delete" data-id="' + order.id + '">Xóa</button>'
                : '<span class="text-muted">—</span>') +
            '</td>';

          orderTableBody.appendChild(row);
        });

        // Gắn sự kiện xóa (chỉ Admin mới thấy nút)
        document.querySelectorAll(".btn-delete").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const orderId = this.getAttribute("data-id");
            if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
              db.collection("orders").doc(orderId).delete()
                .then(function () {
                  loadOrders(auth.currentUser.uid);
                });
            }
          });
        });
      })
      .catch(function (error) {
        console.error("Load orders error:", error.message);
        orderTableBody.innerHTML =
          '<tr><td colspan="5" class="text-center text-danger">Lỗi tải dữ liệu</td></tr>';
      });
  }

  // --- Đặt hàng mới ---
  confirmOrderBtn.addEventListener("click", function () {
    const productName = document.getElementById("productName").value.trim();
    const price = parseInt(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);

    if (!productName || !price || !quantity) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    db.collection("orders").add({
      userId: auth.currentUser.uid,
      productName: productName,
      price: price,
      quantity: quantity,
      status: "Đang xử lý",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function () {
      alert("Đặt hàng thành công!");
      orderFormModal.style.display = "none";
      loadOrders(auth.currentUser.uid);
    })
    .catch(function (error) {
      console.error("Order error:", error.message);
      alert("Lỗi đặt hàng: " + error.message);
    });
  });
});
