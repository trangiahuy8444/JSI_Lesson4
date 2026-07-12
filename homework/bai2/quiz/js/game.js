// ============================================================
// FILE: game.js
// CHỨC NĂNG: Logic trang Quiz — load câu hỏi, chấm điểm, lưu kết quả
// Dùng ở: game.html
// ============================================================

// --- Hằng số cấu hình ---
const POINTS_PER_CORRECT = 10;  // Mỗi câu đúng được 10 điểm
const TOTAL_QUESTIONS = 10;     // Số câu hỏi mỗi lượt chơi

// --- Biến trạng thái game ---
let questions = [];        // Mảng chứa 10 câu hỏi từ API
let currentIndex = 0;      // Index câu hỏi hiện tại (0 → 9)
let score = 0;             // Điểm tích lũy
let acceptingAnswers = true; // Có cho phép click đáp án không (chặn click liên tục)

// --- Lấy tham chiếu các phần tử HTML ---
const loader = document.getElementById("loader");               // Màn hình "Đang tải..."
const gameEl = document.getElementById("game");                 // Khu vực chơi quiz
const questionCounter = document.getElementById("questionCounter"); // "Câu 1 / 10"
const scoreEl = document.getElementById("score");               // Hiển thị điểm
const questionEl = document.getElementById("question");         // Nội dung câu hỏi
const choiceEls = document.querySelectorAll(".choice-container"); // 4 nút đáp án A/B/C/D
const saveModal = document.getElementById("saveModal");           // Hộp thoại lưu điểm
const finalScoreEl = document.getElementById("finalScore");       // Điểm cuối trong modal
const playerNameInput = document.getElementById("playerName");    // Ô nhập tên
const saveScoreBtn = document.getElementById("saveScoreBtn");     // Nút "Lưu điểm"

// Khi trang load xong → bắt đầu tải câu hỏi
document.addEventListener("DOMContentLoaded", loadQuestions);


// ============================================================
// HÀM: loadQuestions()
// CHỨC NĂNG: Gọi Open Trivia DB API để lấy 10 câu hỏi trắc nghiệm
// ============================================================
function loadQuestions() {
  // Đọc lựa chọn đã lưu từ trang chủ (home.js)
  const category = localStorage.getItem("category") || "";
  const difficulty = localStorage.getItem("difficulty") || "easy";

  // Xây dựng URL API — amount=10 câu, type=multiple = trắc nghiệm 4 đáp án
  let url = "https://opentdb.com/api.php?amount=" + TOTAL_QUESTIONS +
    "&difficulty=" + difficulty + "&type=multiple";

  // Nếu user chọn category cụ thể → thêm vào URL
  if (category) {
    url += "&category=" + category;
  }

  // fetch() — gửi request HTTP GET tới API, nhận JSON về
  fetch(url)
    .then(function (res) { return res.json(); }) // Chuyển response thành object JS
    .then(function (data) {
      // response_code !== 0 nghĩa là API không trả được câu hỏi (vd: category không có câu)
      if (data.response_code !== 0) {
        alert("Không tải được câu hỏi. Thử chọn category/difficulty khác.");
        window.location.href = "index.html";
        return;
      }

      questions = data.results;          // Lưu mảng câu hỏi
      loader.style.display = "none";   // Ẩn màn hình loading
      gameEl.style.display = "block";  // Hiện khu vực quiz
      showQuestion();                  // Hiển thị câu đầu tiên
    })
    .catch(function () {
      alert("Lỗi kết nối API. Kiểm tra internet.");
    });
}


// ============================================================
// HÀM: showQuestion()
// CHỨC NĂNG: Hiển thị câu hỏi hiện tại và 4 đáp án (xáo trộn thứ tự)
// ============================================================
function showQuestion() {
  acceptingAnswers = true; // Cho phép click đáp án
  const q = questions[currentIndex]; // Lấy câu hỏi tại vị trí hiện tại

  // Cập nhật giao diện: số câu, điểm, nội dung câu hỏi
  questionCounter.textContent = (currentIndex + 1) + " / " + TOTAL_QUESTIONS;
  scoreEl.textContent = score;
  questionEl.innerHTML = decodeHTML(q.question); // Giải mã HTML entities (&quot; → ")

  // Gộp 3 đáp án sai + 1 đáp án đúng, rồi xáo trộn ngẫu nhiên
  const answers = shuffle([...q.incorrect_answers, q.correct_answer]);

  // Gán nội dung và sự kiện click cho 4 nút đáp án
  choiceEls.forEach(function (el, i) {
    el.classList.remove("correct", "incorrect", "disabled"); // Reset style cũ
    el.querySelector(".choice-text").innerHTML = decodeHTML(answers[i]);
    el.onclick = function () {
      selectAnswer(el, answers[i], q.correct_answer);
    };
  });
}


// ============================================================
// HÀM: selectAnswer(el, selected, correct)
// CHỨC NĂNG: Xử lý khi user chọn 1 đáp án — chấm đúng/sai, cộng điểm
// Tham số:
//   el       — phần tử DOM của đáp án được click
//   selected — nội dung đáp án user chọn
//   correct  — nội dung đáp án đúng
// ============================================================
function selectAnswer(el, selected, correct) {
  if (!acceptingAnswers) return; // Chặn click nhiều lần
  acceptingAnswers = false;

  // Vô hiệu hóa tất cả đáp án (không cho click thêm)
  choiceEls.forEach(function (c) { c.classList.add("disabled"); });

  if (selected === correct) {
    // Trả lời đúng → tô xanh + cộng điểm
    el.classList.add("correct");
    score += POINTS_PER_CORRECT;
    scoreEl.textContent = score;
  } else {
    // Trả lời sai → tô đỏ đáp án chọn + tô xanh đáp án đúng
    el.classList.add("incorrect");
    choiceEls.forEach(function (c) {
      if (c.querySelector(".choice-text").innerHTML === decodeHTML(correct)) {
        c.classList.add("correct");
      }
    });
  }

  // Sau 1 giây → chuyển câu tiếp hoặc kết thúc quiz
  setTimeout(function () {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();    // Còn câu → hiện câu tiếp
    } else {
      showSaveModal();   // Hết câu → hiện hộp thoại lưu điểm
    }
  }, 1000);
}


// ============================================================
// HÀM: showSaveModal()
// CHỨC NĂNG: Hiện hộp thoại nhập tên + hiển thị điểm cuối cùng
// ============================================================
function showSaveModal() {
  gameEl.style.display = "none";           // Ẩn khu vực quiz
  finalScoreEl.textContent = score;        // Hiện tổng điểm
  saveModal.style.display = "flex";          // Hiện modal
  playerNameInput.focus();                 // Tự focus vào ô nhập tên
}


// ============================================================
// SỰ KIỆN: Click nút "Lưu điểm"
// CHỨC NĂNG: Lưu tên + điểm vào localStorage, chuyển sang bảng xếp hạng
// ============================================================
saveScoreBtn.addEventListener("click", function () {
  const name = playerNameInput.value.trim();

  // Kiểm tra đã nhập tên chưa
  if (!name) {
    alert("Vui lòng nhập tên!");
    return;
  }

  // Đọc danh sách điểm cũ từ localStorage (nếu chưa có → mảng rỗng)
  const scores = JSON.parse(localStorage.getItem("highscores") || "[]");

  // Thêm điểm mới vào mảng
  scores.push({
    name: name,
    score: score,
    date: new Date().toLocaleDateString("vi-VN") // Ngày hiện tại (vd: 12/07/2026)
  });

  // Ghi lại toàn bộ mảng vào localStorage
  localStorage.setItem("highscores", JSON.stringify(scores));

  alert("Đã lưu điểm thành công!");
  window.location.href = "highscores.html"; // Chuyển sang trang bảng xếp hạng
});


// ============================================================
// HÀM: shuffle(arr)
// CHỨC NĂNG: Xáo trộn mảng ngẫu nhiên (Fisher-Yates shuffle)
// Dùng để: đáp án đúng không luôn ở vị trí cố định
// ============================================================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Chọn index ngẫu nhiên
    [arr[i], arr[j]] = [arr[j], arr[i]];          // Hoán đổi 2 phần tử
  }
  return arr;
}


// ============================================================
// HÀM: decodeHTML(html)
// CHỨC NĂNG: Giải mã ký tự HTML từ API
// Ví dụ: "Who wrote &quot;Hamlet&quot;?" → 'Who wrote "Hamlet"?'
// ============================================================
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}