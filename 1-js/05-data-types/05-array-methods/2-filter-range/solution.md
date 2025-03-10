```js run demo
function filterRange(arr, a, b) {
  // thêm dấu ngoặc xung quanh biểu thức để dễ đọc hơn
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (giá trị trùng khớp)

alert( arr ); // 5,3,8,1 (không bị sửa đổi)
```
