Sử dụng toán tử dấu chấm hỏi `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Bố mẹ đã cho phép bạn chưa?');
}
```

Sử dụng OR `||` (biến thể ngắn nhất):

```js
function checkAge(age) {
  return (age > 18) || confirm('Bố mẹ đã cho phép bạn chưa?');
}
```

Lưu ý rằng dấu ngoặc đơn quanh `age > 18` thì không được yêu cầu ở đây. Chúng tồn tại để dễ hơn cho việc đọc.
