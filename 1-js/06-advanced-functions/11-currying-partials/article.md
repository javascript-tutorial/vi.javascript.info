libs:
  - lodash

---

# Hàm riêng và currying

Ở bài trước ta đã học cách ràng buộc `this`. Cùng tiến thêm một bước nữa ở bài này.

Không chỉ `this` ta còn có thể ràng buộc cả các tham số của hàm nữa. Hiếm khi được dùng nhưng đôi khi nó khá tiện lợi.

Cú pháp đầy đủ của `bind`:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

Nó cho phép ràng buộc `this` với `context` và cố định giá trị `arg1`, `arg2`, ... cho các tham số tương ứng.

Ví dụ, chúng ta có hàm nhân `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Sử dụng `bind` để tạo hàm nhân đôi `double` từ hàm nhân trên bằng cách ràng buộc `a=2`:

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

`mul.bind(null, 2)` tạo hàm mới `double`, hàm này chuyển lời gọi cho `mul`, ràng buộc `this` với `null` và `a` với `2`. Các đối số truyền cho `double` sau đó được truyền lại cho `mul` như các đối số tiếp theo.

Thao tác này gọi là [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- chúng ta tạo một hàm mới bằng cách cố định một vài tham số của hàm đã có. Hàm được tạo ra theo cách này gọi là "hàm riêng" (partial function).

Chú ý ở đây ta không sử dụng `this`. Nhưng vì `bind` yêu cầu nó, nên phải cung cấp thứ gì đó chẳng hạn như `null`.

Hàm nhân ba `triple` dưới đây được tạo từ hàm nhân `mul` bằng cách cố định `a=3`:

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

Nhưng tại sao lại phải tạo hàm riêng?

Lợi ích của hàm riêng là chúng ta có thể tạo một hàm độc lập với tên dễ đọc (`double`, `triple`). Có thể sử dụng nó mà không cần phải liên tục cung cấp lại đối số đầu tiên (là `2` với `double`, là `3` với `triple`) bởi nó đã được cố định nhờ `bind` rồi.

Hàm riêng hữu dụng khi chúng ta có một hàm có nhiều tính năng, và muốn tạo ra một biến thể chỉ dùng một vài tính năng trong đó.

Ví dụ, chúng ta có hàm `send(from, to, text)` cho phép gửi tin nhắn `text` từ đối tượng `from` bất kỳ tới đối tương `to` nào. Sau đó, trong đối tượng `user` chúng ta muốn sử dụng một phiên bản riêng của `send` là `sendTo(to, text)` chỉ cần gửi tin nhắn từ `user`.

## Tạo hàm riêng không ràng buộc "this"

Làm sao để chỉ cố định vài tham số, chứ không cố định `this`?

Phương thức `bind` không cho phép điều này. Chúng ta không thể bỏ qua `context` và nhảy ngay tới các đối số.

Nhưng may mắn, ta có thể dễ dàng viết hàm `partial` thực hiện việc này.

Cách viết như sau:

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
  firstName: "Hùng",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// tạo phương thức riêng từ hàm say bằng cách cố định tham số đầu
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Xin chào");
// Kết quả trông như:
// [10:00] Hùng: Xin chào!
```

Kết quả của `partial(func[, arg1, arg2...])` là một hàm bao `(*)` gọi `func` và truyền vào đó:
- `this` của nó (với `user.sayNow` `this` là `user`)
- `...argsBound` -- đối số từ lời gọi `partial` (`"10:00"`)
- `...args` -- đối số từ lời gọi hàm bao (`"Xin chào"`)

Thật dễ dàng để thực hiện nó với toán tử "spread" phải không?

Cũng có một hàm là [_.partial](https://lodash.com/docs#partial) thực hiện việc này trong thư viện lodash.

## Currying

Đôi khi mọi người nhầm lẫn hàm riêng với một thuật ngữ khác có tên "currying". Nó là một kỹ thuật thú vị khác mà chúng ta cần đề cập đến ở đây.

[Currying](https://en.wikipedia.org/wiki/Currying) là việc thay đổi cách gọi hàm từ `f(a, b, c)` thành `f(a)(b)(c)`. Trong JavaScript để currying, chúng ta thường tạo một hàm bao để giữ hàm gốc.

Currying không gọi hàm, chỉ chuyển đổi nó.

Cùng tạo hàm trợ giúp `curry(f)` giúp ta currying hàm `f` có hai tham số. Nói cách khác sau khi gọi `curry(f)` cách gọi `f(a, b)` phải thay bằng `f(a)(b)`:

```js run
*!*
function curry(f) { // currying hàm f
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// sử dụng
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

Như bạn thấy, ta currying nhờ một chuỗi các hàm bao.

- Kết quả của `curry(func)` là hàm bao `function(a)`.
- Khi hàm này được gọi: `sum(1)`, đối số `1` được lưu trong Lexical Environment, và một hàm bao mới được trả về là `function(b)`.
- Sau đó `sum(1)(2)` gọi `function(b)` với đối số `2` được lưu vào Lexical Environment hiện tại. `function(b)` sau đó chuyển lời gọi này cho hàm gốc `sum` truyền vào hai đối số là `1` và `2`. Đối số `1` lấy từ Lexical Environment ngoài, `2` lấy từ Lexical Environment của nó.

Cách viết nâng cao hơn của currying như hàm [_.curry](https://lodash.com/docs#curry) trong thư viện lodash thực hiện công việc currying một cách tinh vi hơn. Chúng trả về một hàm bao cho phép một hàm được gọi bình thường nếu tất cả các đối số được cung cấp nếu không trả về một hàm riêng.

```js
function curry(f) {
  return function(...args) {
    // nếu args.length == f.length (truyền đủ đối số),
    // thì chuyển lời gọi cho f
    // nếu không trả về hàm riêng của f cố định các tham số đầu với args
  };
}
```

## Currying để làm gì?

Để hiểu lợi ích của currying, chúng ta cần một ví dụ thực tế.

*Currying nâng cao* cho phép hàm có thể gọi theo cách thông thường hoặc tạo ra các hàm riêng để gọi theo kiểu `f(a)(b)(c)`.

Ví dụ chúng ta có hàm `log(date, importance, message)` giúp định dạng và xuất thông tin. Trong các dự án thực tế các hàm này cũng có thêm nhiều tính năng khác như gửi qua mạng, nhưng ở đây chúng ta chỉ sử dụng `alert` để xuất thông tin:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Thực hiện currying.

```js
log = _.curry(log);
```

Lúc này `log` có thể gọi theo hai cách:

```js
log(new Date(), "DEBUG", "some debug"); // log(a,b,c)
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Ta cũng có thể dễ dàng tạo ra một hàm riêng từ hàm `log`:

```js
// currentLog là hàm riêng cố định tham số đầu tiên
let logNow = log(new Date());

// sử dụng nó
logNow("INFO", "message"); // [HH:mm] INFO message
```

Từ một hàm riêng có thể tạo một hàm riêng khác, với số tham số cố định tăng lên:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

Cho nên:
1. Chúng ta không mất đi thứ gì sau khi currying: `log` vẫn có thể gọi như bình thường.
2. Chúng ta có thể dễ dàng tạo ra các hàm riêng.

## Cách viết currying nâng cao

Nếu bạn muốn biết chi tiết (không bắt buộc) thì đây là cách viết currying nâng cao để có thể sử dụng như ở trên:

Nó khá ngắn:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Ví dụ sử dụng:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, vẫn gọi bình thường
alert( curriedSum(1)(2,3) ); // 6, currying tham số đầu tiên
alert( curriedSum(1)(2)(3) ); // 6, currying toàn bộ
```

Thuật toán có vẻ phức tạp nhưng thực ra cũng dễ hiểu.

Kết quả của `curry(func)` là hàm bao `curried` trông như sau:

```js
// func là hàm gốc
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Khi chạy nó, có hai nhánh:

1. Gọi hàm gốc `func` ngay: nếu truyền đủ hoặc thừa tham số.
2. Trả về hàm riêng: `func` chưa được gọi. Thay vì thế trả về một hàm bao khác, hàm này kết hợp các đối số truyền vào `curried` ở lần gọi đầu với các đối số truyền vào nó sau đó, gọi lại `curried` và truyền tất cả các đối số này. Trong lần gọi `curried` mới này, quá trình lại lặp lại, gọi hàm gốc hoặc trả về một hàm riêng.

Ví dụ, cùng xem chuyện gì xảy ra với `sum(a, b, c)`. Hàm có 3 tham số nên `sum.length = 3`.

Khi gọi `curried(1)(2)(3)`:

1. Lời gọi đầu `curried(1)` lưu `1` trong Lexical Environment của nó, và trả về hàm bao `pass`.
2. Hàm bao `pass` được gọi với `(2)`: nó lấy đối số trước (`1`), kết hợp với đối số của nó `(2)` và gọi `curried(1, 2)`.

    Vì số đối số vẫn nhỏ hơn 3, `curried` lại trả về `pass`.
3. Hàm `pass` lại được gọi với `(3)`, nó lấy hai đối số trước (`1`, `2`) thêm với `3` và gọi `curried(1, 2, 3)` -- có `3` đối số nên hàm gốc được gọi và trả về kết quả.

Nếu vẫn chưa rõ ràng, hãy ghi nhớ các bước trong đầu hoặc ghi ra giấy.

```smart header="Chỉ chấp nhận hàm có số tham số cố định"
Currying yêu cầu hàm có số đối số cố định và đã biết số lượng.
```

```smart header="Cách gọi thông thường vẫn được giữ lại"
Theo định nghĩa, currying chuyển hoàn toàn `sum(a, b, c)` thành `sum(a)(b)(c)`.

Nhưng hầu hết các cách thực hiện currying trong JavaScript đều giữ lại cách gọi hàm thông thường.
```

## Tóm tắt

- Khi chúng ta cố định một vài tham số của hàm hiện tại, kết quả ta có một hàm riêng. Chúng ta có thể sử dụng `bind` để tạo một hàm riêng, nhưng cũng có những cách khác.

    Hàm riêng rất tiện khi ta không muốn lặp lại nhiều lần việc truyền cùng một đối số vào hàm. Chẳng hạn ta có hàm `send(from, to)`, và `from` luôn như nhau, chúng ta có thể tạo hàm riêng của `send` bằng cách cố định giá trị của `from`.

- *Currying* là chuyển cách gọi hàm `f(a,b,c)` thành `f(a)(b)(c)`. Khi thực hiện currying trong JavaScript, thường vẫn giữ lại cách gọi hàm cũ `f(a, b, c)`. Khi truyền thiếu đối số, một hàm riêng được trả về.

    Currying giúp ta dễ dàng tạo ra hàm riêng. Như ta đã thấy trong ví dụ: hàm chung `log(date, importance, message)` sau khi được currying trả về các hàm riêng khi ta gọi nó với một đối số: `log(date)` hoặc hai đối số: `log(date, importance)`.  
