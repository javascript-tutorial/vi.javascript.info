# Các biến

Trong hầu hết thời gian, một ứng dụng JavaScript cần phải làm việc với thông tin. Đây là hai ví dụ:

1. Một cửa hàng trực tuyến -- thông tin có thể gồm các mặt hàng được bán và giỏ hàng của người dùng.
2. Một ứng dụng chat -- thông tin có thể gồm các người dùng, các tin nhắn...

Các biến được sử dụng để lưu các thông tin như vậy.

## Biến

Một [biến (variable)](https://vi.wikipedia.org/wiki/Bi%E1%BA%BFn_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh)) là một "vùng nhớ được đặt tên" chứa dữ liệu. Chúng ta có thể sử dụng các biến để lưu trữ các hàng hóa, người mua, và các dữ liệu khác...

Để tạo biến trong JavaScript, sử dụng từ khóa `let`.

Câu lệnh dưới đây tạo (còn gọi là *khai báo*) một biến có tên "message":

```js
let message;
```

Sau khi tạo, chúng ta có thể lưu thông tin vào biến bằng toán tử gán `=`:

```js
let message;

*!*
message = 'Hello'; // lưu chuỗi
*/!*
```

Chuỗi trên giờ được lưu vào vùng nhớ tướng ứng với biến. Chúng ta có thể truy cập vùng nhớ này bằng cách sử dụng tên biến.

```js run
let message;
message = 'Hello!';

*!*
alert(message); // hiển thị nội dung của biến
*/!*
```

Để ngắn gọn, chúng ta có thể kết hợp khai báo đồng thời gán giá trị cho biến trong một dòng:

```js run
let message = 'Hello!'; // định nghĩa biến và gán giá trị

alert(message); // Hello!
```

Chúng ta có thể khai báo nhiều biến trên một dòng:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Trông ngắn hơn, nhưng bạn không nên làm như vậy. Để chương trình dễ đọc, vui lòng khai báo và gán giá trị cho mỗi biến trên một dòng.

Đây là phiên bản viết trên nhiều dòng. Tuy dài, nhưng dễ đọc hơn:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Một vài người định nghĩa nhiều biến theo cách đặc biệt:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Hoặc đặt dấu phảy đằng trước:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Tất cả các cách trên đều hợp lệ, chọn cách nào là do sở thích của bạn.

````smart header="`var` thay vì `let`"
Trong các mã chương trình cũ, bạn sẽ bắt gặp từ khóa `var` thay vì `let`:

```js
*!*var*/!* message = 'Hello';
```

Từ khóa `var` *hầu như* giống hệt `let`. Nó cũng khai báo biến, nhưng có chút khác biệt, bởi nó làm việc theo cách cũ.

Các khác biệt này được đề cập đến ở bài <info:var>, giờ ta chưa cần quan tâm đến chúng.
````

## Sự tương tự với đời thực

Chúng ta có thể dễ dàng nắm bắt khái niệm "biến" nếu tưởng tượng nó như một "hộp" chứa dữ liệu được gắn nhãn.

Ví dụ, biến `message` có thể xem như một hộp gắn nhãn `"message"` lưu giá trị `"Hello!"` bên trong:

![](variable.svg)

Ta có thể đặt bất cứ giá trị nào trong hộp:

Ta cũng có thể thay thế giá trị trong hộp nếu muốn:
```js run
let message;

message = 'Hello!';

message = 'World!'; // thay đổi giá trị

alert(message);
```

Khi thay đổi giá trị, giá trị cũ bị loại bỏ, giá trị mới thay thế cho nó:

![](variable-change.svg)

Chúng ta có thể khai báo hai biến và sao chép dữ liệu từ biến này sang biến kia.

```js run
let hello = 'Hello world!';

let message;

*!*
// sao chép 'Hello world' từ hello sang message
message = hello;
*/!*

// giờ hai biến chứa dữ liệu giống nhau
alert(hello); // Hello world!
alert(message); // Hello world!
```

````warn header="Khai báo hai lần sẽ gây ra lỗi"
Một biến chỉ nên được khai báo một lần.

Sự khai báo lặp lại cùng một biến là một lỗi:

```js run
let message = "This";

// lặp lại 'let' dẫn đến một lỗi
let message = "That"; // SyntaxError: 'message' đã được khai báo rồi
```
Vì thế, chúng ta nên khai báo mỗi biến một lần và tham chiếu đến nó mà không có `let`.
````

```smart header="Ngôn ngữ lập trình hàm"
Cần chú ý rằng chúng ta cũng có các ngôn ngữ [lập trình hàm](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C3%A0m), như [Scala](http://www.scala-lang.org/) hay [Erlang](http://www.erlang.org/) không cho phép thay đổi giá trị biến.

Trong các ngôn ngữ này, một khi giá trị đã nằm trong "hộp", nó ở đó mãi mãi. Nếu cần lưu giá trị khác, chúng ta cần tạo ra "hộp" mới (khai báo một biến mới). Ta không thể tái sử dụng một biến đã có.

Dù có vẻ kỳ lạ, chúng khá hiệu quả khi phát triển ứng dụng. Hơn nữa, có một số lĩnh vực, như tính toán song song, những hạn chế này lại trở thành ưu điểm. Nghiên cứu những ngôn ngữ này (dù không có kế hoạch sử dụng) vẫn được khuyến khích vì nó mở mang đầu óc của bạn.
```

## Đặt tên biến [#variable-naming]

Có hai ràng buộc khi đặt tên biến trong JavaScript:

1. Tên chỉ được có chữ cái, chữ số hoặc kí hiệu `$` và `_`.
2. Kí tự đầu tiên không được là chữ số.

Ví dụ về các tên hợp lệ:

```js
let userName;
let test123;
```

Khi tên biến chứa nhiều từ, cách viết [camelCase](https://en.wikipedia.org/wiki/CamelCase) thường được sử dụng. Đó là: các từ viết liền nhau, ngoài từ đầu tiên các chữ cái bắt đầu mỗi từ đều được viết hoa: `myVeryLongName`.

Điều thú vị là kí tự `'$'` và `'_'` được phép dùng. Chúng cũng chỉ là những kí tự thông thường, giống như các chữ cái, không có ý nghĩa gì đặc biệt.

Các tên sau hợp lệ:

```js run untrusted
let $ = 1; // khai báo biến có tên "$"
let _ = 2; // và biến có tên "_"

alert($ + _); // 3
```

Ví dụ về các biến không hợp lệ:

```js no-beautify
let 1a; // không được bắt đầu là chữ số

let my-name; // dấu gạch ngang '-' không được phép sử dụng
```

```smart header="JavaScript phân biệt chữ hoa và chữ thường"
Các biến có tên `apple` và `AppLE` khác nhau.
```

````smart header="Các kí tự không phải chữ cái Lating được phép dùng, nhưng không được khuyến khích"
Có thể sử dụng chữ cái trong bất cứ ngôn ngữ nào để đặt tên biến, ví dụ:

```js
let имя = '...';
let 我 = '...';
```

Toàn bộ những tên biến như vậy hợp lệ, nhưng có một quy tắc được áp dụng rộng rãi là chỉ sử dụng các chữ cái trong bảng chữ cái tiếng Anh làm tên biến. Quy tắc này đảm bảo mọi người từ nhiều quốc gia có thể hiểu được.
````

````warn header="Các từ khóa"
Có một [danh sách các từ khóa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), được sử dụng bởi chính JavaScript và không cho phép dùng làm tên biến.

Ví dụ: `let`, `class`, `return`, và `function` là các từ khóa.

Mã dưới dưới đây tạo ra một lỗi cú pháp:

```js run no-beautify
let let = 5; // lỗi, không thể đặt tên biến là từ khóa "let"!
let return = 5; // cũng không thể đặt tên biến là từ khóa "return"!
```
````

````warn header="Lệnh gán khi không dùng `use strict`"

Thông thường, chúng ta cần khai báo biến trước khi sử dụng. Nhưng ngày trước, có thể tạo ra một biến chỉ bằng cách gán giá trị cho nó mà không cần sử dụng `let`. Hiện nay cách này vẫn làm việc nếu ta không sử dụng `use strict`.

```js run no-strict
// chú ý: không dùng "use strict" trong ví dụ này

num = 5; // biến "num" được tạo ra nếu chưa có

alert(num); // 5
```

Đây là cách viết không tốt và sẽ gây lỗi trong chế độ strict:

```js
"use strict";

*!*
num = 5; // lỗi: num chưa định nghĩa
*/!*
```
````

## Các hằng

Để khai báo hằng (biến có giá trị không đổi) sử dụng từ khóa `const` thay vì `let`:

```js
const myBirthday = '18.04.1982';
```

Biến khai báo bằng từ khóa `const` được gọi hà "hằng" (constant). Chúng không thể bị gán lại. Nếu cố tình làm thế sẽ dẫn tới một lỗi:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // lỗi, không thể gán lại một hằng!
```

Khi một lập trình viên muốn một biến sẽ không bao giờ thay đổi, họ có thể khai báo biến bằng `const` để chắc chắn điều này.


### Các hằng được viết hoa

Có một quy ước được sử dụng rộng rãi là dùng hẳng để đặt tên cho những giá trị "khó nhớ" không thay đổi trong suốt chương trình.

Các hằng này được đặt tên bằng chữ viết hoa và ngăn cách các từ bằng "_".

Ví dụ, tạo hẳng đặt tên các mã màu:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...khi cần lấy một mã màu
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Ưu điểm:

- `COLOR_ORANGE` dễ nhớ hơn `"#FF7F00"`.
- Dễ gõ nhầm `"#FF7F00"` hơn `COLOR_ORANGE`.
- Khi đọc, `COLOR_ORANGE` có nhiều ý nghĩa hơn `#FF7F00`.

Khi nào nên sử dụng chữ hoa để đặt hằng và khi nào thì sử dụng chữ thường?

Một "hằng" có nghĩa là giá trị không bao giờ thay đổi. Nhưng có những hằng mà giá trị đã biết trước khi chạy (như các hằng mã màu ở trên) và những hằng được *tính* khi chạy chương trình, và không thay đổi sau đó.

Ví dụ:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

Giá trị của `pageLoadTime` không được biết trước khi chương trình chạy, nên nó đặt tên theo cách bình thường. Nhưng nó vẫn là hẳng vì giá trị của nó không đổi sau đó.

Nói cách khác, hằng chỉ được viết hoa nếu giá trị của nó đã biết trước khi chạy chương trình.

## Đặt tên sao cho đúng?

Nói về biến, có một thứ cực kỳ quan trọng.

Tên biến cần rõ ràng, mang nhiều ý nghĩa, mô tả dữ liệu nó chứa.

Đặt tên biến sao cho có nghĩa là một trong những kỹ năng quan trọng và phức tạp nhất trong lập trình. Nhìn thoáng qua tên biến ta có thể phân biệt được đây là đoạn mã viết bởi một lập trình viên dày dạn kinh nghiệm hay lập trình viên nghiệp dư.

Trong dự án thực tế, hầu hết thời gian được sử dụng để chỉnh sửa và mở rộng các đoạn mã hiện có hơn là viết lại từ đầu. Khi ta cần đọc lại các mã đã được chỉnh sửa trước đó, sẽ dễ hơn nếu các thông tin được mô tả tốt. Hay nói cách khác các biến được đặt tên tốt.

Hãy dành thời gian suy nghĩ về việc đặt tên biến trước khi khai báo nó. Bạn sẽ được đền đáp xứng đáng sau này.

Đây là vài quy tắc đặt tên bạn nên tuân theo:

- Đặt tên để mọi người hiểu được như `userName` hoặc `shoppingCart`.
- Đừng đặt tên viết tắt hoặc tên quá ngắn như `a`, `b`, `c`, trừ khi bạn biết mình đang làm gì.
- Tên cần ngắn gọn nhất nhưng mang tính mô tả nhiều nhất. Các ví dụ về cái tên tệ là `data` và `value`. Bởi chúng không nói lên điều gì đặc biệt. Chúng chỉ sử dụng được nếu ngữ cảnh của mã khiến dữ liệu hoặc giá trị mà chúng tham chiếu khác biệt rõ ràng với giá trị và dữ liệu ở nơi khác trong chương trình.
- Tuân thủ các quy tắc đặt tên biến trong nhóm của bạn và các quy tắc cá nhân. Nếu người thăm trang web được gọi là một "user" thì ta nên đặt tên các biến liên quan là `currentUser` hoặc `newUser` thay vì `currentVisitor` hay `newManInTown`.

Nghe có vẻ đơn giản? Đúng là như vậy thật! Nhưng tạo ra các tên biến vừa ngắn gọn vừa mô tả tốt thì không đơn giản chút nào.

```smart header="Tái sử dụng hay tạo mới?"
Và lưu ý cuối cùng. Có vài lập trình viên lười, thay vì tạo biến mới thường cố dùng lại các biến cũ.

Kết quả, các biến của họ giống như những chiếc hộp mà mọi người ném đủ thứ vào mà không thay đổi nhãn. Vậy nên không ai biết trong hộp hiện tại chứa cái gì. Muốn biết lại cần đến gần và kiểm tra.

Những lập trình viên này tiết kiệm được chút ít thời gian tạo biến, nhưng mất thời gian gấp 10 lần như vậy để gỡ lỗi.

Thêm một biến là tốt chứ không xấu.

Bởi các minifier và trình duyệt hiện đại sẽ tối ưu được việc có nhiều biến trong chương trình, và hiệu năng chương trình không bị ảnh hưởng nhiều. Sử dụng các biến khác nhau cho những giá trị khác nhau thậm chí còn giúp JavaScript engine tối ưu mã của bạn.
```

## Tóm tắt

Chúng ta có thể tạo ra các biến để lưu dữ liệu bằng cách sử dụng các từ khóa `var`, `let`, hoặc `const`.

- `let` -- là cách khai báo hiện đại.
- `var` -- là cách khai báo cũ. Thường chúng ta không còn dùng nó nữa, nhưng ta cũng sẽ chỉ ra chút khác biệt của nó so với `let` ở bài <info:var>, nếu bạn cần biết.
- `const` -- giống như `let`, nhưng giá trị của biến không thay đổi được.

Các biến nên được đặt tên sao cho dễ hiểu được dữ liệu bên trong nó.
