// ============================================================
// FILE: index.js
// MỤC ĐÍCH: Hiển thị danh sách sản phẩm trên trang chủ
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");

  const products = [
    { name: "Matcha Latte", price: "55.000đ", img: "./src/img/matcha_latte.png" },
    { name: "Trà Đào Mâm Xôi", price: "45.000đ", img: "./src/img/tra_dao_mam_xoi.png" },
    { name: "Chanh Tuyết", price: "40.000đ", img: "./src/img/chanhtuyet.png" },
    { name: "Highland Freezy", price: "50.000đ", img: "./src/img/HL_freezy.png" }
  ];

  products.forEach(function (product) {
    productList.innerHTML +=
      '<div class="col-lg-3 col-md-6 col-12 mb-4 product-item">' +
        '<div class="content bg-white">' +
          '<img src="' + product.img + '" alt="' + product.name + '">' +
          '<div class="p-3">' +
            '<h5>' + product.name + '</h5>' +
            '<p class="text-primary fw-bold mb-2">' + product.price + '</p>' +
            '<a href="./order.html" class="btn btn-primary btn-sm w-100">Đặt ngay</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
});
