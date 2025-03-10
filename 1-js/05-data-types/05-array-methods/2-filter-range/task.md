importance: 4

---

# Phạm vi bộ lọc

Viết một hàm `filterRange(arr, a, b)` nhận một array `arr`, tìm kiếm các phần tử có giá trị cao hơn hoặc bằng `a` và thấp hơn hoặc bằng `b` và trả về kết quả dưới dạng một array.

Hàm không nên sửa đổi array. Nó sẽ trả về array mới.

Ví dụ:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (giá trị trùng khớp)

alert( arr ); // 5,3,8,1 (không bị sửa đổi)
```
