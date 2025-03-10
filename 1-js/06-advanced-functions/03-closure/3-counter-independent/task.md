importance: 5

---

# Bộ đếm có độc lập không?

Ở đây chúng ta tạo hai bộ đếm: `counter` và `counter2` bằng cách sử dụng cùng hàm `makeCounter`.

Chúng có độc lập không? Bộ đếm thứ hai sẽ hiển thị là gì? `0,1` hay `2,3` hay cái gì khác?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

