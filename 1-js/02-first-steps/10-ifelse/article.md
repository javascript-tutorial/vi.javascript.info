# Toán tử điều kiện: if, '?'

Đôi khi, ta cần thực hiện các hành động khác nhau dựa trên các điều kiện khác nhau.

Để làm điều đó, ta có thể dùng câu lệnh `if` và toán tử điều kiện `?`, còn được gọi là toán tử "chẩm hỏi".

## Câu lệnh "if"

Câu lệnh `if(...)` lấy giá trị một điều kiện trong ngoặc và, nếu kết quả là `true`, chạy một đoạn lệnh.

Ví dụ:

```js run
let year = prompt('Vào năm nào bản đặc tả ECMAScript-2015 được xuất bản?', '');

*!*
if (year == 2015) alert( 'Đúng rồi!' );
*/!*
```

Trong ví dụ trên, điểu kiện là một phép kiểm tra bằng nhau đơn giản (`year == 2015`), nhưng nó có thể phức tạp hơn rất nhiều.

Nếu ta muốn thực hiện nhiều hơn một câu lệnh, ta cần bao đoạn mã trong ngoặc móc:

```js
if (year == 2015) {
  alert( "Đúng rồi!" );
  alert( "Bạn giỏi quá!" );
}
```

Chúng tôi khuyên bạn bọc đoạn mã của bạn vào ngoặc móc `{}` mỗi khi bạn dùng câu lệnh `if`, ngay cả khi chỉ có một lệnh để thực hiện. Làm vậy sẽ dễ đọc hơn.

## Chuyển đổi boolean

Câu lệnh `if (...)` lấy giá trị của biểu thức trong cặp ngoặc của nó và chuyển đổi kết quả sang boolean.

Hãy cùng nhớ lại các quy tắc chuyển đổi từ chương <info:type-conversions>:

- Một số `0`, một chuỗi văn bản trống `""`, `null`, `undefined`, và `NaN` đều trở thành `false`. Vì vậy chúng được gọi là các giá trị "sai".
- Các giá trị khác trở thành `true`, cho nên được gọi là "đúng".

Do đó, đoạn mã dưới điều kiện này sẽ không bao giờ chạy:

```js
if (0) { // 0 là giá trị sai.
  ...
}
```

...và trong điều kiện này – nó sẽ luôn chạy:

```js
if (1) { // 1 là giá trị đúng.
  ...
}
```

Ta còn có thể đưa một giá trị boolean đã tính trước đó vào `if`, như thế này:

```js
let cond = (year == 2015); // Toán tử bằng nhau cho giá trị true hoặc false.

if (cond) {
  ...
}
```

## Mệnh để "else"

<<<<<<< HEAD
The `if` statement may contain an optional "else" block. It executes when the condition is falsy.
=======
Câu lệnh `if` có thể chứa một khối "else" tùy chọn. Nó chạy khi điều kiện là sai.
>>>>>>> 916e0332 (Translated 1.02.10 – Conditional branching: if, '?'.)

Ví dụ:
```js run
let year = prompt('Vào năm nào bản đặc tả ECMAScript-2015 được xuất bản?', '');

if (year == 2015) {
  alert( 'Bạn đoán đúng rồi!' );
} else {
  alert( 'Sao bạn lại có thể sai như vậy?' ); // Bất kì giá trị nào ngoài 2015.
}
```

## Nhiều điều kiện: "else if"

Đôi khi, ta muốn kiểm tra nhiều biến thể của một điều kiện. Mệnh đề `else if` cho ta làm việc đó.

Ví dụ:

```js run
let year = prompt('Vào năm nào bản đặc tả ECMAScript-2015 được xuất bản?', '');

if (year < 2015) {
  alert( 'Quá sớm...' );
} else if (year > 2015) {
  alert( 'Quá muộn' );
} else {
  alert( 'Chuẩn!' );
}
```

Trong đoạn mã trên, JavaScript trước tiên kiểm tra `year < 2015`. Nếu đó là sai, nó xét tiếp điều kiện `year > 2015`. Nếu điều đó cũng sai, nó hiện cái `alert` cuối cùng.

Có thể có thêm nhiều khối `else if` nữa. Cái `else` cuối cùng là tùy chọn.

## Toán tử điều kiện '?'

Đôi khi, ta cần gán một biến dựa trên một điều kiện.

Chẳng hạn:

```js run no-beautify
let accessAllowed;
let age = prompt('Bạn bao nhiêu tuổi?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Toán tử được gọi là "có điều kiện" hay "chấm hỏi" cho ta làm việc đó ngắn và đơn giản hơn.

Toán tử được thể hiện bằng một dấu chẩm hỏi `?`. Đôi khi nó được gọi là "ba ngôi', vì toán tử có ba toán hạng. Nó thực ra là một toán tử và toán tử duy nhất trong JavaScript có nhiều như vậy.

Cú pháp là:
```js
let result = condition ? value1 : value2;
```

`condition` được lấy giá trị: nếu nó là đúng thì `value1` được trả về, nếu không, `value2`.

Ví dụ:

```js
let accessAllowed = (age > 18) ? true : false;
```

Đúng ra, ta có thể bỏ cặp ngoặc quanh `age > 18`. Toán tử chấm hỏi có mức ưu tiên thấp, do đó nó được thực hiện sau phép so sánh `>`.

Ví dụ sau đây sẽ làm y như ví dụ trước:

```js
// Toán tử so sánh "age > 18" đằng nào cũng được thực hiện trước
// (không cần bao nó vào ngoặc).
let accessAllowed = age > 18 ? true : false;
```

Nhưng ngoặc làm mã dễ đọc hơn, nên chúng tôi khuyên nên dùng.

````smart
Trong ví dụ trên, bạn có thể tránh dùng toán tử chấm hỏi vì bản thân phép so sánh đã trả về `true`/`false`:

```js
// Y hệt.
let accessAllowed = age > 18;
```
````

## Nhiều '?'

Một chuỗi toán tử chấm hỏi `?` có thể trả về một giá trị phụ thuộc vào nhiều điều kiện.

Ví dụ:
```js run
let age = prompt('Tuổi?', 18);

let message = (age < 3) ? 'Chào em bé!' :
  (age < 18) ? 'Chào!' :
  (age < 100) ? 'Xin kính chào!' :
  'Tuổi gì lạ thế!';

alert( message );
```

Có thể ban đầu sẽ khó một chút để hiểu điều gì đang diễn ra. Nhưng khi nhìn sâu hơn, ta có thể thấy đó chỉ là một chuỗi kiểm tra thông thường:

1. Dấu chấm hỏi đầu tiên kiểm tra liệu `age < 3`.
2. Nếu đúng, nó trả về `'Chào em bé!'`. Nếu không, nó xét tiếp biểu thức sau dấu hai chấm '":"', kiểm tra `age < 18`.
3. Nếu điều đó đúng, nó trả về `'Chào!'`. Nếu không, nó xét tiếp biểu thức sau dấu hai chấm tiếp theo '":"', kiểm tra `age < 100`.
4. Nếu điều đó đúng, nó trả về `'Xin kính chào!'`. Nếu không, nó xét tiếp biểu thức sau dấu hai chấm cuối cùng '":"', trả về `'Tuổi gì lạ thế!'`.

Đây là đoạn mã nếu dùng `if..else`:

```js
if (age < 3) {
  message = 'Chào em bé!';
} else if (age < 18) {
  message = 'Chào!';
} else if (age < 100) {
  message = 'Xin kính chào!';
} else {
  message = 'Tuổi gì lạ thế!';
}
```

## Dùng '?' theo cách không truyền thống

Đôi khi dấu chấm hỏi được dùng thay cho `if`:

```js run no-beautify
let company = prompt('Công ty nào đã tạo ra JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Đúng rồi!') : alert('Sai.');
*/!*
```

Tùy vào điều kiện `company == 'Netscape'`, hoặc là biểu thức đầu hoặc là biểu thức sau `?` được thực hiện và hiện ra một thông báo.

Ta không gán kết quả vào một biến ở đây. Thay vào đó, ta chạy các đoạn mã khác nhau tùy vào điệu kiện.

**Không nên dùng toán tử chấm hỏi theo cách này.**

Cách viết trên ngắn hơn câu lệnh `if` tương ứng, làm một số lập trình viên ưa thích. Nhưng nó khó đọc hơn.

Đây là cùng đoạn mã đó dùng `if` để so sánh:

```js run no-beautify
let company = prompt('Công ty nào đã tạo ra JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Đúng rồi!');
} else {
  alert('Sai.');
}
*/!*
```

Mắt ta lướt qua mã theo chiều dọc. Các đoạn mã trải ra nhiều dòng sẽ dễ hiểu hơn là một chuỗi chỉ dẫn dài theo chiều ngang.

Mục đích của toán tử chấm hỏi `?` là để trả về một giá trị này hoặc giá trị khác tùy vào điều kiện. Hãy chỉ dùng nó cho chính mục đích đó. Dùng `if` khi bạn cần thực hiện các nhánh mã khác nhau.
