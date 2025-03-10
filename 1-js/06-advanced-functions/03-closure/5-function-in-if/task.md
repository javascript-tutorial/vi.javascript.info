
# Hàm trong if

Nhìn vào mã. Cái gì sẽ là kết quả của cuộc gọi ở dòng cuối cùng?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
