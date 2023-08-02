importance: 4

---

# Tại sao 6.35.toFixed(1) == 6.3?

Theo tài liệu `Math.round` và `toFixed` đều làm tròn đến số gần nhất: `0..4` dẫn đầu xuống trong khi `5..9` dẫn đầu.

Ví dụ:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Trong ví dụ tương tự bên dưới, tại sao `6.35` được làm tròn thành `6.3` chứ không phải `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Làm thế nào để làm tròn `6,35` đúng cách?

