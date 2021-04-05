# Đối tượng toàn cục

Đối tượng toàn cục cung cấp các biến và hàm có thể được sử dụng ở mọi nơi. Thông thường, đối tượng này luôn được tích hợp sẵn trong ngôn ngữ hoặc môi trường.

Trong trình duyệt, đối tượng toàn cục có tên là `window`, trong Node.js là `global`, ở các môi trường khác nó có thể mang các tên khác.

Gần đây, `globalThis` đã được thêm vào ngôn ngữ, như một tên tiêu chuẩn hóa cho một đối tượng toàn cục, sẽ được hỗ trợ trên tất cả các môi trường. Nó được hỗ trợ trong tất cả các trình duyệt chính.

Chúng ta sẽ sử dụng `window` ở đây, giả sử rằng môi trường của chúng ta là một trình duyệt. Nếu tập lệnh của bạn có thể chạy trong các môi trường khác, tốt hơn nên sử dụng `globalThis` thay thế.

Tất cả các thuộc tính của đối tượng toàn cục có thể được truy cập một cách trực tiếp:

```js run
alert("Xin chào");
// tương tự với
window.alert("Xin chào");
```

Trong trình duyệt, các biến và hàm toàn cục được khai báo với `var` (không phải với `let/const`!) sẽ trở thành thuộc tính của đối tượng toàn cục:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (trở thành thuộc tính của đối tượng toàn cục)
```

Tác dụng tương tự với các khai báo hàm (các câu lệnh có từ khóa `function` trong dòng mã chính, không phải biểu thức hàm).

Xin đừng dựa vào đó! Hành vi này tồn tại vì lý do tương thích. Các tập lệnh hiện đại sử dụng [JavaScript modules](info:modules) khiến điều đó không thể xảy ra.

Nếu chúng ta đã dùng `let` thay thế, điều đó đã không xảy ra:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (không bị trở thành thuộc tính của đối tượng toàn cục)
```

Nếu như có một giá trị nào đó thực sự quan trọng mà nó cần phải trở nên toàn cục, viết trực tiếp dưới dạng thuộc tính của đối tượng:

```js run
*!*
// làm cho biến currentUser trở nên toàn cục, giờ nó có thể được truy cập ở mọi nơi
window.currentUser = {
  name: "John"
};
*/!*

// ở đâu đó trong code
alert(currentUser.name);  // John

// hoặc nếu như có một biến cục bộ nào đó có tên trùng với "currentUser"
// cần chỉ ra rõ bạn muốn từ đối tượng window
alert(window.currentUser.name); // John
```

Điều đó nói rằng, việc sử dụng các biến toàn cục thường không được khuyến khích. Nên có càng ít biến toàn cục càng tốt. Thiết kế mã trong đó một hàm nhận các biến "đầu vào" và tạo ra "kết quả" nhất định thì rõ ràng hơn, ít bị lỗi hơn và dễ kiểm tra hơn so với việc sử dụng các biến bên ngoài hoặc toàn cục.

## Sử dụng cho polyfills

Đối tượng toàn cục thường được dùng để kiểm tra khả năng hỗ trợ các tính năng mới của ngôn ngữ.

Ví dụ, khi muốn kiểm tra xem đối tượng `Promise` có tồn tại hay không (ở một số trình duyệt cũ, `Promise` không tồn tại):
```js run
if (!window.Promise) {
  alert("Trình duyệt cũ lắm rồi!");
}
```

Nếu không có (giả sử chúng ta đang ở trong một trình duyệt cũ), chúng ta có thể tạo "polyfills": thêm các hàm không được môi trường hỗ trợ, nhưng tồn tại trong tiêu chuẩn hiện đại.

```js run
if (!window.Promise) {
  window.Promise = ... // cài đặt tùy chỉnh tính năng mới của ngôn ngữ
```

## Tóm tắt

- Đối tượng toàn cục chứa các biến nên có sẵn ở mọi nơi.
    Điều đó bao gồm các tích hợp sẵn của JavaScript, chẳng hạn như `Array` và các giá trị dành riêng cho môi trường, chẳng hạn như `window.innerHeight` -- chiều cao cửa sổ trong trình duyệt.
- Đối tượng toàn cục có một cái tên phổ quát hơn là `globalThis`.
    ...Nhưng thường được gọi bằng các tên dành riêng cho môi trường "kiểu cũ", chẳng hạn như `window` (trình duyệt) và `global` (Node.js).
- Chúng ta chỉ nên lưu trữ các giá trị trong đối tượng toàn cục nếu chúng thực sự toàn cục cho dự án của chúng ta. Và giữ số lượng của chúng ở mức tối thiểu.
- Trong trình duyệt, trừ khi chúng ta đang sử dụng [modules](info:modules), các biến và hàm toàn cục được khai báo với `var` sẽ trở thành thuộc tính của đối tượng toàn cục.
- Để làm cho mã của chúng ta dùng được lâu dài và dễ hiểu hơn, chúng ta nên truy cập trực tiếp vào các thuộc tính của đối tượng toàn cục, như là `window.x`.
