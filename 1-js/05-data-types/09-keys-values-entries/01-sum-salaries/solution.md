```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
Hoặc, theo tùy chọn, chúng ta cũng có thể lấy tổng bằng cách sử dụng `Object.values` và `reduce`:

```js
// giảm các vòng lặp trên array tiền lương,
// thêm chúng
// và trả về kết quả
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
