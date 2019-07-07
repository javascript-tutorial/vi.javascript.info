
Lần gọi đầu có `this == rabbit`, các lần khác `this` là `Rabbit.prototype`, bởi chúng là đối tượng trước dấu chấm.

Cho nên chỉ lần gọi đầu xuất ra `Thỏ`, các lần khác xuất ra `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Thỏ");

rabbit.sayHi();                        // Thỏ
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
