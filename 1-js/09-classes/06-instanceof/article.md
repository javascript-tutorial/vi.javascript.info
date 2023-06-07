# Kiểm tra class: "instanceof"

Toán tử `instanceof` cho phép kiểm tra xem một đối tượng có thuộc một class nào đó hay không. Nó cũng tính đến sự kế thừa.

Việc kiểm tra như vậy có thể cần thiết trong nhiều trường hợp. Ví dụ: nó có thể được sử dụng để xây dựng hàm *đa hình*, hàm xử lý các đối số khác nhau tùy thuộc vào loại của chúng.

## Toán tử instanceof [#ref-instanceof]

Cú pháp là:
```js
obj instanceof Class
```

Nó trả về `true` nếu `obj` thuộc về `Class` hoặc một class kế thừa từ nó.

Ví dụ:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// nó có phải là đối tượng của class Rabbit không?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Nó cũng hoạt động với các hàm tạo:

```js run
*!*
// thay vì class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...Và với các class tích hợp như `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Hãy lưu ý rằng `arr` cũng thuộc class `Object`. Đó là bởi vì `Array` kế thừa nguyên mẫu từ `Object`.

Thông thường, `instanceof` kiểm tra chuỗi nguyên mẫu để kiểm tra. Chúng ta cũng có thể đặt logic tùy chỉnh trong phương thức tĩnh `Symbol.hasInstance`.

Thuật toán của `obj instanceof Class` hoạt động đại khái như sau:

1. Nếu có một phương thức tĩnh `Symbol.hasInstance`, thì chỉ cần gọi nó là: `Class[Symbol.hasInstance](obj)`. Nó sẽ trả về `true` hoặc `false`, và chúng ta đã hoàn tất. Đó là cách chúng ta có thể tùy chỉnh hành vi của `instanceof`.

    Ví dụ:

    ```js run
    // thiết lập instanceOf kiểm tra giả định rằng
    // bất cứ thứ gì có thuộc tính canEat đều là động vật
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) được gọi
    ```

2. Hầu hết các class không có `Symbol.hasInstance`. Trong trường hợp đó, logic tiêu chuẩn được sử dụng: `obj instanceOf Class` kiểm tra xem `Class.prototype` có bằng với một trong các nguyên mẫu trong chuỗi nguyên mẫu `obj` hay không.

    Nói cách khác, so sánh cái này với cái khác:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // nếu bất kỳ câu trả lời nào là đúng, trả về true
    // ngược lại, nếu chúng ta đến cuối chuỗi, hãy trả về false
    ```

    Trong ví dụ trên `rabbit.__proto__ === Rabbit.prototype`, do đó sẽ đưa ra câu trả lời ngay lập tức.

    Trong trường hợp kế thừa, quá trình sẽ sang bước thứ hai:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Rabbit.prototype
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (trùng khớp!)
    */!*
    ```

Đây là hình minh họa về những gì `rabbit instanceof Animal` so sánh với `Animal.prototype`:

![](instanceof.svg)

Nhân tiện, cũng có một phương thức [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), trả về `true` nếu `objA` nằm ở đâu đó trong chuỗi nguyên mẫu cho `objB`. Vì vậy, bài kiểm tra của `obj instanceof Class` có thể được diễn đạt lại thành `Class.prototype.isPrototypeOf(obj)`.

Thật buồn cười, nhưng bản thân hàm tạo `Class` không tham gia kiểm tra! Chỉ chuỗi nguyên mẫu và `Class.prototype` mới quan trọng.

Điều đó có thể dẫn đến những hậu quả thú vị khi thuộc tính `prototype` bị thay đổi sau khi đối tượng được tạo.

Như ở đây:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// đã thay đổi nguyên mẫu
Rabbit.prototype = {};

// ...không còn là thỏ nữa!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Bonus: Object.prototype.toString cho loại

Chúng ta đã biết rằng các đối tượng đơn giản được chuyển đổi thành chuỗi dưới dạng `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // giống nhau
```

Đó là cách triển khai `toString` của chúng. Nhưng có một tính năng ẩn làm cho `toString` thực sự mạnh hơn thế nhiều. Chúng ta có thể sử dụng nó như một `typeof` mở rộng và thay thế cho `instanceof`.

Thấy lạ không? Thực vậy. Hãy làm sáng tỏ

By [specification](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), the built-in `toString` can be extracted from the object and executed in the context of any other value. And its result depends on that value.

- For a number, it will be `[object Number]`
- For a boolean, it will be `[object Boolean]`
- For `null`: `[object Null]`
- For `undefined`: `[object Undefined]`
- For arrays: `[object Array]`
- ...etc (customizable).

Let's demonstrate:

```js run
// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

// what type is this?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Here we used [call](mdn:js/function/call) as described in the chapter [](info:call-apply-decorators) to execute the function `objectToString` in the context `this=arr`.

Internally, the `toString` algorithm examines `this` and returns the corresponding result. More examples:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

The behavior of Object `toString` can be customized using a special object property `Symbol.toStringTag`.

For instance:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

For most environment-specific objects, there is such a property. Here are some browser specific examples:

```js run
// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

As you can see, the result is exactly `Symbol.toStringTag` (if exists), wrapped into `[object ...]`.

At the end we have "typeof on steroids" that not only works for primitive data types, but also for built-in objects and even can be customized.

We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.

## Summary

Let's summarize the type-checking methods that we know:

|               | works for   |  returns      |
|---------------|-------------|---------------|
| `typeof`      | primitives  |  string       |
| `{}.toString` | primitives, built-in objects, objects with `Symbol.toStringTag`   |       string |
| `instanceof`  | objects     |  true/false   |

As we can see, `{}.toString` is technically a "more advanced" `typeof`.

And `instanceof` operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.
