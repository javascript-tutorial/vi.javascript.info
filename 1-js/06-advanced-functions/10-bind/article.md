libs:
  - lodash

---

# Ràng buộc "this" cho hàm

<<<<<<< HEAD
Có một vấn đề chúng ta đã biết khi dùng `setTimeout` với các phương thức của đối tượng hoặc truyền những phương thức này từ hàm này sang hàm khác đó là mất `this`.

Ngay lập tức `this` không còn làm việc đúng. Tình huống này rất thường xảy ra với các lập trình viên chưa có nhiều kinh nghiệm, nhưng đôi khi các lập trình viên có kinh nghiệm vẫn gặp phải.
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## Mất "this"

<<<<<<< HEAD
Như ta đã biết trong JavaScript giá trị `this` rất dễ bị mất. `this` bị mất khi một phương thức được truyền tới nơi khác, tách khỏi đối tượng chứa nó.
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Trong ví dụ sau `this` bị mất khi phương thức được truyền vào `setTimeout`:

```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Xin chào, undefined!
*/!*
```

Như bạn thấy, giá trị xuất ra không phải là "Hùng" dựa theo `this.firstName` mà là `undefined`!

Đó là bởi vì `setTimeout` nhận được phương thức `user.sayHi` chứ không nhận được đối tượng `user`. Nói cách khác phương thức được truyền đi độc lập với đối tượng. Dòng cuối có thể viết lại tường mình hơn như sau:

```js
let f = user.sayHi;
setTimeout(f, 1000); // mất đối tượng user
```

<<<<<<< HEAD
Phương thức `setTimeout` khi chạy trong trình duyệt tự động đặt `this=window` khi hàm `f` được chạy (với Node.js, `this` là đối tượng timer, nhưng nó không quan trọng ở đây). Cho nên `this.firstName` trở thành `window.firstName` là thuộc tính không tồn tại. Trong những trường hợp tương tự khác `this` thường trở thành `undefined`.
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Một công việc khá điển hình đó là chúng ta muốn truyền một phương thức của đối tượng tới một nơi khác (ở trên là tới `setTimeout`) để chạy nó ở đây. Vậy làm cách nào để chắc chắn rắn nó chạy với giá trị `this` đúng?

## Giải pháp 1: sử dụng hàm bao

Giải pháp đơn giản nhất là sử dụng một hàm bao:

```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Xin chào, Hùng!
}, 1000);
*/!*
```

Phương thức đã làm việc, vì hàm bao nhận được `user` từ lexical environment bên ngoài, sau đó chạy phương thức từ đối tượng `user` này.

Cách viết tương tự, nhưng ngắn hơn sử dụng hàm mũi tên:

```js
setTimeout(() => user.sayHi(), 1000); // Xin chào, Hùng!
```

Trông tốt đó, nhưng có một lỗ hổng nhỏ xuất hiện.

Chuyện gì xảy ra nếu trước khi `setTimeout` kích hoạt (sau 1 giây), `user` thay đổi giá trị? Ngay lập tức nó gọi nhầm đối tượng!


```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

<<<<<<< HEAD
// ...trong vòng 1 giây
user = { sayHi() { alert("Một người dùng khác trong setTimeout!"); } };

// Một người dùng khác trong setTimeout?!?
=======
// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```

Giải pháp tiếp tiếp theo giúp khắc phục lỗ hổng trên.

## Giải pháp 2: sử dụng "bind"

Mọi hàm đều có sẵn một phương thức có tên [bind](mdn:js/Function/bind) cho phép cố định giá trị cho `this`.

Cú pháp cơ bản là:

```js
<<<<<<< HEAD
// cú pháp phức tạp hơn sẽ nói sau
=======
// more complex syntax will come a little later
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
let boundFunc = func.bind(context);
```

Kết quả của `func.bind(context)` là một đối tượng giống hàm, có thể gọi được như hàm, chuyển lời gọi này cho `func` và đặt `this=context`.

Nói cách khác gọi `boundFunc` giống như gọi `func` nhưng với `this` luôn là `context`.

Ví dụ, ở đây `funcUser` chuyển lời gọi cho `func` với `this=user`:

```js run  
let user = {
  firstName: "Hùng"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // Hùng  
*/!*
```

Ở đây `func.bind(user)` có thể coi là một "biến thể đã ràng buộc `this`" của `func`, với `this` bị ràng buộc với `user`.

Tất cả đối số truyền cho `funcUser` được chuyển nguyên vẹn cho `func`, ví dụ:

```js run  
let user = {
  firstName: "Hùng"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// ràng buộc this với user
let funcUser = func.bind(user);

*!*
funcUser("Xin chào"); // Xin chào, Hùng (đối số "Xin chào" được chuyển cho func, và this=user)
*/!*
```

Bây giờ thử áp dụng với phương thức của một đối tượng:


```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

<<<<<<< HEAD
sayHi(); // Xin chào, Hùng!

setTimeout(sayHi, 1000); // Xin chào, Hùng!
=======
// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```

Tại dòng `(*)` ta lấy phương thức `user.sayHi` và ràng buộc `this` của nó với `user`. Hàm `sayHi` là hàm đã ràng buộc, có thể gọi một mình hoặc truyền đi bất cứ đâu để chạy mà không bị mất `this`.

Các đối số được truyền nguyên vẹn tới hàm gốc, chỉ `this` bị cố định bởi `bind`:

```js run
let user = {
  firstName: "Hùng",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Xin chào"); // Xin chào, Hùng ("Xin chào" được truyền tới say)
say("Tạm biệt"); // Tạm biệt, Hùng ("Tạm biệt" được truyền tới say)
```

````smart header="Phương thức tiện lợi: `bindAll`"
Nếu một đối tượng có nhiều phương thức ta có thể sử dụng một vòng lặp `for..in` để ràng buộc tất cả các phương thức này:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
Một số thư viện JavaScript cung cấp các hàm để ràng buộc hàng loạt như trên, ví dụ [_.bindAll(obj)](http://lodash.com/docs#bindAll) trong thư viện lodash.
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
````

<<<<<<< HEAD
## Tóm tắt
=======
## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function `double` on its base:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Phương thức `func.bind(context, ...args)` trả về một phiên bản đã ràng buộc `this` của hàm `func`, nó ràng buộc `this` với đối số đầu tiên nếu có.

<<<<<<< HEAD
Thường ta sử dụng `bind` để cố định `this` trong phương thức của đối tượng để có thể truyền phương thức tới nơi khác. Ví dụ, tới `setTimeout`. Còn vài lý do nữa để sử dụng `bind` trong lập trình hiện đại, chúng ta sẽ còn gặp nó sau này.
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
