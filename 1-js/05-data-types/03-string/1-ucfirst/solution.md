Chúng ta không thể "thay thế" ký tự đầu tiên, bởi vì các chuỗi trong JavaScript là bất biến.

Nhưng chúng ta có thể tạo một chuỗi mới dựa trên chuỗi hiện có, với ký tự đầu tiên được viết hoa:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Có một vấn đề nhỏ mặc dù. Nếu `str` trống, thì `str[0]` là `undefined` và vì `undefined` không có phương thức `toUpperCase()` nên chúng ta sẽ gặp lỗi.

Có hai biến thể ở đây:

1. Sử dụng `str.charAt(0)`, vì nó luôn trả về một chuỗi (có thể trống).
2. Thêm kiểm tra cho chuỗi trống.

Đây là biến thể thứ 2:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

