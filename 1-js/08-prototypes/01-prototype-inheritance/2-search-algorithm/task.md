importance: 5

---

# Thuật toán tìm kiếm

Bài tập có hai phần.

Cho các đối tượng sau:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Sử dụng `__proto__` để gán các nguyên mẫu, sao cho bất kỳ thuộc tính nào đều được tìm theo thứ tự: `pockets` -> `bed` -> `table` -> `head`. Ví dụ, `pockets.pen` là `3` (tìm thấy trong `table`), và `bed.glasses` là `1` (tìm thấy trong `head`).
2. Trả lời câu hỏi: lấy `glasses` bằng `pockets.glasses` hay `head.glasses` thì nhanh hơn? Tiến hành đo lường nếu cần.
