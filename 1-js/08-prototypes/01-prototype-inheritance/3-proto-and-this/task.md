importance: 5

---

<<<<<<< HEAD
# Dữ liệu ghi vào đối tượng nào?
=======
# Where does it write?
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

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
