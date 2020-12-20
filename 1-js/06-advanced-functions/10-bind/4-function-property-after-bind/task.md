importance: 5

---

# Thuộc tính hàm sau khi ràng buộc

Có một giá trị trong thuộc tính của một hàm. Nó có bị thay đổi sau khi `bind` không? Tại sao?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // sẽ hiển thị gì? Tại sao?
*/!*
```

