importance: 5

---

# Tạo hàm riêng của hàm login

Bài tập này là phiên bản phức tạp hơn của <info:task/question-use-bind>. 

Đối tượng `user` đã được sửa đổi. Bây giờ thay vì hai hàm `loginOk/loginFail`, chỉ còn một hàm duy nhất `user.login(true/false)`.

<<<<<<< HEAD
Phải truyền gì vào `askPassword` trong đoạn mã dưới đây?
=======
What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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

