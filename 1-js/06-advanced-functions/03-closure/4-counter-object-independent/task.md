importance: 5

---

# Đối tượng bộ đếm

Ở đây, một đối tượng bộ đếm được tạo với sự trợ giúp của hàm tạo.

Nó có hoạt động không? Nó sẽ hiển thị cái gì?

```js
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

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

