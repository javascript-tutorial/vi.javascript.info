Vâng, nó có thể.

Nếu một hàm trả về một đối tượng thì `new` sẽ trả về nó thay vì `this`.

Vì vậy, chẳng hạn, chúng có thể trả về cùng một đối tượng được xác định bên ngoài `obj`:
```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
