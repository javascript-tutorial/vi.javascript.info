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

<<<<<<< HEAD
1. Đầu tiên, nó tìm `constructor` trong `user`. Không có.
2. Sau đó nó lần theo chuỗi nguyên mẫu. Nguyên mẫu của `user` là `User.prototype`, và cũng không có.
3. Giá trị của `User.prototype` là đối tượng rỗng `{}`, nên nguyên mẫu của nó là `Object.prototype`. Và có `Object.prototype.constructor == Object`. Nên `Object` được sử dụng.

Cuối cùng chúng ta có `let user2 = new Object('Pete')`. Hàm tạo `Object` có sẵn bỏ qua các đối số, nó luôn tạo ra một đối tượng rỗng, tương tự với `let user2 = {}`, đó là những gì chúng ta có trong `user2`.
=======
1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
