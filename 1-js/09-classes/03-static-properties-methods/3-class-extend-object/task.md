importance: 3

---

# Class thừa kế Object?

Như chúng ta biết, tất cả đối tượng thừa kế từ `Object.prototype` và truy cập được các phương thức chung như `hasOwnProperty`...

Ví dụ:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/task.md
// hasOwnProperty thừa kế từ from Object.prototype
// rabbit.__proto__ === Object.prototype
=======
// hasOwnProperty method is from Object.prototype
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779:1-js/09-classes/03-static-properties-methods/3-class-extend-object/task.md
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Nhưng nếu thực thi sự thừa kế trên bằng cách viết `"class Rabbit extends Object"`, thì kết quả khác gì so với `"class Rabbit"`?

Sự khác biệt là gì?

Đây là ví dụ đoạn mã viết theo cách trên (nếu nó không làm việc, hãy cho biết vì sao? Sửa lại?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
