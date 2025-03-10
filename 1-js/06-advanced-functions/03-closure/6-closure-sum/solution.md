Để các dấu ngoặc đơn thứ hai hoạt động, các dấu ngoặc đơn đầu tiên phải trả về một hàm.

Như thế này:

```js run
function sum(a) {

  return function(b) {
    return a + b; // lấy "a" từ lexical environment bên ngoài
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

