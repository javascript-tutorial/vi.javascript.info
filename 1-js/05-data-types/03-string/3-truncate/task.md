importance: 5

---

# Cắt bớt văn bản

Tạo một hàm `truncate(str, maxlength)` để kiểm tra độ dài của `str` và, nếu nó vượt quá `maxlength` -- thay thế phần cuối của `str` bằng ký tự dấu chấm lửng `"…"`, để tạo chiều dài bằng `maxlength`.

Kết quả của hàm phải là chuỗi bị cắt ngắn (nếu cần).

Ví dụ:

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
