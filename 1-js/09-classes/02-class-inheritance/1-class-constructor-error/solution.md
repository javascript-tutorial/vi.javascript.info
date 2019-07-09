Bởi phương thức constructor con phải gọi `super()`.

Đây là mã đúng:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Thỏ trắng"); // ok
*/!*
alert(rabbit.name); // Thỏ trắng
```
