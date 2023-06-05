
# Cú pháp "new Function"

Có một cách nữa để tạo một hàm. Nó hiếm khi được sử dụng, nhưng đôi khi không có sự thay thế.

## Cú pháp

Cú pháp để tạo hàm:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Hàm được tạo với các đối số `arg1...argN` và `functionBody` đã cho.

Nó dễ hiểu hơn bằng cách nhìn vào một ví dụ. Đây là một hàm có hai đối số:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

Và đây là một hàm không có đối số, chỉ có thân hàm:

```js run
let sayHi = new Function('alert("Xin chào")');

sayHi(); // Xin chào
```

Sự khác biệt chính so với các cách khác mà chúng ta đã thấy là hàm được tạo theo nghĩa đen từ một chuỗi, được truyền vào tại thời gian chạy.

Tất cả các khai báo trước đây đều yêu cầu chúng tôi, những lập trình viên, viết mã chức năng trong tập lệnh.

Nhưng `Hàm mới` cho phép biến bất kỳ chuỗi nào thành một hàm. Ví dụ, chúng ta có thể nhận một hàm mới từ máy chủ và sau đó thực thi nó:

```js
let str = ... nhận mã động từ máy chủ ...

let func = new Function(str);
func();
```

Nó được sử dụng trong các trường hợp rất cụ thể, chẳng hạn như khi chúng ta nhận mã từ máy chủ hoặc để biên dịch động một hàm từ mẫu, trong các ứng dụng web phức tạp.

## Bao đóng

Thông thường, một hàm ghi nhớ nơi nó được sinh ra trong thuộc tính đặc biệt `[[Environment]]`. Nó tham chiếu đến Lexical Environment từ nơi nó được tạo ra (chúng ta đã đề cập đến điều đó trong chương <info:closure>).

Nhưng khi một hàm được tạo bằng `new Function`, thì `[[Environment]]` của hàm đó được đặt để tham chiếu không phải Lexical Environment hiện tại, mà là environment chung.

Vì vậy, hàm như vậy không có quyền truy cập vào các biến bên ngoài, chỉ với các biến chung.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

So sánh nó với hành vi thông thường:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, từ Lexical Environment của getFunc
```

Tính năng đặc biệt này của `new Function` trông có vẻ lạ, nhưng tỏ ra rất hữu ích trong thực tế.

Hãy tưởng tượng rằng chúng ta phải tạo một hàm từ một chuỗi. Mã của hàm đó không được biết tại thời điểm viết tập lệnh (đó là lý do tại sao chúng ta không sử dụng các hàm thông thường), nhưng sẽ được biết trong quá trình thực thi. Chúng ta có thể nhận được nó từ máy chủ hoặc từ một nguồn khác.

Hàm mới của chúng ta cần tương tác với tập lệnh chính.

Nếu nó có thể truy cập các biến bên ngoài thì sao?

Vấn đề là trước khi JavaScript được xuất bản để sản xuất, nó đã được nén bằng cách sử dụng *minifier* -- một chương trình đặc biệt giúp thu nhỏ mã bằng cách loại bỏ các nhận xét thừa, khoảng trắng và -- điều quan trọng là đổi tên các biến cục bộ thành các biến cục bộ ngắn hơn.

Chẳng hạn, nếu một hàm có `let userName`, minifier sẽ thay thế nó bằng `let a` (hoặc một chữ cái khác nếu cái này bị chiếm dụng) và thực hiện nó ở mọi nơi. Đó thường là một điều an toàn để làm, bởi vì biến là cục bộ, không có gì bên ngoài hàm có thể truy cập nó. Và bên trong hàm, minifier thay thế mọi đề cập đến nó. Minifier rất thông minh, chúng phân tích cấu trúc mã, vì vậy chúng không phá vỡ bất kỳ thứ gì. Chúng không phải là một công cụ tìm và thay thế ngu ngốc.

Vì vậy, nếu `new Function` có quyền truy cập vào các biến bên ngoài, thì nó sẽ không thể tìm thấy  `userName` đã được đổi tên.

**Nếu `new Function` có quyền truy cập vào các biến bên ngoài, thì nó sẽ gặp vấn đề với các minifier.**

Bên cạnh đó, mã như vậy sẽ xấu về mặt kiến trúc và dễ bị lỗi.

Để truyền nội dung nào đó cho một hàm, được tạo dưới dạng `new Function`, chúng ta nên sử dụng các đối số của nó.

## Tóm tắt

Cú pháp:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Vì lý do lịch sử, các đối số cũng có thể được đưa ra dưới dạng danh sách được phân tách bằng dấu phẩy.

Ba khai báo này có nghĩa giống nhau:

```js
new Function('a', 'b', 'return a + b'); // cú pháp cơ bản
new Function('a,b', 'return a + b'); // phân tách bằng dấu phẩy
new Function('a , b', 'return a + b'); // phân tách bằng dấu phẩy với dấu cách
```

Các hàm được tạo bằng `new Function`, có `[[Environment]]` tham chiếu đến Lexical Environment chung, không phải environment bên ngoài. Do đó, chúng không thể sử dụng các biến bên ngoài. Nhưng điều đó thực sự tốt, bởi vì nó bảo đảm chúng ta không mắc lỗi. Truyền tham số một cách rõ ràng là một phương pháp tốt hơn nhiều về mặt kiến trúc và không gây ra vấn đề gì với các minifier.
