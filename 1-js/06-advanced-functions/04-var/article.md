
# Từ khóa "var"

<<<<<<< HEAD
Ở chương [variables](info:variables), ta biết rằng có ba cách khai báo biến sau:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` và `const` tương tự nhau nếu xét về khía cạnh Lexical Environments.

Nhưng `var` thì lại khác, nó được sử dụng từ lâu khi Javascript còn chưa hỗ trợ `let` và `const`. Nhìn chung, nó không còn được sử dụng trong các đoạn scripts hiện đại nữa, tuy nhiên nó vẫn còn tồn tại.

Chương này có thể được bỏ qua hoặc hoãn lại nếu bạn cảm thấy không cần thiết, tuy nhiên những kiến thức này có thể giúp ích bạn trong tương lai.

Nếu nhìn thoáng qua, `var` tương tự với `let`. Cả hai đều được dùng để khai báo một biến:

```js run
function sayHi() {
  var phrase = "Xin chào"; // biến cục bộ, "var" thay vì "let"

  alert(phrase); // Xin chào
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
alert(phrase); // Error, phrase is not defined
```

...Tuy vậy có vài sự khác biệt.
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

## "var" không hỗ trợ block scope

<<<<<<< HEAD
<<<<<<< HEAD
Các biến được khai báo với `var` hoặc là biến cục bộ, hoặc là biến toàn cục.
=======
Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Lấy ví dụ:

```js run
if (true) {
  var test = true; // dùng "var" thay vì "let"
}

*!*
alert(test); // true, biến này tồn tại ngoài khối lệnh if
*/!*
```

<<<<<<< HEAD
`var` bỏ qua các khối lệnh (code blocks), vậy nên ta có một biến toàn cục `test`.
=======
As `var` ignores code blocks, we've got a global variable `test`.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Nếu đổi sang `let test` thay vì `var test`, thì khi đó biến này sẽ chỉ tồn tại bên trong  `if`:

```js run
if (true) {
  let test = true; // dùng "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```

Tương tự với vòng lặp: `var` không thể bị block:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10, "i" vẫn tồn tại sau khi vòng lặp kết thúc, nó đã trở thành biến toàn cục
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
*/!*
```

Nếu một khối lệnh tồn tại bên trọng một hàm, thì khi đó `var` sẽ trở thành một biến cục bộ:

```js run
function sayHi() {
  if (true) {
    var phrase = "Xin chào";
  }

  alert(phrase); // chạy bình thường
}

sayHi();
<<<<<<< HEAD
alert(phrase); // Error: phrase is not defined (Kiểm tra Developer Console)
```

Như ta thấy, `var` "đi xuyên qua" `if`, `for` hay các khối lệnh khác. Đó là bởi vì lúc trước Javascripts chưa tồn tại khái niệm Lexical Environments. Và `var` là kết quả của việc đó .

## Khai báo với "var" được tạo khi function bắt đầu chạy
=======
alert(phrase); // Error: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Khai báo với "var" được Javascript xử lý ngay khi hàm bắt đầu chạy (hay khi script bắt đầu chạy).

Nói cách khác, các biến "var" được định nghĩa từ lúc bắt đầu của mọi hàm, bất kể việc định nghĩa ấy nằm ở đâu (giả sử rằng việc định nghĩa không nằm trong các hàm lồng nhau).

Đoạn code sau:

```js run
function sayHi() {
  phrase = "Xin chào";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...tương tự với đoạn code này (chuyển `var phrase` lên trên):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Xin chào";

  alert(phrase);
}
sayHi();
```

...hay đoạn code này (các khối lệnh bị bỏ qua):

```js run
function sayHi() {
  phrase = "Xin chào"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Người ta thường gọi hành vi này là "hoisting" (đưa lên), bởi vì tất cả các biến `var` đã bị "đưa lên" trên cùng của hàm.

Với ví dụ ở trên, nhánh `if (false)` chưa bao giờ được thực thi, nhưng nó không đáng bận tâm. Biến `var` đã được xử lý ngay từ lúc bắt đầu hàm, vậy nên biến đã tồn tại ở lúc `(*)` rồi.

**Chỉ có phần khai báo (decalarations) là được đưa lên (hoisted), các phép gán (assignments) thì không.**

<<<<<<< HEAD
Lấy ví dụ
=======
That's best demonstrated with an example:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Xin chào";
*/!*
}

sayHi();
```

Ở dòng code `var phrase = "Xin chào"` xảy ra hai việc:

1. Khai báo biến với `var`
2. Gán biến với `=`.

Phần khai báo được đưa lên ngay lúc hàm bắt đầu thực thi, nhưng phép gán thì luôn luôn chỉ được thực thi tại chỗ. Vậy nên đoạn code trên sẽ nhìn giống như sau:

```js run
function sayHi() {
*!*
  var phrase; // Khai báo biến diễn ra lúc bắt đầu...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...phép gán - thực thi tại chỗ.
*/!*
}

sayHi();
```

Vì các khai báo với `var` được xử lý ngay lúc hàm bắt đầu, ta có thể khai báo nó ở bất cứ đâu trong hàm. Tuy nhiên nó sẽ mang giá trị `undifined` cho tới khi phép gán được thực thi.

<<<<<<< HEAD
Trong hai ví dụ trên, `alert` được thực thi mà không gặp bất kì lỗi nào, bởi vì biến `pharse` đã tồn tại. Nhưng giá trị của nó thì chưa có, vậy nên `undifined` được hiện ra.
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

## Tóm tắt

Có hai sự khác biệt chính giữa `var` và `let/const` :

<<<<<<< HEAD
1. Các biến `var` không bị giới hạn bởi các khối lệnh.
2. Khai báo với `var` được xử lý ngay khi hàm (hoặc script) bắt đầu.

Có một chút xíu sự khác biệt nho nhỏ liên quan tới global object, ta sẽ tìm hiểu ở chương sau.
=======
1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Thông thường với các sự khác biệt như vậy đã khiến `var` tệ hơn `let`. Việc các biến chỉ tồn tại trong các khối lệnh thực sự giúp ích rất nhiều. Đây cũng chính là lý do việc sử dụng `let` (và `const`) để khai báo biến trở nên thông dụng.
