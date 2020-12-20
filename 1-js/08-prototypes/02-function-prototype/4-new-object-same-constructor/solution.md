Chúng ta có thể sử dụng cách tiếp cận đó nếu chúng ta chắn chắn rằng thuộc tính `"constructor"` chứa giá trị đúng.

Ví dụ, nếu chúng ta không động đến `"prototype"` mặc định không bị thay đổi, thì đoạn mã sau chắc chắn hoạt động đúng:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (đã hoạt động!)
```

Nó hoạt động đúng bởi vì `User.prototype.constructor == User`.

...Có thể nói, nếu ai đó ghi đè `User.prototype` và quên tạo lại `constructor` để tham chiếu đến `User`, thì nó sẽ không thành công.

Ví dụ:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Tại sao `user2.name` là `undefined`?

Đây là cách `new user.constructor('Pete')` hoạt động:

1. Đầu tiên, nó tìm `constructor` trong `user`. Không có.
2. Sau đó nó lần theo chuỗi nguyên mẫu. Nguyên mẫu của `user` là `User.prototype`, và cũng không có.
3. Giá trị của `User.prototype` là đối tượng rỗng `{}`, nên nguyên mẫu của nó là `Object.prototype`. Và có `Object.prototype.constructor == Object`. Nên `Object` được sử dụng.

Cuối cùng chúng ta có `let user2 = new Object('Pete')`. Hàm tạo `Object` có sẵn bỏ qua các đối số, nó luôn tạo ra một đối tượng rỗng, tương tự với `let user2 = {}`, đó là những gì chúng ta có trong `user2`.
