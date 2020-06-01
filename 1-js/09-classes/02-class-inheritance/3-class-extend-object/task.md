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
<<<<<<< HEAD
// hasOwnProperty thừa kế từ from Object.prototype
// rabbit.__proto__ === Object.prototype
=======
// hasOwnProperty method is from Object.prototype
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
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
