importance: 4

---

# Các hằng viết hoa?

Xét đoạn mã sau:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Ở đây chúng ta hằng ngày sinh `birthday` và tuổi `age` được tính từ `birthday` nhờ hàm `someCode` nào đó.
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Hằng nào nên được viết hoa? `birthday`? hay `age`? Hay là cả hai?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // có viết hoa không?

const AGE = someCode(BIRTHDAY); // có viết hoa không?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
```
