# Function expressions

Trong JavaScript, một function không phải là một "cấu trúc ngôn ngữ ma thuật", mà là một kiểu giá trị đặc biệt.


Cú pháp mà chúng ta đã sử dụng ở các chapter trước được gọi là *Function Declaration*:

```js
function sayHi() {
  alert( "Hello" );
}
```

Có một cú pháp khác để tạo một function được gọi là *Function Expression*.

Nó cho phép tạo một function mới ở trong bất cứ expression nào.

Ví dụ:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Ở đây chúng ta có thể thấy biến `sayHi` nhận được một giá trị, là một function mới, được tạo bằng `function() {
  alert( "Hello" );
};` 

Vì quá trình tạo function trên diễn ra trong một context là gán giá trị(assignment expression) nên nó được gọi là *Function Expression*

Hãy chú ý, không có cái tên nào phía trước chữ `function`. Việc bỏ sót tên là được phép với `Function Expression.`

Ở đây chúng ta ngay lập tức gán nó với một biến, cho nên ý nghĩa của những đọan code mẫu trên là như nhau: "tạo một function và đặt nó vào một biến `sayHi`"

Trong một số trường hợp nâng cao hơn mà chúng ta sẽ gặp sau, một function có thể được tạo ra và được gọi ngay lập tức hoặc được hẹn cho một phép thực thi sau đó, nó không được lưu ở bất cứ đâu, cho nên giữ tính ẩn danh.

## function là một giá trị
Hãy nhắc lại: Dù function được tạo ra như thế nào, một function là một giá trị(value). Cả 2 ví dụ phía trên đều lưu một function vào biến `sayHi`.

Chúng ta thậm chí còn có thể in giá trị đó ra bằng cách sử dụng `alert:`
```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // Hiển thị code của function phía trên
*/!*
```

Chú ý rằng dòng code cuối cùng không thực thi function đó, bởi vì không có cặp ngoặc tròn `()` phía sau `sayHi`. Có những ngôn ngữ lập trình chỉ cần đề cập đến như trên thì đã thực thi function đó, nhưng trong JavaScript thì không như vậy.

Trong JavaScript, một function là một giá trị, cho nên chúng ta có thể đối xử với nó như một giá trị. Đoạn code phía trên hiển thị dạng xâu(string) của nó hay còn gọi là source code.

Chắc chắn function là một giá trị đặc biệt vì chúng ta có thể gọi nó như `sayHi()`. 

Nhưng nó vẫn là một giá trị. Cho nên chúng ta có thể làm việc với nó như nhưng kiểu giá trị khác.

Chẳng hạn chúng ta có thể copy một function tới một biến khác.

```js run no-beautify
function sayHi() {   // (1) tạo
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) chạy copy (nó hoạt động)!
sayHi(); // Hello    //     cái này cũn hoạt động (tại sao lại không chứ :D)
```

Đây là những giá đã xảy ra một cách chi tiết:

1. Function Declaration `(1)` tạo một function và đặt nó vào một biến có tên `sayHi`.
2. Dòng `(2)` copy function trên vào biến `func`. Hãy chú ý lần nữa: ở đây không có cặp ngoặc tròn `()` nào sau `sayHi`. Nếu có, thì `func = sayHi()` sẽ ghi kết quả của phép gọi `sayHi()` vào `func` chứ không phải chính là *function* `func`.
3. Bây giờ thì có thể gọi làm trên bằng `sayHi()` hoặc `func()`.

Chú ý rằng chúng ta cũng có thể sử dụng một `Function Expression` để khai báo `sayHi`:

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Mọi thứ vẫn hoạt động như vậy.


````smart header="Tại sao lại có một dấu chấm phẩy ở cuối?"
Có thể bạn thắc mắc, tại sao Function Expression có một dấu chấm phẩy `;` ở phía cuối, còn Function Declaration thì không:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Câu trả lời khá đơn giản: một Funciton Expression được tạo bằng `function(…) {…}` bên trong một phép gán `let sayHi = …;`. Dấu chấm phẩy `;` được khuyến khích sử dụng ở phía cuối của phép gán chứ không phải là một phần cú pháp của function.

Dấu chấm hỏi sẽ ở sau một phép gán đơn giản hơn chẳng hạn như `let sayHi = 5;` và nó cũng ở sau một phép gán một function.
````

## Callback functions

Hãy xem thêm một số ví dụ về việc truyền function như giá trị và sử dụng function expressions.

Chúng ta sẽ viết một function `ask(question, yes, no)` với 3 thông số: 

`question`
: Text của question

`yes`
: function để gọi nếu đáp án là "Yes"

`no`
: function để gọi nếu đáp án là "No"

function nên gọi `question` và, dựa vào đáp án của người dùng sẽ gọi `yes()` hoặc `no()`.

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// cách sử dụng: các function showOk, showCancel được truyền như đối số vào ask.
ask("Do you agree?", showOk, showCancel);
```

Trên thực tế, những function như vậy khá hữu ích. Sự khác biệt chính giữa một function `ask` trong các dự án và ví dụ phía trên là function ask trong các dự án sử dụng nhiều các phức tạp hơn để tương tác với user hơn là một function `confirm` đơn giản. Trong trình duyệt, function như vậy luôn vẽ một UI cửa sổ câu hỏi ưu nhìn. Nhưng đó là một câu chuyện khác. 

**Đối số `showOk` và `showCancel` của function `ask` được gọi là các *callback functions* hoặc đơn giản hơn là *callbacks*.**

Ý tưởng là chúng ta truyền một function và mong nó sẽ được `gọi lại` sau đó nếu cần thiết. Trong trường hợp của chúng ta, `showOk` trở thành callback cho câu trả lời "yes" và `showCancel` cho "no".

Chúng ta có thể sử dụng Function Expressions để viết cùng một function như vậy nhưng ngắn hơn:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

Ở đây, function được khai báo bên trong phép gọi `ask(...)`. Chúng không có tên, cho nên được gọi là *ẩn danh*. Những function như vậy thì không thể truy cập bên ngoài `ask` (vì chúng không được gán vào biến), nhưng đó là điều chúng ta muốn ở đây.

Đoạn code trên xuất hiện trong các scripts của chúng ta một cách tự nhiên, nó là linh hồn của JavaScript.

```smart header="Một function là một giá trị đại diện cho một \"action\""
Các giá trị thông thường chẳng hạn như strings hoặc numbers đại diện cho *data*.

Một function có thể được xem như một *action*.

Chúng ta có thể truyền nó giữa các biến và chạy nó khi nào chúng ta muốn.
```


## Function Expression vs Function Declaration

Hãy xây dựng các điểm khác biệt giữa Function Declarations và Expressions.

Đầu tiên, cú pháp: cách phân biệt sự khác nhau giữa chúng.

- *Function Declaration:* là một function, được khai báo như một statement riêng biệt.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* là một function, được tạo bên trong một phép gán hoặc bên trong một cấu trúc cú pháp khác. Ở đây, function được tạo ra phía bên phải của "phép gán" `=`:

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

Có một vài điểm khác biệt khác là *khi* một function được tạo bởi JavaScript engine.

**Một Function Expression được tạo khi chạy đến dòng code đó và chỉ có thể được sử dụng từ lúc đó trở đi.**

Khi trình thực thi chạy qua phía bên phải của phép gán `let sum = function...`, function được tạo  và có thể được sử dụng(gán, gọi, v.v) từ đó trở đi.

Function Declarations thì khác.

**Một Function Declaration có thể được gọi trước khi nó được định nghĩa.**

Ví dụ, một Function Declaration toàn cục có thể được nhìn thấy trên toàn bộ script, dù nó ở đâu đi nữa.

Đó là nhờ các thuật toán ở phía trong. Khi JavaScript chuẩn bị để chạy script, đầu tiên nó tìm kiếm các Function Declarations toàn cục và tạo ra các function đó. Chúng ta có thể xem nó như là một "trạng thái khởi tạo".

Và sau khi tất cả Function Declarations được xử lý, đoạn code sẽ được thực thi. Cho nên nó có thể truy cập vào các function này.

Ví dụ:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```
Hàm `sayHi` được tạo ra khi JavasScript chuẩn bị để bắt đầu script và hàm này được nhìn thấy từ bất cứ đâu trong script.

...Nhưng nếu nó là một Function Expression, thì đoạn code dưới đây sẽ không hoạt động:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions được tạo khi trình thực thi chạy qua nó dòng `(*)`. Quá muộn.

Một tính năng đặc biệt khác của Function Declarations là block scope của chúng.

**Trong strict mode, khi một Function Declaration trong một code block, nó có thể được nhìn thấy từ bất cứ đâu trong block đó. Nhưng ngoài block thì không.**

Ví dụ, hãy tưởng tượng rằng chúng ta cần khai báo một hàm `welcome()` dựa vào một biến `age` mà chúng ta nhận được trong quá trình runtime. Và chúng ta lên kế hoạch để sử dụng nó sau đó.

Nếu chúng ta sử dụng Function Declaration, nó sẽ không hoạt động như mong muốn:

```js run
let age = prompt("What is your age?", 18);

// khai báo một hàm theo điều kiện
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...sử dụng nó sau đó
*!*
welcome(); // Error: welcome chưa được định nghĩa
*/!*
```

Điều này bởi vì một Function Declaration chỉ có thể được nhìn thấy bên trong code block nó nó được khai báo.

Một ví dụ khác:

```js run
let age = 16; // lấy 16 như một ví dụ

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration có thể được sử dụng
  }                        //  |  bất cứ đâu trong block mà nó được khai báo
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Ở đây chúng ta đã bên ngoài ngoặc nhọn {}
// cho nên chúng ta không thể nhìn thấy các Function Declarations được tạo ra bên tỏng nó.

*!*
welcome(); // Error: welcome không được định nghĩa
*/!*
```

Chúng ta có thể làm gì để `welcome` có thể được nhìn thấy bên ngoài `if`?

Cách tiếp cận đúng là sử dụng một Function Expression và gán `welcome` vào một biến được khai báo bên ngoài `if`.

Đoạn code dưới đây hoạt động như ý muón:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Hoặc chúng ta có thể đơn giản hóa bằng cách sử dụng `ternary operator` - `?`.

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="Khi nào thì sử dụng Function Declaration với Function Expression?"
Theo quy tắc, khi chúng ta cần khai báo một function, đầu tiên nên cân nhắc sử dụng Function Declaration. Nó mang lại sự tự do nhiều hơn để tổ chức code vì chúng ta có thể gọi chúng trước khia chúng được khai báo.

Nó cũng làm cho code dễ đọc hơn, vì nó dễ dàng hơn để tìm `function f(…) {…}` hơn là `let f = function(…) {…};`. Function Declarations bắt mắt hơn.

...Nhưng nếu một Function Declaration không phù hợp vì một vài lý do, hoặc chúng ta cần khai báo theo điều kiện như ví dụ ở trên, thì nên sử dụng Function Expression.
```

## Tổng kết

- Functions là các giá trị. Chúng có thể được gán, copy hoặc khai báo bất cứ đâu trong code.
- Nếu function được khai báo như một statement riêng biệt trong dòng code chính, thì nó được gọi là một "Function Declaration".
- Nếu function được tạo như một phần của một expression, nó được gọi là một "Function Expression".
- Function Declarations được xử lý trước khi code block được thực thi. Chúng có thể được nhìn thấy bất cứ đâu trong block.
- Function Expressions được tạo khi trình thực thi chạy đến chúng.

Trong hầu hết trường hợp chúng ta cần khai báo một function, một Function Declaration thì được khuyến khích sử dụng hơn vì chúng có thể được nhìn thấy trước cả khai báo. Nó cho chúng ta sự linh động trong tổ chức code và nó luôn dễ đọc hơn.

Vậy chúng ta nên sử dụng một Function Expression chỉ khi mà Function Declaration không phù hợp như ta đã nhìn thấy một số ví dụ trong chapter này, và sẽ thấy nhiều hơn trong tương lai.