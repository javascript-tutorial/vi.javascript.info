importance: 5

---

# Sự khác nhau giữa các lần gọi

Cùng tạo đối tượng `rabbit` mới:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Thỏ");
```

Các lần gọi sau có cùng làm một việc không?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
