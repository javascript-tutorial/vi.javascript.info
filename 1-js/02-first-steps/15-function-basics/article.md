# Các hàm

Thông thường chúng ta cần thực hiện một hành động tương tự ở nhiều nơi trong tập lệnh.

Ví dụ: chúng ta cần hiển thị một thông báo đẹp mắt khi khách hàng truy cập đăng nhập, đăng xuất và có thể ở một nơi khác 

Các hàm là "khối xây dựng" chính của chương trình. Chúng cho phép chúng ta viết một đoạn mã chỉ một lần nhưng lại có thể thực hiện nó nhiều lần, thay vì phải viết lặp lại đoạn mã đó mỗi khi muốn thực hiện nó.

Chúng ta đã thấy các ví dụ về hàm dựng sẵn, như `alert(message)`, `prompt(message, default)` và `confirm(question)`. Nhưng chúng ta cũng có thể tạo những hàm riêng theo các mục đích khác nhau.

## Khai báo hàm

Để tạo một hàm, chúng ta có thể sử dụng *khai báo hàm*.

Nó trông như sau:

```js
function showMessage() {
  alert( 'Xin chào mọi người!' );
}
```

Từ khoá `function` được bắt đầu trước, sau đó đến *tên của hàm*, và có một danh sách các *tham số* giữa các dấu ngoặc đơn (được phân tách bằng dấu phẩy, những cũng có thể để trống như trong ví dụ trên) và cuối cùng là mã của hàm, còn được đặt tên là "thân hàm", giữa các dấu ngoặc nhọn.

```js
function name(parameters) {
  ...body...
}
```

Hàm mới của chúng ta có thể được gọi bằng tên của nó:: `showMessage()`.

Ví dụ:

```js run
function showMessage() {
  alert( 'Xin chào mọi người!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Việc gọi `showMessage()` thực thi đoạn mã trong hàm. Ở đây chúng ta sẽ thấy thông điệp được hiển thị hai lần.

Ví dụ này thể hiện rõ ràng một trong những mục đích chính của hàm: tránh trùng lặp mã.

Nếu chúng ta cần thay đổi thông báo hoặc cách nó được hiển thị, chỉ cần sửa đổi mã ở một nơi: hàm xuất ra nó là đủ.

## Các biến cục bộ

Một biến được khai báo bên trong một hàm chỉ nhìn thấy được từ bên trong hàm đó.

Ví dụ:

```js run
function showMessage() {
*!*
  let message = "Xin chào, tôi là JavaScript!"; // biến cục bộ
*/!*

  alert( message );
}

showMessage(); // Xin chào, tôi là JavaScript!

alert( message ); // <-- Lỗi! Đây là cục bộ đối với hàm
```

## Các biến bên ngoài

Một hàm cũng có thể truy cập một biến ngoài, ví dụ:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Xin chào, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Xin chào, John
```

Hàm có toàn quyền truy cập vào biến ngoài. Nó cũng có thể thay đổi được biến ngoài.

Ví dụ:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) đã thay đổi biến ngoài

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* trước khi hàm được gọi

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

Biến ngoài chỉ được sử dụng nếu không có biến cục bộ trùng tên với nó.

Nếu một biến cùng tên được khai báo bên trong hàm thì nó sẽ *che khuất* biến bên ngoài. Ví dụ: trong đoạn mã bên dưới, hàm sử dụng `userName` cục bộ. Biến bên ngoài bị bỏ qua:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable
*/!*

  let message = 'Xin chào, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="Biến toàn cục"
Các biến được khai báo bên ngoài bất kỳ hàm nào, chẳng hạn như biến ngoài `userName` trong mã ở trên, được gọi là *toàn cục*.

Các biến toàn cục có thể nhìn thấy được từ bất kỳ hàm nào (trừ phi bị che bởi biến cục bộ).

Đó là một cách thực hành tốt là giảm thiểu việc sử dụng các biến toàn cục. Mã nguồn hiện đại có ít hoặc không có toàn cục. Hầu hết các biến đều nằm trong hàm của chúng. Tuy nhiên, đôi khi chúng có thể hữu ích để lưu trữ dữ liệu cấp dự án.
```

## Các tham số

Chúng ta có thể truyền dữ liệu tùy ý đến các hàm bằng cách sử dụng tham số (còn được gọi là *đối số hàm*) .

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Xin chào!'); // Ann: Hello! (*)
showMessage('Ann', "Có chuyện gì á?"); // Ann: What's up? (**)
*/!*
```

Khi hàm được gọi trong các dòng `(*)` và `(**)`, các giá trị đã cho sẽ được sao chép sang các biến cục bộ `from` và `text`. Sau đó, hàm sẽ sử dụng chúng.

Đây là một ví dụ nữa: chúng ta có một biến `from` và truyền nó cho hàm. Xin lưu ý: hàm thay đổi `from`, nhưng sự thay đổi không được nhìn thấy từ bên ngoài, vì hàm luôn nhận được bản sao của giá trị:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // khiến "from" trông thân thiện hơn
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Xin chào"); // *Ann*: Xin chào

// giá trị của "from" là như nhau, hàm đã sửa đổi một bản sao cục bộ
alert( from ); // Ann
```

## Những giá trị mặc định

Nếu một tham số không được cung cấp thì giá trị của nó sẽ trở thành `undefined`.

Ví dụ, hàm `showMessage(from, text)` nói trên có thể được gọi bằng một đối số duy nhất:

```js
showMessage("Ann");
```

Đó không phải là một lỗi. Lệnh gọi như vậy sẽ xuất ra `"*Ann*: undefined"`. Không có `text`, vì vậy giả định rằng `text === undefined`.

Nếu chúng ta muốn sử dụng một `text` "mặc định" trong trường hợp này thì chúng ta có thể chỉ định nó sau `=`:

```js run
function showMessage(from, *!*text = "không có văn bản nào được đưa ra"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: không có văn bản nào được đưa ra
```

Bây giờ nếu tham số `text` không được truyền, nó sẽ nhận giá trị `"không có văn bản nào được đưa ra"`

Ở đây `"không có văn bản nào được đưa ra"` là một chuỗi, nhưng nó có thể là một biểu thức phức tạp hơn, chỉ được đánh giá và gán nếu thiếu tham số. Vì vậy, điều này cũng có thể:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() chỉ được thực hiện nếu không có văn bản nào được đưa ra
  // kết quả của nó trở thành giá trị của văn bản
}
```

```smart header="Đánh giá các tham số mặc định"
Trong JavaScript, một tham số mặc định được đánh giá mỗi khi hàm được gọi mà không có tham số tương ứng.

Trong ví dụ trên, `anotherFunction()` được gọi mỗi khi `showMessage()` được gọi mà không có tham số `text`.
```

### Các tham số mặc định thay thế

Sometimes it makes sense to set default values for parameters not in the function declaration, but at a later stage, during its execution.

To check for an omitted parameter, we can compare it with `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'tin nhắn rỗng';
  }
*/!*

  alert(text);
}

showMessage(); // tin nhắn rỗng
```

...Hoặc chúng ta có thể dùng toán tử `||`:

```js
// if text parameter is omitted or "" is passed, set it to 'empty'
function showMessage(text) {
  text = text || 'trống';
  ...
}
```

Các công cụ JavaScript hiện đại hỗ trợ [toán tử hợp nhất nullish](info:nullish-coalescing-operator) `??`, sẽ tốt hơn khi các giá trị sai, chẳng hạn như `0`, được coi là thông thường:

```js run
// if there's no "count" parameter, show "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Trả về một giá trị

Một hàm có thể trả về một giá trị làm kết quả cho mã gọi hàm đó.

Ví dụ đơn giản nhất là hàm tính tổng hai giá trị:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Lệnh `return` có thể ở bất kỳ vị trí nào của hàm. Khi quá trình thực thi đạt đến mức đó, hàm sẽ dừng và giá trị được trả về mã gọi (được gán cho `result` ở trên).

Có thể có nhiều lần xuất hiện của `return` trong một hàm. Ví dụ:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Bạn có sự cho phép của bố mẹ chưa?');
*/!*
  }
}

let age = prompt('Bạn bao nhiêu tuổi?', 18);

if ( checkAge(age) ) {
  alert( 'Quyền truy cập được cấp' );
} else {
  alert( 'Quyền truy cập bị từ chối' );
}
```

Có thể sử dụng `return` mà không có giá trị. Điều đó khiến chức năng thoát ra ngay lập tức.

Ví dụ:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Cho bạn xem bộ phim" ); // (*)
  // ...
}
```

Ở đoạn mã ở trên, nếu `checkAge(age)` trả về `false`, thì `showMovie` sẽ không thực hiện hàm `alert`.

````smart header="Một hàm trả với `return` rỗng hoặc không có `return` thì trả về `undefined`"
Nếu một hàm không trả về một giá trị thì cũng giống như là nó trả về `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

Trường hợp `return` rỗng, không kèm theo giá trị, thì cũng giống với `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Không bao giờ thêm dòng mới giữa `return` và giá trị"
Đối với một biểu thức dài trong `return`, có thể bạn muốn đặt nó trên một dòng riêng biệt, như thế này:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Điều đó không hiệu quả, vì JavaScript giả sử dấu chấm phẩy sau `return`. Điều đó sẽ hoạt động giống như:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Vì vậy, nó thực sự đã trả về rỗng.

Nếu chúng ta muốn biểu thức trả về trải dài trên nhiều dòng, chúng ta nên bắt đầu biểu thức đó ở cùng dòng với `return`. Hoặc ít nhất đặt dấu ngoặc mở ở đó như sau:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
Và nó sẽ hoạt động đúng như chúng ta mong đợi.
````

## Đặt tên cho hàm [#function-naming]

Các hàm là các hành động. Vì vậy tên của chúng thường là một động từ. Nó phải ngắn gọn, chính xác nhất có thể và mô tả chức năng của hàm để ai đó đọc mã sẽ biết được chức năng của hàm.

Thông lệ phổ biến là bắt đầu một hàm bằng tiền tố động từ mô tả mơ hồ hành động của hàm. Phải có sự thống nhất trong nhóm về ý nghĩa của các tiền tố.

Ví dụ: các hàm bắt đầu bằng `"show"` thường hiển thị nội dung nào đó.

Chức năng bắt đầu bằng...

- `"get..."` -- trả về một giá trị,
- `"calc..."` -- tính toán điều gì đó,
- `"tạo..."` -- tạo ra thứ gì đó,
- `"kiểm tra..."` -- kiểm tra thứ gì đó và trả về một boolean, v.v.

Các ví dụ cho những tên kể trên:

```js no-beautify
showMessage(..)     // một thông báo (hoặc thông điệp)
getAge(..)          // trả về tuổi (lấy nó bằng cách nào đó)
calcSum(..)         // tính tổng và trả về kết quả
createForm(..)      // tạo một biểu mẫu (và thường trả về nó)
checkPermission(..) // kiểm tra quyền, trả về đúng/sai
```

Với các tiền tố đã có sẵn, chỉ cần nhìn lướt qua tên hàm là bạn sẽ hiểu nó thực hiện loại công việc gì và trả về loại giá trị nào..

```smart header="Một hàm -- một hành động"
Một hàm nên thực hiện chính xác những gì được gợi ý theo tên của nó, và không làm gì khác nữa.

Hai hành động độc lập thường xứng đáng có hai hàm, ngay cả khi chúng thường được gọi cùng nhau (trong trường hợp đó chúng ta có thể tạo hàm thứ 3 gọi hai hàm đó).

Một vài ví dụ về việc vi phạm quy tắc này:

- `getAge` -- sẽ thật tệ nếu nó hiển thị `cảnh báo` theo độ tuổi (chỉ nên nhận).
- `createForm` -- sẽ rất tệ nếu nó sửa đổi tài liệu, thêm biểu mẫu vào đó (chỉ nên tạo và trả về).
- `checkPermission` -- sẽ rất tệ nếu nó hiển thị thông báo `quyền truy cập được cấp/từ chối` (chỉ nên thực hiện kiểm tra và trả về kết quả).

Những ví dụ này giả định ý nghĩa chung của tiền tố. Bạn và nhóm của bạn có thể tự do đồng ý về các ý nghĩa khác, nhưng thông thường chúng không khác nhau nhiều. Trong mọi trường hợp, bạn phải hiểu rõ ý nghĩa của tiền tố, hàm có tiền tố có thể và không thể làm gì. Tất cả các hàm có tiền tố giống nhau phải tuân theo các quy tắc. Và nhóm nên có chung nhận ​​thức.
```

```smart header="Những tên hàm siêu ngắn"
Các hàm được sử dụng *rất thường xuyên* đôi khi có tên cực ngắn.

Ví dụ: khung [jQuery](http://jquery.com) định nghĩa một hàm tên là `$`. Thư viện [Lodash](http://lodash.com/) có hàm cốt lõi tên là `_`.

Đây là những trường hợp ngoại lệ. Nói chung tên hàm phải ngắn gọn và mang tính mô tả.
```

## Hàm == Chú thích

Các hàm phải ngắn gọn và thực hiện chính xác một việc. Nếu thứ đó lớn, có lẽ nên chia hàm thành một vài hàm nhỏ hơn. Đôi khi việc tuân theo quy tắc này có thể không dễ dàng nhưng đó chắc chắn là một điều tốt.

Một chức năng riêng biệt không chỉ dễ kiểm tra và gỡ lỗi hơn -- là một chú thích tuyệt vời!

Ví dụ: so sánh hai hàm `showPrimes(n)` bên dưới. Mỗi cái xuất ra [số nguyên tố](https://en.wikipedia.org/wiki/Prime_number) tối đa `n`.

Biến thể đầu tiên sử dụng nhãn:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // một số nguyên tố
  }
}
```

Biến thể thứ hai sử dụng hàm bổ sung `isPrime(n)` để kiểm tra tính nguyên tố:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Biến thể thứ hai dễ hiểu hơn phải không? Thay vì đoạn mã, chúng ta thấy tên của hành động (`isPrime`). Đôi khi mọi người gọi mã đó là *tự mô tả*.

Vì vậy, các hàm có thể được tạo ngay cả khi chúng ta không có ý định sử dụng lại chúng. Họ cấu trúc mã và làm cho nó có thể đọc được.

## Bản tóm tắt

Một khai báo hàm trông như thế này:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Các giá trị được truyền vào hàm dưới dạng tham số sẽ được sao chép vào các biến cục bộ của hàm đó.
- Một hàm có thể truy cập các biến ngoài. Nhưng nó chỉ hoạt động từ trong ra ngoài. Mã bên ngoài hàm không thấy các biến cục bộ của nó.
- Hàm có thể trả về một giá trị. Nếu không, thì kết quả của nó là `undefined`.

Để làm cho mã rõ ràng và dễ hiểu, bạn nên sử dụng chủ yếu các biến cục bộ và tham số trong hàm, không nên sử dụng các biến bên ngoài.

Việc hiểu một hàm nhận các tham số, sử dụng chúng rồi trả về một kết quả, luôn dễ hiểu hơn một hàm không nhận tham số nào, nhưng lại thay đổi giá trị của các biến ngoài, như một tác dụng phụ.

Đặt tên cho hàm:

- Tên phải mô tả rõ ràng chức năng của nó. Khi chúng ta thấy một lệnh gọi hàm trong mã, một cái tên hay sẽ ngay lập tức giúp chúng ta hiểu nó làm gì và trả về gì.
- Hàm là một hành động nên tên hàm thường là động từ.
- Tồn tại nhiều tiền tố hàm phổ biến như `create…`, `show…`, `get…`, `check…`, v.v. Sử dụng chúng để gợi ý chức năng của một hàm.

Hàm là khối xây dựng chính của tập lệnh. Hiện tại chúng ta đã đề cập đến những điều cơ bản, vì vậy chúng ta thực sự có thể bắt đầu tạo và sử dụng chúng. Nhưng đó mới chỉ là sự khởi đầu. Chúng ta sẽ còn quay lại chúng nhiều lần, đi sâu hơn vào các tính năng nâng cao của chúng.
