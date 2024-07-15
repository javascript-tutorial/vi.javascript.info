importance: 4

---

# "else" có bắt buộc không?

Hàm sau đây sẽ trả về `true` nếu tham số `age` là lớn hơn `18`.

Nếu không thì nó sẽ hỏi một câu xác nhận và trả về kết quả của nó: 

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Bố mẹ đã cho phép bạn chưa?');
  }
*/!*
}
```

Hàm sẽ thực hiện khác đi nếu từ `else` bị lược bỏ hay không?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Bố mẹ đã cho phép bạn chưa?');
*/!*
}
```

Có sự khác biệt nào trong hành vi của hai biến thể này không?
