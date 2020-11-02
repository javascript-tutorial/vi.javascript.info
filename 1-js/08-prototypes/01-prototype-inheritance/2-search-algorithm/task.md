importance: 5

---

# Thuật toán tìm thuộc tính

Bài tập có hai phần.

<<<<<<< HEAD
<<<<<<< HEAD
Chúng ta có một đối tượng:
=======
We have objects:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
=======
Given the following objects:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

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

1. Sử dụng `__proto__` để tạo chuỗi nguyên mẫu, sao cho bất kỳ thuộc tính nào đều được tìm theo thứ tự: `pockets` -> `bed` -> `table` -> `head`. Ví dụ, `pockets.pen` là `3` (tìm thấy trong `table`), và `bed.glasses` là `1` (tìm thấy trong `head`).
2. Trả lời câu hỏi: có thể lấy `glasses` bằng `pockets.glasses` hoặc `head.glasses`, cách nào nhanh hơn?
