importance: 5

---

<<<<<<< HEAD
# Dữ liệu ghi vào đối tượng nào?
=======
# Where does it write?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

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
