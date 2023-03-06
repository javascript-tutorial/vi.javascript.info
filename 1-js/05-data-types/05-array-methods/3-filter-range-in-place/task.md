importance: 4

---

# Phạm vi lọc "tại chỗ"

Viết một hàm `filterRangeInPlace(arr, a, b)` nhận một array `arr` và loại bỏ khỏi array đó tất cả các giá trị ngoại trừ các giá trị nằm trong khoảng từ `a` đến `b`. Phép thử là: `a ≤ arr[i] ≤ b`.

Hàm chỉ nên sửa đổi array. Nó không nên trả lại bất cứ điều gì.

Ví dụ:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // loại bỏ các số trừ từ 1 đến 4

alert( arr ); // [3, 1]
```
