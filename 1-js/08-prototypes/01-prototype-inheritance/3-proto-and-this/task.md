importance: 5

---

<<<<<<< HEAD
# Dữ liệu ghi vào đối tượng nào?
=======
# Where does it write?
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Chúng ta có `rabbit` thừa kế từ `animal`.

Nếu chúng ta gọi `rabbit.eat()`, đối tượng nào nhận được thuộc tính `full`: `animal` hay `rabbit`? 

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
