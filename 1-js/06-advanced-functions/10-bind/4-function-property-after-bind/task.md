importance: 5

---

# Thuộc tính hàm sau khi ràng buộc

<<<<<<< HEAD
Có một giá trị trong thuộc tính của một hàm. Nó có bị thay đổi sau khi `bind` không? Tại sao?
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "Hùng"
});

alert( bound.test ); // sẽ hiển thị gì? Tại sao?
*/!*
```

