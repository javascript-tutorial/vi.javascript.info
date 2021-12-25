# Arrow functions cơ bản
Có một cách khác sơn đơn giản và cú pháp ngắn gọn để tạo functions, và thường thì tốt hơn Function Expressions.

Nó được gọi là "arrow functions", ví nó trông như sau:

```js
let func = (arg1, arg2, ..., argN) => expression
```

...Phía trên ta tạo một function `func` với các đối số `arg1..argN`, sau đó đánh giá `expression` phía bên phải với việc sử dụng chúng và trả về kết quả của nó.

Nói cách khác, nó là phiên bản ngắn gọn hơn của:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Hãy xem ví dụ cụ thể sau đây:

```js run
let sum = (a, b) => a + b;

/* arrow function này là một phiên bản gọn hơn của:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```
Như bạn có thể thấy `(a, b) => a + b` có nghĩa là một function nhận 2 đối số có tên là `a` và `b`. Khi thực thi, nó thực hiện `a + b` và trả về kết quả. 

- Nếu chúng ta chỉ có một đối số, thì cặp ngoặc tròn có thể được loại bỏ.

    Ví dụ:

    ```js run
    *!*
    let double = n => n * 2;
    // tương tự với: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Nếu không có đối số, sẽ không có gì trong ngoặc trong (nhưng chúng vẫn nên được sử dụng):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow functions có thể được sử dụng giống với Function Expressions.

Ví dụ, để tạo một function một cách động:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```
Arrow functions có thể không quen thuộc và không thực sự dễ đọc lúc ban đầu, nhưng nó sẽ nhanh chóng thay đổi sau khi bạn quen mắt với cấu trúc này.

Chúng rất tiên cho các hành động 1 dòng, khi bạn quá lười để viết nhiều từ.

## Arrow functions nhiều dòng

Ví dụ phía trên nhận các đối số từ bên phải của `=>` và thực thi các expression với chúng.

Thỉnh thoảng chúng ta cần một thứ gì đó phức tạp hơn, ví dụ như nhiều expressions hoặc statements. Điều này là có thể nhưng chúng ta nên đóng chúng lại trong ngoặc nhọn. Sau đó sử dụng `return` như bình thường.

Chẳng hạn như sau:

```js run
let sum = (a, b) => {  // ngoặc nhọn mở ra một function nhiều dòng
  let result = a + b;
*!*
  return result; // nếu sử dụng ngoặc nhọn thì cần có return
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Nhiều hơn nữa"
Ở đây chúng ta đề cao arrow functions cho sự ngắn gọn. Nhưng đó không phải tất cả!

Arrow functions có một số tính năng thú vị khác.

Để học về chúng một cách sâu hơn, trước tiên chúng ta cần phải biết một số khía cạnh khác của JavaScript, cho nên chúng ta sẽ trở lại với arrow function trong chapter sau <info:arrow-functions>.

Bây giờ, chúng ta đã có thể sử dụng arrow functions với các hành động 1 dòng và callbacks. 
```

## Tổng kết

Arrow functions tiện lợi cho các hành động 1 dòng. Có thể dùng theo 2 cách sau:

1. Không sử dụng ngoặc nhọn: `(...args) => expression` -- phía bên phải là một expression: hàm này sẽ thực thi nó và trả về kết quả.
2. Sử dụng ngoặc nhọn: `(...args) => { body }` -- cặp ngoặc cho phép chúng ta có thể viết nhiều statements phía trong function, nhưng chúng ta cần `return` để trả về thứ gì đó.
