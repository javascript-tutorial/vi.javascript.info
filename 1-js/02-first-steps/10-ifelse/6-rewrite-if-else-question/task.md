importance: 5

---

# Viết lại 'if..else' thành '?'

Viết lại `if..else` dùng nhiều toán tử ba ngôi `'?'`.

Để dễ đọc, nên chia mã thành nhiều dòng.

```js
let message;

if (login == 'Nhân viên') {
  message = 'Chào';
} else if (login == 'Giám đốc') {
  message = 'Xin kính chào';
} else if (login == '') {
  message = 'Không đăng nhập';
} else {
  message = '';
}
```
