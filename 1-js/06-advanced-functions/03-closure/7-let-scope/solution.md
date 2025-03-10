Kết quả là: **lỗi**.

Hãy thử chạy nó:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Trong ví dụ này, chúng ta có thể quan sát sự khác biệt đặc biệt giữa biến "không tồn tại" và "chưa được khởi tạo".

Như bạn có thể đã đọc trong bài viết [](info: closure), một biến bắt đầu ở trạng thái "chưa được khởi tạo" kể từ thời điểm khi quá trình thực thi đi vào một khối mã (hoặc một hàm). Và nó vẫn chưa được khởi tạo cho đến câu lệnh `let` tương ứng.

Nói cách khác, một biến tồn tại về mặt kỹ thuật, nhưng không thể được sử dụng trước `let`.

Đoạn mã trên chứng minh điều đó.

```js
function func() {
*!*
  // biến cục bộ x được biết đến với engine từ khi bắt đầu hàm,
  // nhưng "chưa được khởi tạo" (không sử dụng được) cho đến khi let ("vùng chết")
  // do đó lỗi
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

Vùng tạm thời không sử dụng được của một biến (từ đầu khối mã cho đến `let`) đôi khi được gọi là "vùng chết".
