Trước tiên, hãy xem tại sao đoạn mã thứ hai không hoạt động.

Lý do trở nên rõ ràng nếu chúng ta thử chạy nó. Constructor của class con phải gọi `super()`. Nếu không `"this"` sẽ không được "định nghĩa".

Đây là mã đã sửa:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // cần gọi constructor cha khi kế thừa
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Nhưng đó chưa phải là tất cả.

Thậm chí sau khi sửa, vẫn có một sự khác biệt quan trọng giữa `"class Rabbit extends Object"` và `class Rabbit`.

Như chúng ta biết, cú pháp "extends" thiết lập hai nguyên mẫu:

1. Giữa `"prototype"` của các hàm constructor (để kế thừa các phương thức thường).
2. Giữa chính các hàm constructor (để kế thừa các phương thức tĩnh).

Trong trường hợp của chúng ta, `class Rabbit extends Object` nghĩa là:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

Nên giờ `Rabbit` cung cấp quyền sử dụng các phương thức tĩnh của `Object` thông qua `Rabbit`, như sau:

```js run
class Rabbit extends Object {}

*!*
// thông thường chúng ta gọi Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Nhưng nếu không viết `extends Object`, thì `Rabbit.__proto__` không được đặt thành `Object`.

Đây là minh họa:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // như bất kỳ hàm khác

*!*
// lỗi, không có hàm như thế trong Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Lỗi
*/!*
```

Vì vậy `Rabbit` không cung cấp quyền sử dụng các phương thức tĩnh của `Object` trong trường hợp đó.

Nhận tiện, `Function.prototype` có các phương thức "chung", như `call`, `bind` v.v. Cuối cùng chúng đều có sẵn trong cả hai trường hợp, bởi vì với constructor của `Object` có sẵn thì `Object.__proto__ === Function.prototype`.

Đây là hình ảnh minh họa:

![](rabbit-extends-object.svg)

Tóm lại, có hai điểm khác biệt:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | cần gọi `super()` trong constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
