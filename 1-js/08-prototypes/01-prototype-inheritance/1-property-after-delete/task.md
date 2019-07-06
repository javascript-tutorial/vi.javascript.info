importance: 5

---

# Làm việc với nguyên mẫu

Đây là mã tạo một cặp đối tượng, sau đó sửa chúng.

Giá tri nào sẽ được hiển thị?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Sẽ có 3 câu trả lời.
