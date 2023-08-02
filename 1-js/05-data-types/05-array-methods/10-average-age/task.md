importance: 4

---

# Lấy tuổi trung bình

Viết hàm `getAverageAge(users)` để lấy một array các đối tượng có thuộc tính `age` và trả về tuổi trung bình.

Công thức tính trung bình là `(age1 + age2 + ... + ageN) / N`.

Ví dụ:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
