importance: 5

---

# Tính tổng các thuộc tính

Có một đối tượng `salaries` với số lương tùy ý.

Viết hàm `sumSalary(salaries)` trả về tổng của tất cả các khoản lương bằng cách sử dụng `Object.values` và vòng lặp `for..of`.

Nếu `salaries` trống, thì kết quả phải là `0`.

Ví dụ:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

