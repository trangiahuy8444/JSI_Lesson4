// ============================================================
// FILE: balance.js
// MỤC ĐÍCH: Quản lý ví điện tử — hiển thị số dư & nạp tiền
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  requireAuth();

  const balanceAmount = document.getElementById("balanceAmount");
  const depositForm = document.getElementById("depositForm");

  // Hiển thị số dư khi user đăng nhập
  auth.onAuthStateChanged(function (user) {
    if (!user) return;
    loadBalance(user.uid);
  });

  function loadBalance(userId) {
    db.collection("wallets").doc(userId).get()
      .then(function (doc) {
        const balance = doc.exists ? doc.data().balance : 0;
        balanceAmount.textContent = balance.toLocaleString("vi-VN") + "đ";
      });
  }

  // Xử lý nạp tiền
  depositForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseInt(document.getElementById("depositAmount").value);
    const bank = document.getElementById("bankSelect").value;

    if (!amount || amount < 10000) {
      alert("Số tiền nạp tối thiểu là 10.000đ");
      return;
    }

    const user = auth.currentUser;
    const walletRef = db.collection("wallets").doc(user.uid);

    walletRef.get()
      .then(function (doc) {
        const currentBalance = doc.exists ? doc.data().balance : 0;
        return walletRef.set({
          balance: currentBalance + amount,
          lastBank: bank,
          updatedAt: new Date()
        }, { merge: true });
      })
      .then(function () {
        alert("Nạp " + amount.toLocaleString("vi-VN") + "đ thành công!");
        depositForm.reset();
        loadBalance(user.uid);
      })
      .catch(function (error) {
        console.error("Deposit error:", error.message);
        alert("Lỗi nạp tiền: " + error.message);
      });
  });
});
