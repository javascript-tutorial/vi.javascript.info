
# Đối tượng hàm, NFE

Như chúng ta đã biết, một hàm trong JavaScript là một giá trị.

Mọi giá trị trong JavaScript đều có một loại. Hàm là loại gì?

Trong JavaScript, hàm là đối tượng.

Một cách hay để tưởng tượng các chức năng là "đối tượng hành động" có thể gọi được. Chúng ta không chỉ có thể gọi chúng mà còn coi chúng như các đối tượng: thêm/xóa thuộc tính, chuyển qua tham chiếu, v.v.


## Thuộc tính "name"

Các đối tượng chức năng chứa một số thuộc tính có thể sử dụng được.

Chẳng hạn, tên của hàm có thể truy cập dưới dạng thuộc tính "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

Thật buồn cười, logic gán tên thật thông minh. Nó cũng gán tên chính xác cho một hàm ngay cả khi nó được tạo mà không có tên, và sau đó được gán ngay lập tức:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (có một cái tên!)
```

Nó cũng hoạt động nếu việc gán được thực hiện thông qua một giá trị mặc định:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (hoạt động!)
}

f();
```

Trong thông số kỹ thuật, tính năng này được gọi là "tên theo ngữ cảnh". Nếu hàm không cung cấp một hàm, thì trong một nhiệm vụ, nó được tìm ra từ ngữ cảnh.

Các phương thức đối tượng cũng có tên:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Tuy nhiên, không có phép thuật đâu. Có những trường hợp không có cách nào để tìm ra tên đúng. Trong trường hợp đó, thuộc tính name trống, như ở đây:

```js run
// hàm được tạo bên trong array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// engine không có cách nào để thiết lập đúng tên, vì vậy không có tên
```

Tuy nhiên, trong thực tế, hầu hết các hàm đều có tên.

## Thuộc tính "length"

có một thuộc tính tích hợp sẵn khác là "length" trả về số lượng tham số hàm, vídu5:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...hơn nữa) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Ở đây chúng ta có thể thấy rằng các tham số còn lại không được tính.

Thuộc tính `length` đôi khi được sử dụng cho [tự xét](https://en.wikipedia.org/wiki/Type_introspection) trong các hàm hoạt động trên các hàm khác.

Chẳng hạn, trong mã bên dưới, hàm `ask` chấp nhận một `question` để hỏi và một số hàm `handlers` tùy ý để gọi.

Khi người dùng cung cấp câu trả lời của họ, hàm sẽ gọi trình xử lý. Chúng ta có thể vượt qua hai loại trình xử lý:

- Hàm không đối số, chỉ được gọi khi người dùng đưa ra câu trả lời khẳng định.
- Hàm có đối số, được gọi trong cả hai trường hợp và trả về câu trả lời.

Để gọi `handler` đúng cách, chúng ta kiểm tra thuộc tính `handler.length`.

Ý tưởng là chúng ta có một cú pháp trình xử lý đơn giản, không có đối số cho các trường hợp khẳng định (biến thể phổ biến nhất), nhưng cũng có thể hỗ trợ các trình xử lý chung:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// đối với câu trả lời khẳng định, cả hai trình xử lý được gọi
// đối với câu trả lời phủ định, chỉ gọi cái thứ hai
ask("Câu hỏi?", () => alert('Bạn nói có'), result => alert(result));
```

Đây là một trường hợp cụ thể của cái gọi là [đa hình](https://vi.wikipedia.org/wiki/%C4%90a_h%C3%ACnh_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh)) -- xử lý các đối số khác nhau tùy thuộc vào loại của chúng hoặc, trong trường hợp của chúng ta, tùy thuộc vào `length`. Ý tưởng này được sử dụng trong các thư viện JavaScript.

## Thuộc tính tùy chỉnh

Chúng ta cũng có thể thêm các thuộc tính của riêng mình.

Ở đây chúng ta thêm thuộc tính `counter` để theo dõi tổng số cuộc gọi:

```js run
function sayHi() {
  alert("Chào");

  *!*
  // hãy đếm xem chúng ta chạy bao nhiêu lần
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // giá trị ban đầu

sayHi(); // Chào
sayHi(); // Chào

alert( `Đã gọi ${sayHi.counter} lần` ); // Đã gọi 2 lần
```

```warn header="Một thuộc tính không phải là một biến"
Một thuộc tính được gán cho một hàm như `sayHi.counter = 0` *không* xác định một biến chung `counter` bên trong nó. Nói cách khác, một thuộc tính `counter` và một biến `let counter` là hai thứ không liên quan đến nhau.

Chúng ta có thể coi một hàm như một đối tượng, lưu trữ các thuộc tính trong đó, nhưng điều đó không ảnh hưởng đến việc thực thi của nó. Các biến không phải là thuộc tính của hàm và ngược lại. Đây chỉ là những thế giới song song.
```

Các thuộc tính chức năng đôi khi có thể thay thế các bao đóng. Chẳng hạn, chúng ta có thể viết lại ví dụ về hàm bộ đếm từ chương <info:closure> để sử dụng thuộc tính hàm:

```js run
function makeCounter() {
  // thay vì:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` hiện được lưu trữ trực tiếp trong hàm, không phải ở Lexical Environment bên ngoài của nó.

Nó tốt hơn hay tệ hơn việc sử dụng một bao đóng?

Sự khác biệt chính là nếu giá trị của `count` tồn tại trong một biến bên ngoài, thì mã bên ngoài không thể truy cập vào biến đó. Chỉ các hàm lồng nhau mới có thể sửa đổi nó. Và nếu nó bị ràng buộc với một hàm, thì điều đó có thể xảy ra:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Vì vậy, việc lựa chọn thực hiện phụ thuộc vào mục tiêu của chúng ta.

## Named Function Expression

Named Function Expression, hay NFE, là một thuật ngữ cho Function Expression có tên.

Chẳng hạn, hãy lấy một Function Expression thông thường:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Và thêm một cái tên cho nó:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Xin chào, ${who}`);
};
```

Chúng ta đã đạt được bất cứ điều gì ở đây? Mục đích của tên `"func"` bổ sung đó là gì?

Trước tiên, hãy lưu ý rằng chúng ta vẫn có một Function Expression. Việc thêm tên `"func"` sau `function` không làm cho nó trở thành một Function Declaration, bởi vì nó vẫn được tạo như một phần của biểu thức gán.

Thêm một tên như vậy cũng không phá vỡ bất cứ điều gì.

Chức năng này vẫn có sẵn dưới dạng `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Xin chào, ${who}`);
};

sayHi("John"); // Xin chào, John
```

Có hai điều đặc biệt về cái tên `func`, đó là lý do của nó:

1. Nó cho phép hàm tự tham chiếu nội bộ.
2. Nó không nhìn thấy được bên ngoài hàm.

Chẳng hạn, hàm `sayHi` bên dưới tự gọi lại bằng `"Khách"` nếu không cung cấp `who`:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Xin chào, ${who}`);
  } else {
*!*
    func("Khách"); // sử dụng func để gọi lại chính nó
*/!*
  }
};

sayHi(); // Xin chào,Khách

// Nhưng cái này sẽ không hoạt động:
func(); // Error, func is not defined (không hiển thị bên ngoài hàm)
```

Tại sao chúng ta sử dụng `func`? Có lẽ chỉ cần sử dụng `sayHi` cho cuộc gọi lồng nhau?


Trên thực tế, trong hầu hết các trường hợp, chúng ta có thể:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Xin chào, ${who}`);
  } else {
*!*
    sayHi("Khách");
*/!*
  }
};
```

Vấn đề với mã đó là `sayHi` có thể thay đổi ở mã bên ngoài. Nếu hàm được gán cho một biến khác, mã sẽ bắt đầu báo lỗi:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Xin chào, ${who}`);
  } else {
*!*
    sayHi("Khách"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

Điều đó xảy ra bởi vì hàm lấy `sayHi` từ lexical environment bên ngoài của nó. Không có `sayHi` cục bộ, vì vậy biến bên ngoài được sử dụng. Và tại thời điểm gọi, `sayHi` bên ngoài là `null`.

Tên tùy chọn mà chúng ta có thể đặt vào Function Expression nhằm giải quyết chính xác các loại vấn đề này.

Hãy sử dụng nó để sửa mã của chúng ta:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Xin chào, ${who}`);
  } else {
*!*
    func("Khách"); // Bây giờ tất cả đều ổn
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Xin chào, Khách (cuộc gọi lồng nhau hoạt động)
```

Bây giờ nó hoạt động, bởi vì tên `"func"` là chức năng cục bộ. Nó không được lấy từ bên ngoài (và không nhìn thấy ở đó). Thông số kỹ thuật đảm bảo rằng nó sẽ luôn tham chiếu đến hàm hiện tại.

Mã bên ngoài vẫn có biến `sayHi` hoặc `welcome` của nó. Và `func` là một "tên hàm nội bộ", làm thế nào hàm có thể gọi chính nó trong nội bộ.

```smart header="Không có điều đó cho Function Declaration"
Tính năng "tên nội bộ" được mô tả ở đây chỉ khả dụng cho Function Expression, không dành cho Function Declaration. Đối với Function Declaration, không có cú pháp nào để thêm tên "nội bộ".

Đôi khi, khi chúng ta cần một tên nội bộ đáng tin cậy, đó là lý do để viết lại một Function Declaration thành kiểu Named Function Expression.
```

## Tóm tắt

Hàm là đối tượng.

Ở đây chúng ta đã đề cập đến các thuộc tính của chúng:

- `name` -- tên chức năng. Thường được lấy từ định nghĩa hàm, nhưng nếu không có, JavaScript sẽ cố gắng đoán nó từ ngữ cảnh (ví dụ: một nhiệm vụ).
- `length` -- số lượng đối số trong định nghĩa hàm. Các thông số còn lại không được tính.

Nếu hàm được khai báo là Function Expression (không có trong luồng mã chính) và hàm mang tên, thì nó được gọi là Named Function Expression. Tên có thể được sử dụng bên trong để tham chiếu chính nó, cho các cuộc gọi đệ quy hoặc tương tự.

Ngoài ra, các hàm có thể mang các thuộc tính bổ sung. Nhiều thư viện JavaScript nổi tiếng sử dụng rất tốt tính năng này.

Họ tạo một chức năng "chính" và đính kèm nhiều chức năng "trợ giúp" khác cho nó. Chẳng hạn, thư viện [jQuery](https://jquery.com) tạo một hàm có tên `$`. Thư viện [lodash](https://lodash.com) tạo một hàm `_`, sau đó thêm `_.clone`, `_.keyBy` và các thuộc tính khác vào hàm đó (xem [tài liệu](https:/ /lodash.com/docs) khi bạn muốn tìm hiểu thêm về chúng). Trên thực tế, họ làm điều đó để giảm bớt ô nhiễm không gian chung, do đó, một thư viện duy nhất chỉ cung cấp một biến chung. Điều đó làm giảm khả năng đặt tên xung đột.


Vì vậy, một chức năng có thể tự thực hiện một công việc hữu ích và cũng mang theo một loạt các hàm khác trong các thuộc tính.
