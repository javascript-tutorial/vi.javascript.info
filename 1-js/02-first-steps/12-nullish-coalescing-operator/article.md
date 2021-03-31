# Toán tử nullish coalescing '??'

[recent browser="new"]

Toán tử nullish coalescing được viết dưới dạng hai dấu hỏi `??`.

Do toán tử này coi `null` và `undefined` như nhau, chúng ta sẽ dùng một thuật ngữ đặc biệt ở bài này. Chúng ta sẽ nói rằng một biểu thức được coi là "được định nghĩa" khi nó không phải là `null` hoặc `undefined`.

Kết quả của `a ?? b` là:

- Nếu `a` được định nghĩa, trả về `a`,
- Nếu `a` chưa được định nghĩa, trả về `b`.

Nói một cách khác, `??` trả về đối số đầu tiên nếu nó không có giá trị `null/undefined`. Nếu không thì trả về đối số thứ hai.

Toán tử nullish coalescing không phải là hoàn toàn mới. Nó đơn thuần là một cú pháp ngắn gọn để lấy giá trị đầu tiên "được định nghĩa" trong hai giá trị.

Chúng ta có viết lại biểu thức `result = a ?? b` sử dụng toán tử khác mà chúng ta đã biết, như sau:

```js
result = a !== null && a !== undefined ? a : b;
```

Giờ thì chắc bạn đã biết rõ toán tử `??` làm gì. Hãy xem có thể áp dụng toán tử này ở đâu.

Use case thường gặp để dùng toán tử `??` là để cung cấp một giá trị mặc định cho một biến số có khả năng là undefined.

Ví dụ, ở đây chúng ta sẽ hiển thị `user` nếu như được định nghĩa, nếu không sẽ hiển thị `Ẩn danh`:

```js run
let user;

alert(user ?? "Ẩn danh"); // Ẩn danh (user chưa được định nghĩa)
```

Còn dưới đây là ví dụ với `user` được gán với một cái tên:

```js run
let user = "John";

alert(user ?? "Ẩn danh"); // John (user đã được định nghĩa)
```

Chúng ta cũng có thể dùng nhiều toán tử `??` để chọn giá trị đầu tiên trong một danh sách mà không có giá trị là `null/undefined`.

Ví dụ chúng ta có một dữ liệu của người dùng trong các biến `firstName`, `lastName` hoặc `nickName`. Tất cả đều có thể chưa được định nghĩa, nếu như người dùng quyết định không nhập vào giá trị.

Và chúng ta muốn hiển thị tên người dùng sử dụng một trong các biến này, hoặc hiển thị "Ẩn danh" nếu như tất cả đều chưa được định nghĩa.

Hãy sử dụng toán tử `??` cho trường hợp đó:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// hiển thị giá trị được định nghĩa đầu tiên:
*!*
alert(firstName ?? lastName ?? nickName ?? "Ẩn danh"); // Supercoder
*/!*
```

## So sánh với toán tử ||

Toán tử HOẶC `||` có thể được dùng theo cùng cách với `??`, như cách được mô tả ở [chương trước](info:logical-operators#or-finds-the-first-truthy-value).

Ví dụ, ở đoạn code phía trên chúng ta có thể thay thế `??` với `||` và vẫn đạt được cùng kết quả:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// hiển thị giá trị truthy đầu tiên:
*!*
alert(firstName || lastName || nickName || "Ẩn danh"); // Supercoder
*/!*
```

Về mặt lịch sử, toán tử HOẶC `||` có trước. Nó tồn tại từ khi Javascript được tạo ra, do vậy lập trình viên đã dùng chúng cho những việc trên từ rất lâu.

Ngược lại, toán tử nullish coalescing `??` mới được thêm vào Javascript gần đây, và lý do là vì mọi người không thực sự hài lòng với toán tử `||`.

Điểm khác biệt quan trọng giữa cả hai là:

- `||` trả về giá trị _truthy_ đầu tiên.
- `??` trả về giá trị _được_ _định_ _nghĩa_ đầu tiên.

Nói một cách khác, `||` không phân biệt được giữa `false`, `0`, một chuỗi rỗng `""` và `null/undefined`. Chúng đều giống nhau - là các giá trị falsy. Nếu bất cứ giá trị nào trên đây là đối số đầu tiên của toán tử `||`, thì chúng ta sẽ có kết quả là đối số thứ hai.

Tuy nhiên trong thực tiễn, chúng ta thường sẽ chỉ muốn sử dụng giá trị mặc định chỉ khi giá trị là `null/undefined`. Đó là khi giá trị thực sự là không xác định/chưa được set.

Ví dụ, như trường hợp sau:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- Biểu thức `height || 100` kiểm tra xem `height` có phải là một giá trị falsy không, và đúng là nó có giá trị falsy.
  - thế nên kết quả của `||` là đối số thứ hai, `100`.
- Còn biểu thức `height ?? 100` kiểm tra xem `height` có phải là `null/undefined` hay không, và nó không phải,
  - thế nên kết quả của biểu thức là `height`, tức là `0`.

Trong thực tiễn, height là 0 thường là một giá trị hợp lệ và không nên thay thế bằng một giá trị mặc định. Vì thế ở đây sử dụng `??` là chính xác.

## Thứ tự thực hiện

Thứ tự thực hiện cảu toán tử `??` gần ngang với `||`, chỉ thấp hơn một chút. Nó xếp thứ 5 trong [bảng MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), trong khi `||` xếp thứ 6.

Điều đó có nghĩa là, giống như `||`, toán tử nullish coaslescing `??` sẽ được đánh giá trước `=` và `?`, nhưng sau phần lớn các toán tử khác, ví dụ như `+`, `*`.

Thế nên nếu chúng ta muốn sử dụng `??` trong một biểu thức với các toán tử khác, thì việc cho thêm ngoặc đơn nên được cân nhắc:

```js run
let height = null;
let width = null;

// quan trọng: sử dụng ngoặc đơn
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Nếu không, nếu chúng ta bỏ qua ngoặc đơn ở đây, thì do `*` có thứ tự thực hiện cao hơn `??` nên sẽ được thực thi trước, dẫn đến kết quả không chính xác.

```js
// khi không có ngoặc đơn
let area = height ?? 100 * width ?? 50;

// ... hoạt động tương đương như với dòng sau (có lẽ không như chúng ta mong muốn):
let area = height ?? (100 * width) ?? 50;
```

### Sử dụng ?? với && hay ||

Vì lý do an toàn, Javascript cấm sử dụng `??` chung với toán tử `&&` và `||`, trừ khi thứ tự thực hiện được chỉ rõ với ngoặc đơn.

Dòng code dưới đây gây ra một syntax error (lỗi cú pháp):

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

Hạn chế này có gây tranh cãi, tuy nhiên việc này được thêm vào đặc tả của ngôn ngữ với mong muốn tránh được sai lầm khi lập trình, khi mọi người bắt đầu chuyển từ `||` sang `??`.

Sử dụng ngoặc đơn để xử lý tạm thời với vấn đề này:

```js run
*!*
let x = (1 && 2) ?? 3; // Hoạt động
*/!*

alert(x); // 2
```

## Tổng kết

- Toán tử nullish coalescing `??` cung cấp một cách ngắn gọn để chọn giá trị đầu tiên "được định nghĩa" trong một danh sách.

  Nó được dùng để gán giá trị mặc định cho biến:

  ```js
  // set height=100, nếu height là null hoặc undefined
  height = height ?? 100;
  ```

- Toán tử `??` có thứ tự thực hiện rất thấp, chỉ cao hơn `?` và `=` một chút, do đó bạn nên cân nhắc thêm ngoặc đơn khi sử dụng nó trong một biểu thức.
- Toán tử này không được phép dùng chung với toán tử `||` hoặc `&&` nếu không có ngoặc đơn được chỉ rõ.
