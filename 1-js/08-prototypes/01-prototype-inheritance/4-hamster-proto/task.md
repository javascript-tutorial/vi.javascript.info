importance: 5

---

<<<<<<< HEAD
# Tại sao cả hai con hamster đều no?
=======
# Why are both hamsters full?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Ta có hai con hamster: `speedy` và `lazy` đều thừa kế từ đối tượng `hamster`. 

<<<<<<< HEAD
Khi chúng ta cho một trong số chúng ăn no, con kia cũng no. Tại sao? Sửa lại như thế nào?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

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

