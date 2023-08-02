importance: 5

---

# instanceof lạ

Trong mã bên dưới, tại sao `instanceof` lại trả về `true`? Chúng ta có thể dễ dàng thấy rằng `a` không được tạo bởi `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
