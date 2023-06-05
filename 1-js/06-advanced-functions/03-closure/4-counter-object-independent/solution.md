
Chắc chắn nó sẽ hoạt động tốt.

Cả hai hàm lồng nhau đều được tạo trong cùng một Lexical Environment bên ngoài, vì vậy chúng chia sẻ quyền truy cập vào cùng một biến `count`:

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
