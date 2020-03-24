
# Từ khóa "var"

<<<<<<< HEAD
Ở chương [variables](info:variables), ta biết rằng có ba cách khai báo biến sau:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

1. `let`
2. `const`
3. `var`

`let` và `const` tương tự nhau nếu xét về khía cạnh Lexical Environments.

Nhưng `var` thì lại khác, nó được sử dụng từ lâu khi Javascript còn chưa hỗ trợ `let` và `const`. Nhìn chung, nó không còn được sử dụng trong các đoạn scripts hiện đại nữa, tuy nhiên nó vẫn còn tồn tại.

Chương này có thể được bỏ qua hoặc hoãn lại nếu bạn cảm thấy không cần thiết, tuy nhiên những kiến thức này có thể giúp ích bạn trong tương lai.

Nếu nhìn thoáng qua, `var` tương tự với `let`. Cả hai đều được dùng để khai báo một biến:

```js run
function sayHi() {
  var phrase = "Xin chào"; // biến cục bộ, "var" thay vì "let"

  alert(phrase); // Xin chào
}

sayHi();

alert(phrase); // Error, phrase is not defined
```

...Tuy vậy có vài sự khác biệt.

## "var" không hỗ trợ block scope

<<<<<<< HEAD
Các biến được khai báo với `var` hoặc là biến cục bộ, hoặc là biến toàn cục.
=======
Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

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
  // ...
}

*!*
alert(i); // 10, "i" vẫn tồn tại sau khi vòng lặp kết thúc, nó đã trở thành biến toàn cục
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
alert(phrase); // Error: phrase is not defined (Kiểm tra Developer Console)
```

Như ta thấy, `var` "đi xuyên qua" `if`, `for` hay các khối lệnh khác. Đó là bởi vì lúc trước Javascripts chưa tồn tại khái niệm Lexical Environments. Và `var` là kết quả của việc đó .

## Khai báo với "var" được tạo khi function bắt đầu chạy

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
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

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

Trong hai ví dụ trên, `alert` được thực thi mà không gặp bất kì lỗi nào, bởi vì biến `pharse` đã tồn tại. Nhưng giá trị của nó thì chưa có, vậy nên `undifined` được hiện ra.

<<<<<<< HEAD
## Tóm tắt
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

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

## Summary
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Có hai sự khác biệt chính giữa `var` và `let/const` :

1. Các biến `var` không bị giới hạn bởi các khối lệnh.
2. Khai báo với `var` được xử lý ngay khi hàm (hoặc script) bắt đầu.

<<<<<<< HEAD
Có một chút xíu sự khác biệt nho nhỏ liên quan tới global object, ta sẽ tìm hiểu ở chương sau.
=======
There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Thông thường với các sự khác biệt như vậy đã khiến `var` tệ hơn `let`. Việc các biến chỉ tồn tại trong các khối lệnh thực sự giúp ích rất nhiều. Đây cũng chính là lý do việc sử dụng `let` (và `const`) để khai báo biến trở nên thông dụng.
