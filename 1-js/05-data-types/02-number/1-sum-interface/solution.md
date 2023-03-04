

```js run demo
let a = +prompt("Số đầu tiên?", "");
let b = +prompt("Số thứ hai?", "");

alert( a + b );
```

Lưu ý dấu cộng đơn nguyên `+` trước `prompt`. Nó ngay lập tức chuyển đổi giá trị thành một số.

Nếu không, `a` và `b` sẽ là chuỗi, tổng của chúng sẽ là phần nối của chúng, nghĩa là: `"1" + "2" = "12"`.
