
# Chuỗi tùy chọn '?.'

[recent browser="new"]

Chuỗi tùy chọn `?.` là một cách an toàn để truy cập các thuộc tính đối tượng lồng nhau, ngay cả khi thuộc tính trung gian không tồn tại.

## Vấn đề "thuộc tính không tồn tại"

Nếu bạn mới bắt đầu đọc hướng dẫn và học JavaScript, có thể vấn đề chưa khiến bạn lo lắng, nhưng nó khá phổ biến.

Ví dụ: Giả sử chúng ta có các đối tượng `user` chứa thông tin về người dùng của chúng ta.

Hầu hết người dùng của chúng ta có địa chỉ trong thuộc tính `user.address`, với đường phố `user.address.street`, nhưng một số người không cung cấp chúng.

Trong trường hợp như vậy, khi chúng ta cố gắng lấy `user.address.street` và người dùng không có địa chỉ, chúng tôi sẽ gặp lỗi:

```js run
let user = {}; // người dùng không có thuộc tính "địa chỉ"

alert(user.address.street); // Lỗi!
```

Đó là kết quả mong đợi. JavaScript hoạt động như thế này. Vì `user.address` là `không xác định`, nỗ lực lấy `user.address.street` không thành công và xảy ra lỗi.

Trong nhiều trường hợp thực tế, chúng ta muốn nhận được `không xác định` thay vì lỗi ở đây (có nghĩa là "không có đường phố").

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

Nó hoạt động, không có lỗi... Nhưng nó khá kém trang nhã. Như bạn có thể thấy, `"user.address"` xuất hiện hai lần trong mã. Đối với các thuộc tính được lồng sâu hơn, điều đó trở thành một vấn đề khi cần nhiều lần lặp lại hơn.

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

AND'ing toàn bộ đường dẫn đến thuộc tính đảm bảo rằng tất cả các thành phần đều tồn tại (nếu không, quá trình đánh giá sẽ dừng), nhưng cũng không phải là lý tưởng.

Như bạn có thể thấy, tên thuộc tính vẫn bị trùng lặp trong mã. Ví dụ. trong đoạn mã trên, `user.address` xuất hiện ba lần.

Đó là lý do tại sao chuỗi tùy chọn `?.` đã được thêm vào ngôn ngữ. Để giải quyết vấn đề này một lần và mãi mãi!

## Chuỗi tùy chọn

Chuỗi tùy chọn `?.` dừng đánh giá nếu giá trị trước `?.` là `không xác định` hoặc `null` và trả về `không xác định`.

**Trong bài viết này, để cho ngắn gọn, chúng ta sẽ nói rằng một thứ gì đó "tồn tại" nếu nó không phải là `null` và không phải là `undefined`.**

Nói cách khác, `value?.prop`:
- hoạt động như `value.prop`, nếu `value` tồn tại,
- ngược lại (khi `giá trị` là `không xác định/null`), nó trả về `undefined`.

Đây là cách an toàn để truy cập `user.address.street` bằng cách sử dụng `?.`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

Mã ngắn và rõ ràng, không có sự trùng lặp nào cả.

Đọc địa chỉ với `user?.address` hoạt động ngay cả khi đối tượng `user` không tồn tại:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Hãy lưu ý: cú pháp `?.` tạo giá trị tùy chọn trước nó, nhưng không thêm nữa.

Ví dụ. trong `user?.address.street.name`, `?.` cho phép `user` trở thành `null/undefined` một cách an toàn (và trả về `undefined` trong trường hợp đó), nhưng điều đó chỉ dành cho `user`. Các thuộc tính khác được truy cập một cách thường xuyên. Nếu chúng ta muốn một số trong số chúng là tùy chọn, thì chúng ta sẽ cần thay thế thêm `.` bằng `?.`.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:

```js run
// ReferenceError: user is not defined
user?.address;
```
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur.

For instance:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // 0, value not incremented
```

## Other variants: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the user object exists, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.

For example:
```js run
let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
