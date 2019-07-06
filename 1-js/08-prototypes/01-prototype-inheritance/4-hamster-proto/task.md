importance: 5

---

# Tại sao cả hai con hamster đều no?

Ta có hai con hamster: `speedy` và `lazy` đều thừa kế từ đối tượng `hamster`. 

Khi chúng ta cho một trong số chúng ăn no, con kia cũng no. Tại sao? Sửa lại như thế nào?

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

// Cho một con ăn no
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Con kia cũng vậy! Tại sao? Hãy sửa lại?
alert( lazy.stomach ); // apple
```

