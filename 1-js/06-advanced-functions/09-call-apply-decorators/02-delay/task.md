importance: 5

---

# Decorator trì hoãn

Tạo một decorator `delay(f, ms)` để trì hoãn mỗi lần gọi `f` bằng `ms` mili giây.

Ví dụ:

```js
function f(x) {
  alert(x);
}

// tạo các wrapper
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("kiểm tra"); // hiển thị "kiểm tra" sau 1000ms
f1500("kiểm tra"); // hiển thị "kiểm tra" sau 1500ms
```

Nói cách khác, `delay(f, ms)` trả về một biến thể "trễ bởi `ms`" của `f`.

Trong đoạn mã trên, `f` là một hàm của một đối số duy nhất, nhưng giải pháp của bạn phải chuyển tất cả các đối số và ngữ cảnh `this`.
