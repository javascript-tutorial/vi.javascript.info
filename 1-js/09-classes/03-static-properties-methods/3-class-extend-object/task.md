importance: 3

---

# Class kế thừa Object?

Như chúng ta biết, tất cả các đối tượng thường kế thừa từ `Object.prototype` và có quyền truy cập vào các phương thức "chung" như `hasOwnProperty` v.v.

Ví dụ:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// phương thức hasOwnProperty kế thừa từ Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Nhưng nếu chúng ta viết nó một cách đầy đủ rõ ràng như `"class Rabbit extends Object"`, thì kết quả sẽ khác gì với cách viết `"class Rabbit"` ngắn gọn?

Sự khác biệt là gì?

Đây là một ví dụ về đoạn mã như vậy (nó không hoạt động -- tại sao? hãy sửa nó?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
