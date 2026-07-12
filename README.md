# JSI16 — Web Developer (MindX)

## Học sinh: Clone homework

```bash
git clone https://github.com/USERNAME/JSI.git
cd JSI
```

Branch mặc định (`main`) chỉ chứa **homework** — làm bài theo hướng dẫn trong folder `homework/`.

---

## Cuối buổi 4: Clone sản phẩm hoàn chỉnh

Giáo viên sẽ thông báo khi publish branch đáp án. Học sinh chạy:

### Cách 1: Clone mới (khuyến nghị)

```bash
git clone -b lesson04-complete https://github.com/USERNAME/JSI.git JSI-complete
cd JSI-complete
```

### Cách 2: Đã clone homework trước đó

```bash
cd JSI
git fetch origin
git checkout lesson04-complete
```

Sau đó mở folder `JSI16-Lesson04/complete/` — đây là code mẫu hoàn chỉnh buổi 4.

---

## Cấu trúc repo

| Branch | Nội dung | Khi nào |
|--------|----------|---------|
| `main` | `homework/` | Clone đầu tiên |
| `lesson04-complete` | `homework/` + `JSI16-Lesson04/complete/` | Cuối buổi 4 |
