importance: 5

---

# Lọc qua hàm

Chúng ta có một phương thức tích hợp sẵn `arr.filter(f)` cho các array. Nó lọc tất cả các phần tử thông qua hàm `f`. Nếu nó trả về `true`, thì phần tử đó được trả về trong array kết quả.

Tạo một tập hợp các bộ lọc "sẵn sàng sử dụng":

- `inBetween(a, b)` -- giữa `a` và `b` hoặc bằng chúng (bao gồm cả).
- `inArray([...])` -- trong array đã cho.

Việc sử dụng phải như thế này:

- `arr.filter(inBetween(3,6))` -- chỉ chọn các giá trị từ 3 đến 6.
- `arr.filter(inArray([1,2,3]))` -- chỉ chọn các phần tử khớp với một trong các phần tử của `[1,2,3]`.

Ví dụ:

```js
/* .. mã của bạn cho inBetween và inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

