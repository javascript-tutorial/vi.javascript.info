importance: 5

---

<<<<<<< HEAD
# Dữ liệu ghi vào đối tượng nào?
=======
# Where does it write?
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

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
