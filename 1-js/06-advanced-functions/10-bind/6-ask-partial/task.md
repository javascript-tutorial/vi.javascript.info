importance: 5

---

# Tạo hàm riêng của hàm login

Bài tập này là phiên bản phức tạp hơn của <info:task/question-use-bind>. 

Đối tượng `user` đã được sửa đổi. Bây giờ thay vì hai hàm `loginOk/loginFail`, chỉ còn một hàm duy nhất `user.login(true/false)`.

Chúng ta nên truyền gì vào `askPassword` trong đoạn mã dưới đây để nó gọi `user.login (true)` như là `ok` và `user.login (false)` như là `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' đã đăng nhập' : ' đăng nhập thất bại') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Bạn chỉ nên sửa đổi đoạn được đánh dấu.

