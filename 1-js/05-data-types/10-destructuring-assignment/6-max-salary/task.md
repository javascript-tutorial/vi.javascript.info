importance: 5

---

# Mức lương tối đa

Có một đối tượng `salaries`:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Tạo hàm `topSalary(salaries)` trả về tên của người được trả lương cao nhất.

- Nếu `salaries` trống, nó nên trả về `null`.
- Nếu có nhiều người được trả lương cao nhất, trả lại bất kỳ ai trong số họ.

Tái bút: Sử dụng `Object.entries` và destructuring để lặp lại các cặp khóa/giá trị.
