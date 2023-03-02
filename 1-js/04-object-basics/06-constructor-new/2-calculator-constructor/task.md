importance: 5

---

# Tạo một Máy tính mới

Tạo hàm khởi tạo `Máy tính` để tạo đối tượng với 3 phương thức:

- `read()` yêu cầu hai giá trị bằng cách sử dụng `prompt` và ghi nhớ chúng trong thuộc tính đối tượng.
- `sum()` trả về tổng của các thuộc tính này.
- `mul()` trả về tích nhân của các thuộc tính này.

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
