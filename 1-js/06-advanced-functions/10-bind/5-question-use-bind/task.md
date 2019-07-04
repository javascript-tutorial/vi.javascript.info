importance: 5

---

# Sửa một hàm bị mất "this"

Hàm `askPassword` dưới đây kiểm tra mật khẩu và sau đó gọi `user.loginOk/loginFail` phụ thuộc mật khẩu nhận vào có khớp không.

Nhưng có một lỗi. Tại sao?

Chỉ sửa lại dòng cuối cùng (được tô sáng) để mọi thứ hoạt động đúng (các dòng khác để nguyên).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
