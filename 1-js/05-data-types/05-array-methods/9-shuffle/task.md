importance: 3

---

# Xáo trộn một array

Viết hàm `shuffle(array)` để xáo trộn (sắp xếp lại ngẫu nhiên) các phần tử của array.

Nhiều lần chạy `shuffle` có thể dẫn đến các thứ tự phần tử khác nhau. Ví dụ:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Tất cả các thứ tự phần tử phải có xác suất bằng nhau. Chẳng hạn, `[1,2,3]` có thể được sắp xếp lại thành `[1,2,3]` hoặc `[1,3,2]` hoặc `[3,1,2]`, v.v. với xác suất bằng nhau của từng trường hợp.
