Trước tiên, hãy xem tại sao đoạn mã không hoạt động.

Lý do sẽ rõ ràng nếu ta thử chạy nó. Constructor của class con phải gọ `super()`. Nếu không `"this"` không được "định nghĩa".

Đây là mã đã sửa:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // cần gọi constructor cha để thừa kế
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Nhưng đó chưa phải là tất cả.

Thậm chí sau khi sửa, vẫn có một điểm khác biệt quan trọng giữa `"class Rabbit extends Object"` và `class Rabbit`.

Như chúng ta đã biết, cú pháp "extends" cài đặt hai nguyên mẫu:

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
1. Giữa `"prototype"` của các hàm constructor (đề thừa kế các phương thức).
2. Giữa chính các hàm constructor (đề thừa kế phương thức tĩnh).
=======
1. Between `"prototype"` of the constructor functions (for methods).
2. Between the constructor functions themselves (for static methods).
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

Trong trường hợp của chúng ta, `class Rabbit extends Object` nghĩa là:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

Nên `Rabbit` có khả năng truy cập tới các phương thức tĩnh của `Object` thông qua `Rabbit`, như sau:

```js run
class Rabbit extends Object {}

*!*
// có thể gọi getOwnPropertyNames qua Rabbit: Rabbit.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Nhưng nếu không viết `extends Object`, thì `Rabbit.__proto__` không được đặt thành `Object`.

Đây là minh họa:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // như mọi hàm khác

*!*
// Lỗi, không có hàm trong Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Lỗi
*/!*
```

Giờ `Rabbit` không thể truy cập tới các phương thức tĩnh của `Object`.

Nhận tiện cũng nói luôn, `Function.prototype` có các phương thức "chung", như `call`, `bind`... Chúng có sẵn trong cả hai trường hợp, bởi `Object.__proto__ === Function.prototype`.

Đây là hình ảnh minh họa:

![](rabbit-extends-object.svg)

Tóm lại, có hai điểm khác biệt:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | cần gọi `super()` trong constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
