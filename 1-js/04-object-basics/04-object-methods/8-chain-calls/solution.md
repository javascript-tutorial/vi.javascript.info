Giải pháp là trả lại chính đối tượng đó từ mọi cuộc gọi.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().up().down().showStep(); // 1
```

Chúng ta cũng có thể viết một cuộc gọi trên mỗi dòng. Đối với chuỗi dài, nó dễ đọc hơn:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
