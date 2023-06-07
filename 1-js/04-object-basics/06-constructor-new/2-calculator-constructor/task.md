importance: 5

---

# Tạo một Máy tính mới

Tạo hàm khởi tạo `Máy tính` để tạo đối tượng với 3 phương thức:

- `read()` nhắc hai giá trị và lưu chúng dưới dạng thuộc tính đối tượng với tên `a` và `b` tương ứng.
- `sum()` trả về tổng của các thuộc tính này.
- `mul()` trả về tích nhân của các thuộc tính này.

```js
let calculator = new Calculator();
calculator.read();

alert( "Tổng=" + calculator.sum() );
alert( "Tích=" + calculator.mul() );
```

[demo]
