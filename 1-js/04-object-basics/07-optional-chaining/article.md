
# Xâu chuỗi tùy chọn '?.'

[recent browser="new"]

Xâu chuỗi tùy chọn `?.` là một cách an toàn để truy cập các thuộc tính đối tượng lồng nhau, ngay cả khi thuộc tính trung gian không tồn tại.

## Vấn đề "thuộc tính không tồn tại"

Nếu bạn mới bắt đầu đọc hướng dẫn và học JavaScript, có thể vấn đề chưa khiến bạn lo lắng, nhưng nó khá phổ biến.

Ví dụ: Giả sử chúng ta có các đối tượng `user` chứa thông tin về người dùng của chúng ta.

Hầu hết người dùng của chúng ta có địa chỉ trong thuộc tính `user.address`, với đường phố `user.address.street`, nhưng một số người không cung cấp chúng.

Trong trường hợp như vậy, khi chúng ta cố gắng lấy `user.address.street` và người dùng không có địa chỉ, chúng ta sẽ gặp lỗi:

```js run
let user = {}; // người dùng không có thuộc tính "địa chỉ"

alert(user.address.street); // Lỗi!
```

Đó là kết quả mong đợi. JavaScript hoạt động như thế này. Vì `user.address` là `undefined`, nỗ lực lấy `user.address.street` không thành công và xảy ra lỗi.

Trong nhiều trường hợp thực tế, chúng ta muốn nhận được `undefined` thay vì lỗi ở đây (có nghĩa là "không có đường phố").

...Và một ví dụ khác. Trong quá trình phát triển web, chúng ta có thể lấy một đối tượng tương ứng với một phần tử trang web bằng cách sử dụng lệnh gọi phương thức đặc biệt, chẳng hạn như `document.querySelector('.elem')` và nó trả về `null` khi không có phần tử nào như vậy.

```js run
// document.querySelector('.elem') là null nếu không có phần tử
let html = document.querySelector('.elem').innerHTML; // lỗi nếu nó là null
```

Một lần nữa, nếu phần tử không tồn tại, chúng ta sẽ gặp lỗi khi truy cập `.innerHTML` của `null`. Và trong một số trường hợp, khi việc thiếu phần tử là bình thường, chúng ta muốn tránh lỗi và chỉ chấp nhận kết quả là `html = null`.

Làm thế nào chúng ta có thể làm điều này?

Giải pháp rõ ràng là kiểm tra giá trị bằng cách sử dụng `if` hoặc toán tử điều kiện `?`, trước khi truy cập thuộc tính của nó, như sau:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

Nó hoạt động, không có lỗi... Nhưng nó khá khiếm nhã. Như bạn có thể thấy, `"user.address"` xuất hiện hai lần trong mã. Đối với các thuộc tính được lồng sâu hơn, điều đó trở thành một vấn đề khi cần nhiều lần lặp lại hơn.

Ví dụ. hãy thử lấy `user.address.street.name`.

Chúng ta cần kiểm tra cả `user.address` và `user.address.street`:

```js
let user = {}; // người dùng không có địa chỉ

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Điều đó thật tồi tệ, một người thậm chí có thể gặp khó khăn khi hiểu mã như vậy.

Đừng quan tâm, vì có một cách tốt hơn để viết nó, sử dụng toán tử `&&`:

```js run
let user = {}; // người dùng không có địa chỉ

alert( user.address && user.address.street && user.address.street.name ); // undefined (không có lỗi)
```

Kiểm tra toàn bộ đường dẫn đến thuộc tính đảm bảo rằng tất cả các thành phần đều tồn tại (nếu không, quá trình đánh giá sẽ dừng), nhưng cũng không phải là lý tưởng.

Như bạn có thể thấy, tên thuộc tính vẫn bị trùng lặp trong mã. Ví dụ. trong đoạn mã trên, `user.address` xuất hiện ba lần.

Đó là lý do tại sao xâu chuỗi tùy chọn `?.` đã được thêm vào ngôn ngữ. Để giải quyết vấn đề này một lần và mãi mãi!

## Xâu chuỗi tùy chọn

Chuỗi tùy chọn `?.` dừng đánh giá nếu giá trị trước `?.` là `undefined` hoặc `null` và trả về `undefined`.

**Trong bài viết này, để cho ngắn gọn, chúng ta sẽ nói rằng một thứ gì đó "tồn tại" nếu nó không phải là `null` hay `undefined`.**

Nói cách khác, `value?.prop`:
- hoạt động như `value.prop`, nếu `value` tồn tại,
- ngược lại (khi `value` là `undefined/null`), nó trả về `undefined`.

Đây là cách an toàn để truy cập `user.address.street` bằng cách sử dụng `?.`:

```js run
let user = {}; // người dùng không có địa chỉ

alert( user?.address?.street ); // undefined (không có lỗi)
```

Mã ngắn và rõ ràng, không có sự trùng lặp nào cả.

Đọc địa chỉ với `user?.address` hoạt động ngay cả khi đối tượng `user` không tồn tại:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Hãy lưu ý: Cú pháp `?.` tạo giá trị tùy chọn trước nó, nhưng không thêm nữa.

Ví dụ. trong `user?.address.street.name`, `?.` cho phép `user` trở thành `null/undefined` một cách an toàn (và trả về `undefined` trong trường hợp đó), nhưng điều đó chỉ dành cho `user`. Các thuộc tính khác được truy cập một cách thường xuyên. Nếu chúng ta muốn một số trong số chúng là tùy chọn, thì chúng ta sẽ cần thay thế thêm `.` bằng `?.`.

```warn header="Đừng lạm dụng chuỗi tùy chọn"
Chúng ta chỉ nên sử dụng `?.` khi không có gì tồn tại.

Ví dụ: nếu theo logic mã hóa của chúng ta, đối tượng `user` phải tồn tại, nhưng `address` là tùy chọn, thì chúng ta nên viết `user.address?.street`, chứ không phải `user?.address?.street`.

Vì vậy, nếu `user` không được xác định do nhầm lẫn, chúng ta sẽ thấy lỗi lập trình về nó và sửa nó. Mặt khác, các lỗi lập trình có thể bị tắt khi không thích hợp và trở nên khó gỡ lỗi hơn.
```

````warn header="Biến trước `?.` phải được khai báo"
Nếu hoàn toàn không có biến `user`, thì `user?.anything` sẽ gây ra lỗi:

```js run
// ReferenceError: user is not defined
user?.address;
```
Biến phải được khai báo (ví dụ: `let/const/var user` hoặc dưới dạng tham số hàm). Xâu chuỗi tùy chọn chỉ hoạt động đối với các biến đã khai báo.
````

## Ngắn mạch

Như đã nói trước đó, `?.` ngay lập tức dừng ("ngắn mạch") đánh giá nếu phần bên trái không tồn tại.

Vì vậy, nếu có thêm bất kỳ lệnh gọi hàm hoặc tác dụng phụ nào, chúng sẽ không xảy ra.

Ví dụ:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // không có "sayHi", vì vậy việc thực thi không đạt được x++

alert(x); // 0, giá trị không tăng
```

## Các biến thể khác: ?.(), ?.[]

Xâu chuỗi tùy chọn `?.` không phải là một toán tử, mà là một cấu trúc cú pháp đặc biệt, cũng hoạt động với các hàm và dấu ngoặc vuông.

Ví dụ: `?.()` được sử dụng để gọi một hàm có thể không tồn tại.

Trong mã bên dưới, một số người dùng của chúng ta có phương thức `admin` và một số thì không:

```js run
let userAdmin = {
  admin() {
    alert("Tôi là admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // Tôi là admin
*/!*

*!*
userGuest.admin?.(); // không có gì (không có phương thức như vậy)
*/!*
```

Ở đây, trong cả hai dòng, trước tiên chúng ta sử dụng dấu chấm (`userAdmin.admin`) để nhận thuộc tính `admin`, bởi vì chúng ta cho rằng đối tượng user tồn tại, vì vậy có thể đọc từ đối tượng đó một cách an toàn.

Sau đó, `?.()` kiểm tra phần bên trái: nếu hàm admin tồn tại, thì nó sẽ chạy (đối với `userAdmin` thì như vậy). Nếu không (đối với `userGuest`), quá trình đánh giá sẽ dừng mà không có lỗi.

Cú pháp `?.[]` cũng hoạt động, nếu chúng ta muốn sử dụng dấu ngoặc `[]` để truy cập các thuộc tính thay vì dấu chấm `.`. Tương tự như các trường hợp trước, nó cho phép đọc một thuộc tính từ một đối tượng có thể không tồn tại một cách an toàn.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Ngoài ra, chúng ta có thể sử dụng `?.` với `delete`:

```js run
delete user?.name; // xóa user.name nếu user tồn tại
```

````warn header="Chúng ta có thể sử dụng `?.` để đọc và xóa an toàn, nhưng không viết"
Xâu chuỗi tùy chọn `?.` không có tác dụng ở phía bên trái của tác vụ.

Ví dụ:
```js run
let user = null;

user?.name = "John"; // Lỗi, không hoạt động
// bởi vì nó đánh giá là undefined = "John
```

Nó chỉ là không thông minh.
````

## Tóm tắt

Cú pháp xâu chuỗi tùy chọn `?.` có ba dạng:

1. `obj?.prop` -- trả về `obj.prop` nếu `obj` tồn tại, nếu không thì `undefined`.
2. `obj?.[prop]` -- trả về `obj[prop]` nếu `obj` tồn tại, nếu không thì `undefined`.
3. `obj.method?.()` -- gọi `obj.method()` nếu `obj.method` tồn tại, nếu không thì trả về `undefined`.

Như chúng ta có thể thấy, tất cả chúng đều đơn giản và dễ sử dụng. `?.` kiểm tra phần bên trái để tìm `null/undefined` và cho phép tiếp tục đánh giá nếu không.

Chuỗi `?.` cho phép truy cập các thuộc tính lồng nhau một cách an toàn.

Tuy nhiên, chúng ta nên áp dụng `?.` một cách cẩn thận, chỉ khi phần bên trái không tồn tại được chấp nhận. Vì vậy, nó sẽ không che giấu các lỗi lập trình với chúng ta, nếu chúng xảy ra.
