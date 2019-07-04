
Có lỗi xuất hiện vì `askPassword` chỉ nhận hàm `loginOk/loginFail` chứ không nhận được đối tượng `user` do vậy `this` bị mất.

Khi gọi các hàm này `this=undefined`.

Cùng ràng buộc `this` bằng `bind`:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Hùng',

  loginOk() {
    alert(`${this.name} đã đăng nhập`);
  },

  loginFail() {
    alert(`${this.name} đăng nhập thất bại`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Giờ nó đã làm việc.

Cũng có thể sử dụng các hàm bao:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Thường thì cách này cũng làm việc tốt.

Nhưng nó có chút không tin cậy vì biến `user` có thể thay đổi trước khi người dùng nhập mật khẩu hoặc trước khi `() => user.loginOk()` và `() => user.loginFail()` được gọi.
