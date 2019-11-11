importance: 5

---

<<<<<<< HEAD
# Dữ liệu ghi vào đối tượng nào?
=======
# Where does it write?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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
