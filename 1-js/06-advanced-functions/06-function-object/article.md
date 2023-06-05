
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

Chúng tôi đã đạt được bất cứ điều gì ở đây? Mục đích của tên `"func"` bổ sung đó là gì?

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

Why do we use `func`? Maybe just use `sayHi` for the nested call?


Actually, in most cases we can:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

That happens because the function takes `sayHi` from its outer lexical environment. There's no local `sayHi`, so the outer variable is used. And at the moment of the call that outer `sayHi` is `null`.

The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let's use it to fix our code:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```

Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", how the function can call itself internally.

```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.

Sometimes, when we need a reliable internal name, it's the reason to rewrite a Function Declaration to Named Function Expression form.
```

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.


So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
