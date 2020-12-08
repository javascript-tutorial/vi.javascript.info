importance: 5

---

# Tại sao cả hai con hamster đều no?

Chúng ta có hai con hamster: `speedy` và `lazy` đều kế thừa từ đối tượng chung `hamster`. 

Khi chúng ta cho một trong số chúng ăn, con kia cũng no. Tại sao? Chúng ta sửa nó như thế nào?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Con này tìm thấy thức ăn
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Con này cũng có thức ăn, tại sao? hãy sửa lại.
alert( lazy.stomach ); // apple
```

