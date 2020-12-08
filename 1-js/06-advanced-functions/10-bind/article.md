libs:
  - lodash

---

# Ràng buộc hàm

Khi truyền các phương thức của đối tượng làm các callback, ví dụ cho `setTimeout`, có một vấn đề đã biết là: "mất `this`".

Trong chương này chúng ta sẽ xem xét các cách để sửa nó.

## Mất "this"

Chúng ta đã thấy những ví dụ về việc mất `this`. Sau khi một phương thức được truyền vào một nơi nào đó tách biệt với đối tượng -- thì `this` bị mất.

Đây là cách nó có thể xảy ra với `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Xin chào, undefined!
*/!*
```

Như chúng ta có thể thấy, đầu ra không hiển thị "John" giống như `this.firstName`, mà lại là `undefined`!

Đó là bởi vì `setTimeout` nhận hàm `user.sayHi`, tách biệt với đối tượng. Dòng cuối cùng có thể được viết lại như sau:

```js
let f = user.sayHi;
setTimeout(f, 1000); // mất ngữ cảnh user
```

Phương thức `setTimeout` trong trình duyệt hơi đặc biệt: nó đặt `this=window` cho lời gọi hàm (với Node.js, `this` trở thành đối tượng timer, nhưng ở đây điều đó không thực sự quan trọng). Vì vậy, đối với `this.firstName`, nó cố gắng lấy `window.firstName`, là cái không tồn tại. Trong các trường hợp tương tự khác, thường thì `this` chỉ trở thành `undefined`.

Tác vụ này khá điển hình - chúng ta muốn truyền một phương thức của đối tượng tới một nơi khác (ở đây - cho bộ lập lịch) nơi nó sẽ được gọi. Làm thế nào để đảm bảo rằng nó sẽ được gọi trong ngữ cảnh phù hợp?

## Giải pháp 1: sử dụng hàm bao

Giải pháp đơn giản nhất là sử dụng một hàm bao:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Xin chào, John!
}, 1000);
*/!*
```

Bây giờ nó hoạt động, vì nó nhận `user` từ môi trường từ vựng bên ngoài, và sau đó gọi phương thức một cách bình thường.

Cách viết tương tự, nhưng ngắn hơn:

```js
setTimeout(() => user.sayHi(), 1000); // Xin chào, John!
```

Có vẻ ổn, nhưng một lỗ hổng nhỏ xuất hiện trong cấu trúc mã của chúng ta.

Điều gì sẽ xảy ra nếu trước khi `setTimeout` kích hoạt (có độ trễ một giây!) `user` thay đổi giá trị? Sau đó, đột nhiên, nó sẽ gọi nhầm đối tượng!

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...giá trị của user thay đổi trong vòng 1 giây
user = {
  sayHi() { alert("Một user khác trong setTimeout!"); }
};

// Một user khác trong setTimeout!
```

Giải pháp tiếp theo đảm bảo rằng điều đó sẽ không xảy ra.

## Giải pháp 2: sử dụng "bind"

Mọi hàm đều có sẵn một phương thức có tên [bind](mdn:js/Function/bind) cho phép cố định giá trị cho `this`.

Cú pháp cơ bản là:

```js
// cú pháp phức tạp hơn sẽ được bàn đến sau một lát
let boundFunc = func.bind(context);
```

Kết quả của `func.bind (context)` là một "đối tượng kỳ lạ" đặc biệt giống hàm, có thể được gọi như hàm, và khi được gọi sẽ chuyển lời gọi này cho `func` và đặt `this=context`.

Nói cách khác, gọi `boundFunc` giống như gọi `func` nhưng với `this` luôn là `context`.

Ví dụ, ở đây `funcUser` chuyển lời gọi cho `func` với `this=user`:

```js run
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John
*/!*
```

Ở đây `func.bind(user)` có thể coi là một "biến thể đã ràng buộc" của `func`, với `this` cố định là `user`.

Tất cả đối số được truyền "nguyên trạng" cho hàm `func` gốc, ví dụ:

```js run
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// ràng buộc this với user
let funcUser = func.bind(user);

*!*
funcUser("Xin chào"); // Xin chào, John (đối số "Xin chào" được truyền cho func, và this=user)
*/!*
```

Bây giờ thử áp dụng với phương thức của một đối tượng:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// có thể chạy nó mà không cần một đối tượng
sayHi(); // Xin chào, John!

setTimeout(sayHi, 1000); // Xin chào, John!

// ngay cả khi giá trị của user thay đổi trong vòng 1 giây
// sayHi sử dụng giá trị ràng buộc trước (pre-bound) là một tham chiếu đến đối tượng user cũ
user = {
  sayHi() { alert("Một user khác trong setTimeout!"); }
};
```

Trong dòng `(*)`, chúng ta lấy phương thức `user.sayHi` và ràng buộc nó với `user`. `SayHi` là một hàm "bị ràng buộc", có thể được gọi một mình hoặc được truyền cho `setTimeout` -- không quan trọng, ngữ cảnh sẽ đúng.

Ở đây chúng ta có thể thấy rằng các đối số được truyền "nguyên trạng", chỉ có `this` được cố định bởi `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Xin chào, John (đối số "Xin chào" được truyền tới say)
say("Bye"); // Tạm biệt, John ("Tạm biệt" được truyền tới say)
```

````smart header="Convenience method: `bindAll`"
Nếu một đối tượng có nhiều phương thức và chúng ta dự định chủ động truyền nó xung quanh, thì chúng ta có thể ràng buộc tất cả chúng trong một vòng lặp:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Các thư viện JavaScript cũng cung cấp các chức năng để thuận tiện ràng buộc hàng loạt, ví dụ [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) trong lodash.
````

## Các hàm một phần

Cho đến giờ chúng ta chỉ nói về ràng buộc `this`. Hãy tiến thêm một bước nữa.

Chúng ta có thể ràng buộc không chỉ `this`, mà còn cả các đối số. Điều đó hiếm khi được thực hiện, nhưng đôi khi có thể hữu ích.

Cú pháp đầy đủ của `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Nó cho phép ràng buộc ngữ cảnh là `this` và các đối số bắt đầu của hàm.

Ví dụ, chúng ta có một hàm nhân `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Hãy sử dụng `bind` để tạo một hàm `double` trên cơ sở của nó:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

Lời gọi đến `mul.bind(null, 2)` tạo ra một hàm mới `double` mà chuyển các lời gọi đến `mul`, cố định `null` làm ngữ cảnh và `2` là đối số đầu tiên. Các đối số khác được truyền "nguyên trạng".

Đó được gọi là [ứng dụng hàm một phần] (https://en.wikipedia.org/wiki/Partial_application) - chúng ta tạo một hàm mới bằng cách cố định một số tham số của hàm hiện có.

Xin lưu ý rằng chúng ta không thực sự sử dụng `this` ở đây. Nhưng `bind` yêu cầu nó, vì vậy chúng ta phải để vào một cái gì đó như `null`.

Hàm `triple` trong đoạn mã dưới đây tăng gấp ba lần giá trị:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Tại sao chúng ta thường tạo một hàm một phần?

Lợi ích là chúng ta có thể tạo một hàm độc lập với tên có thể đọc được (`double`, `triple`). Chúng ta có thể sử dụng nó và không phải cung cấp đối số đầu tiên vì nó được cố định bằng `bind`.

Trong các trường hợp khác, ứng dụng một phần sẽ hữu ích khi chúng ta có một hàm rất tổng quát và muốn một biến thể ít tổng quát hơn của nó để thuận tiện.

Ví dụ, chúng ta có một hàm `send(from, to, text)`. Sau đó, bên trong một đối tượng `user`, chúng ta có thể muốn sử dụng một biến thể một phần của nó: `sendTo(to, text)` gửi từ user hiện tại.

## Đi một phần không có ngữ cảnh

Điều gì sẽ xảy ra nếu chúng ta muốn cố định một số đối số, nhưng không phải là ngữ cảnh `this`? Ví dụ, đối với một phương thức của đối tượng.

Hàm `bind` không cho phép điều đó. Chúng ta không thể bỏ qua ngữ cảnh và chuyển sang đối số.

May mắn thay, một hàm `partial` mà chỉ ràng buộc các đối số có thể được cài đặt dễ dàng.

Như thế này:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Sử dụng:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// thêm một phương thức một phần với thời gian cố định
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Xin chào");
// Cái gì đó giống như:
// [10:00] John: Xin chào!
```

Kết quả của lời gọi `partial(func[, arg1, arg2...])` là một hàm bao `(*)` mà gọi hàm `func` với:
- Cùng `this` như nó nhận được (đối với `user.sayNow` thì gọi `user` của nó)
- Sau đó cung cấp cho nó `...argsBound` -- các đối số từ lời gọi `partial` (`"10:00"`)
- Sau đó cung cấp cho nó `...args` -- các đối số cho hàm bao (`"Hello"`)

Quá dễ dàng để thực hiện nó với cú pháp spread phải không?

Ngoài ra, có một cài đặt [_.partial](https://lodash.com/docs#partial) sẵn sàng từ thư viện lodash.

## Tóm tắt

Phương thức `func.bind (context, ... args)` trả về "biến thể bị ràng buộc" của hàm `func` để cố định ngữ cảnh `this` và các đối số đầu tiên nếu được cung cấp.

Thông thường, chúng ta áp dụng `bind` để cố định `this` cho một phương thức của đối tượng để chúng ta có thể truyền nó đi đâu đó. Ví dụ, tới `setTimeout`.

Khi chúng ta cố định một số đối số của một hàm hiện có, hàm kết quả (ít phổ biến hơn) được gọi là hàm *áp dụng một phần* hoặc hàm *một phần*.

Các hàm *một phần* thuận tiện khi chúng ta không muốn lặp đi lặp lại cùng một đối số. Giống như nếu chúng ta có một hàm `send (from, to)`, và `from` phải luôn giống nhau cho tác vụ của chúng ta, chúng ta có thể lấy hàm *một phần* và tiếp tục với nó.
