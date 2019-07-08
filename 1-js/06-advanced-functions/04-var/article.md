
# Từ khóa "var"

Ở chương [variables](info:variables), ta biết rằng có ba cách khai báo biến sau:

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

Các biến được khai báo với `var` hoặc là biến cục bộ, hoặc là biến toàn cục.

Lấy ví dụ:

```js run
if (true) {
  var test = true; // dùng "var" thay vì "let"
}

*!*
alert(test); // true, biến này tồn tại ngoài khối lệnh if
*/!*
```

`var` bỏ qua các khối lệnh (code blocks), vậy nên ta có một biến toàn cục `test`.

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

Lấy ví dụ

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

## Tóm tắt

Có hai sự khác biệt chính giữa `var` và `let/const` :

1. Các biến `var` không bị giới hạn bởi các khối lệnh.
2. Khai báo với `var` được xử lý ngay khi hàm (hoặc script) bắt đầu.

Có một chút xíu sự khác biệt nho nhỏ liên quan tới global object, ta sẽ tìm hiểu ở chương sau.

Thông thường với các sự khác biệt như vậy đã khiến `var` tệ hơn `let`. Việc các biến chỉ tồn tại trong các khối lệnh thực sự giúp ích rất nhiều. Đây cũng chính là lý do việc sử dụng `let` (và `const`) để khai báo biến trở nên thông dụng.
