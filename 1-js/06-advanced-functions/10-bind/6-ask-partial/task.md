importance: 5

---

# Tạo hàm riêng của hàm login

Bài tập này là phiên bản phức tạp hơn của <info:task/question-use-bind>. 

Đối tượng `user` đã được sửa đổi. Bây giờ thay vì hai hàm `loginOk/loginFail`, chỉ còn một hàm duy nhất `user.login(true/false)`.

<<<<<<< HEAD
Phải truyền gì vào `askPassword` trong đoạn mã dưới đây?
=======
What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Hùng',

  login(result) {
    alert( this.name + (result ? ' đã đăng nhập' : ' đăng nhập thất bại') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Bạn chỉ nên thay đổi dòng cuối cùng (được tô sáng).

