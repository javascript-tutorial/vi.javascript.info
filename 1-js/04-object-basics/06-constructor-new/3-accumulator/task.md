importance: 5

---

# Tạo bộ tích lũy mới

Tạo một constructor `Accumulator(startingValue)`.

Đối tượng mà nó tạo nên:

- Lưu trữ "giá trị hiện tại" trong thuộc tính `value`. Giá trị bắt đầu được đặt thành đối số của constructor `startingValue`.
- Phương thức `read()` nên sử dụng `prompt` để đọc một số mới và thêm nó vào `giá trị`.

Nói cách khác, thuộc tính `value` là tổng của tất cả các giá trị do người dùng nhập với giá trị ban đầu là `startingValue`.

Đây là bản demo của mã:

```js
let accumulator = new Accumulator(1); // giá trị ban đầu 1

accumulator.read(); // thêm giá trị do người dùng nhập
accumulator.read(); // thêm giá trị do người dùng nhập

alert(accumulator.value); // hiển thị tổng của các giá trị này
```

[demo]
