# Khai báo kiểu cũ "var"

```smart header="Bài viết này là để hiểu các tập lệnh cũ"
Thông tin trong bài viết này rất hữu ích để hiểu các tập lệnh cũ.

Đó không phải là cách chúng ta viết mã mới.
```

Trong chương đầu tiên về [variables](info:variables), chúng ta đã nói đến ba cách khai báo biến:

1. `let`
2. `const`
3. `var`

Khai báo `var` tương tự với khai báo `let`. Hầu hết thời gian chúng ta có thể thay thế `let` bằng `var` hoặc ngược lại và mong đợi mọi thứ hoạt động:

```js run
var message = "Xin chào";
alert(message); // Xin chào
```

Nhưng về bản chất `var` là một "con thú" rất khác, có nguồn gốc từ rất xa xưa. Nó thường không được sử dụng trong các tập lệnh hiện đại, nhưng vẫn ẩn trong các tập lệnh cũ.

Nếu bạn không có kế hoạch gặp những tập lệnh như vậy, bạn thậm chí có thể bỏ qua chương này hoặc trì hoãn nó.

Mặt khác, điều quan trọng là phải hiểu sự khác biệt khi chuyển các tập lệnh cũ từ `var` sang `let`, để tránh các lỗi kỳ lạ.

## "var" không có phạm vi khối

Các biến, được khai báo bằng `var`, có phạm vi hàm hoặc phạm vi toàn cục. Chúng có thể nhìn thấy qua các khối.

Ví dụ:

```js run
if (true) {
  var test = true; // dùng "var" thay vì "let"
}

*!*
alert(test); // true, biến này tồn tại ngoài khối lệnh if
*/!*
```

Vì `var` bỏ qua các khối lệnh (code blocks), vậy nên ta có một biến toàn cục `test`.

Nếu đổi sang `let test` thay vì `var test`, thì khi đó biến này sẽ chỉ tồn tại bên trong  `if`:

```js run
if (true) {
  let test = true; // dùng "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

Tương tự với vòng lặp: `var` không thể bị block:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10, "i" vẫn tồn tại sau khi vòng lặp kết thúc, nó là một biến toàn cục
alert(one); // 1, "one" vẫn tồn tại sau khi vòng lặp kết thúc, nó là một biến toàn cục
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
alert(phrase); // ReferenceError: phrase is not defined
```

Như ta thấy, `var` "đi xuyên qua" `if`, `for` hay các khối lệnh khác. Đó là bởi vì lúc trước Javascripts chưa tồn tại khái niệm Lexical Environments. Và `var` là kết quả của việc đó .

## "var" cho phép khai báo lại

Nếu chúng ta khai báo cùng một biến với `let` hai lần trong cùng một phạm vi, đó là một lỗi:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

Với `var`, chúng ta có thể khai báo lại một biến bất kỳ lúc nào. Nếu chúng ta sử dụng `var` với một biến đã được khai báo, nó đơn giản là bị bỏ qua:

```js run
var user = "Pete";

var user = "John"; // "var" này không có tác dụng (đã được khai báo)
// ...nó không phát sinh một lỗi

alert(user); // John
```

## Các biến "var" có thể được khai báo sau khi sử dụng của chúng

Khai báo với `var` được Javascript xử lý ngay khi hàm bắt đầu chạy (hay khi script bắt đầu chạy với các biến toàn cục).

Nói cách khác, các biến `var` được định nghĩa từ lúc bắt đầu của mọi hàm, bất kể việc định nghĩa ấy nằm ở đâu (giả sử rằng việc định nghĩa không nằm trong các hàm lồng nhau).

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

**Các khai báo được đưa lên, nhưng các phép gán thì không.**

Điều đó được chứng minh tốt nhất bằng một ví dụ:

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

Trong hai ví dụ trên, `alert` thực thi mà không gặp bất kì lỗi nào, bởi vì biến `pharse` đã tồn tại. Nhưng giá trị của nó chưa được gán, vậy nên nó hiện ra `undifined`.

## IIFE

Trước đây, vì chỉ có `var` và nó không có phạm vi ở mức khối, các lập trình viên đã phát minh ra một cách để mô phỏng nó. Những gì họ đã làm được gọi là "biểu thức hàm được gọi ngay lập tức" (viết tắt là IIFE).

Đó không phải là thứ chúng ta nên sử dụng ngày nay, nhưng bạn có thể tìm thấy chúng trong các tập lệnh cũ.

Một IIFE trông như này:

```js run
(function() {

  var message = "Xin chào";

  alert(message); // Xin chào

})();
```

Tại đây, một Biểu thức Hàm được tạo và ngay lập tức được gọi. Vì vậy, mã thực thi ngay lập tức và có các biến riêng của nó.

Biểu thức Hàm được bao bọc bằng dấu ngoặc đơn `(function {...})`, bởi vì khi công cụ JavaScript gặp `"function"` trong mã chính, nó sẽ hiểu nó là phần bắt đầu của một Khai báo Hàm. Nhưng Khai báo Hàm phải có tên, vì vậy loại mã này sẽ gây ra lỗi:

```js run
// Cố gắng khai báo và gọi ngay một hàm
function() { // <-- SyntaxError: function statement requires a name

  var message = "Xin chào";

  alert(message); // Xin chào

}();
```

Ngay cả khi chúng ta nói: "được rồi, hãy thêm tên", điều đó sẽ không hoạt động, vì JavaScript không cho phép gọi Khai báo Hàm ngay lập tức:

```js run
// lỗi cú pháp vì dấu ngoặc đơn bên dưới
function go() {

}(); // <-- không thể gọi Khai báo Hàm ngay lập tức
```

Vì vậy, các dấu ngoặc đơn xung quanh hàm là một mẹo để cho JavaScript biết rằng hàm được tạo trong ngữ cảnh của một biểu thức khác và do đó nó là một Biểu thức Hàm: nó không cần tên và có thể được gọi ngay lập tức.

Có những cách khác ngoài dấu ngoặc đơn để nói với JavaScript rằng chúng ta muốn một Biểu thức Hàm:

```js run
// Các cách tạo IIFE

(function() {
  alert("Dấu ngoặc đơn xung quanh hàm");
}*!*)*/!*();

(function() {
  alert("Dấu ngoặc đơn xung quanh toàn bộ");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Toán tử NOT theo bit bắt đầu biểu thức");
}();

*!*+*/!*function() {
  alert("Toán tử cộng một ngôi bắt đầu biểu thức");
}();
```

Trong tất cả các trường hợp trên, chúng ta khai báo một Biểu thức Hàm và chạy nó ngay lập tức. Hãy lưu ý một lần nữa: ngày nay không có lý do gì để viết mã như vậy.

## Tóm tắt

Có hai sự khác biệt chính giữa `var` và `let/const` :

1. Các biến `var` không có phạm vi khối, khả năng tham chiếu của chúng bị giới hạn trong hàm hiện tại hoặc toàn cục, nếu được khai báo bên ngoài hàm.
2. Khai báo `var` được xử lý khi bắt đầu hàm (hoặc khi bắt đầu tập lệnh đối với các biến toàn cục).

Có một sự khác biệt rất nhỏ nữa liên quan đến đối tượng toàn cục mà chúng ta sẽ đề cập trong chương tiếp theo.

Những khác biệt này thường làm cho `var` tệ hơn `let`. Các biến mức khối là một điều tuyệt vời. Đó là lý do tại sao `let` đã được giới thiệu trong tiêu chuẩn từ lâu, và bây giờ là một cách chính (cùng với `const`) để khai báo một biến.
