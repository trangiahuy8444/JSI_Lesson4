# Bài 2 — Xây dựng giao diện cơ bản cho ứng dụng Quiz

> Tham khảo giao diện: [https://quickquiz-4cb8a.web.app/](https://quickquiz-4cb8a.web.app/)

---

## Yêu cầu

1. Tạo giao diện **trang chủ** với nút bắt đầu quiz và xem bảng xếp hạng
2. Tạo **template trang Quiz**: hiển thị câu hỏi, 4 nút trả lời, hiển thị điểm
3. Thêm nút **"Lưu điểm"** và hộp thoại nhập tên sau khi hoàn thành quiz
4. Tạo **cấu trúc thư mục** dự án (HTML, CSS, JS)

---

## Cấu trúc thư mục (Bài 2)

```
bai2/quiz/
├── index.html          ← Trang chủ (chọn category, Play, Highscores)
├── game.html           ← Trang Quiz (câu hỏi, đáp án, điểm)
├── highscores.html     ← Bảng xếp hạng
├── css/
│   ├── style.css       ← Style trang chủ & highscores
│   └── game.css        ← Style trang quiz
└── js/
    ├── home.js         ← Xử lý nút Play trên trang chủ
    ├── game.js         ← Logic quiz + lưu điểm
    └── highscores.js   ← Hiển thị bảng xếp hạng
```

---

## Phần 1: Trang chủ (`index.html`)

### Thành phần cần có

- Tiêu đề **Quick Quiz**
- Dropdown chọn **Category** (danh mục)
- Dropdown chọn **Difficulty** (Easy / Medium / Hard)
- Nút **Play** — bắt đầu quiz
- Nút **Highscores** — xem bảng xếp hạng

### Luồng hoạt động

1. User chọn category + difficulty
2. Bấm **Play** → lưu lựa chọn vào `localStorage` → chuyển sang `game.html`
3. Bấm **Highscores** → chuyển sang `highscores.html`

Code mẫu trong `js/home.js`:

```javascript
playBtn.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem("category", categorySelect.value);
  localStorage.setItem("difficulty", difficultySelect.value);
  window.location.href = "game.html";
});
```

---

## Phần 2: Trang Quiz (`game.html`)

### Thành phần cần có

| Thành phần | Mô tả |
|------------|-------|
| `#questionCounter` | "Câu 1 / 10" |
| `#score` | Điểm hiện tại |
| `#question` | Nội dung câu hỏi |
| 4 `.choice-container` | 4 đáp án A, B, C, D |
| Modal kết thúc | Hiện khi hết câu hỏi |

### Luồng hoạt động

1. Load câu hỏi từ [Open Trivia DB API](https://opentdb.com/)
2. User click đáp án → đúng +10 điểm, sai không cộng
3. Tự chuyển câu tiếp theo sau 1 giây
4. Hết câu → hiện modal: nhập tên + nút **Lưu điểm**

API lấy câu hỏi:

```
https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
```

---

## Phần 3: Lưu điểm & hộp thoại nhập tên

Sau khi hoàn thành quiz, modal hiện:

- Input nhập **tên người chơi**
- Hiển thị **điểm số** đạt được
- Nút **Lưu điểm** → lưu vào `localStorage`
- Nút **Về trang chủ**

Cấu trúc dữ liệu lưu:

```javascript
{
  name: "Huy",
  score: 70,
  date: "12/07/2026"
}
```

---

## Phần 4: Bảng xếp hạng (`highscores.html`)

- Đọc danh sách điểm từ `localStorage`
- Hiển thị bảng: **Hạng | Tên | Điểm | Ngày**
- Sắp xếp điểm cao → thấp
- Nút **Về trang chủ**

---

## Checklist nộp Bài 2

- [ ] Có đủ cấu trúc thư mục HTML / CSS / JS
- [ ] Trang chủ có nút Play và Highscores
- [ ] Trang Quiz hiển thị câu hỏi + 4 đáp án + điểm
- [ ] Hết quiz → hiện hộp thoại nhập tên
- [ ] Nút "Lưu điểm" hoạt động
- [ ] Trang Highscores hiển thị bảng xếp hạng
- [ ] Chụp màn hình 3 trang: chủ, quiz, highscores

---

## Gợi ý thiết kế (tham khảo demo)

- Font: **Roboto** (Google Fonts)
- Màu chủ đạo: `#14AFAF` (teal)
- Container: nền trắng mờ, bo góc, shadow
- Responsive: `max-width: 420px` trên mobile

---

## Tài liệu tham khảo

- [Open Trivia DB API](https://opentdb.com/api_config.php)
- [Demo Quick Quiz](https://quickquiz-4cb8a.web.app/)
