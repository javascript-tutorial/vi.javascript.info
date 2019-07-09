importance: 5

---

# Lỗi khi tạo đối tượng

Đây là mã khai báo `Rabbit` thừa kế từ `Animal`.

Không may, không thể tạo đối tượng từ `Rabbit`. Cho biết đã sai gì? Sửa lại cho đúng?
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Lỗi
*/!*
alert(rabbit.name);
```
