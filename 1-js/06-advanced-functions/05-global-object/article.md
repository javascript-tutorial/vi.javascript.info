
# Đối tượng Global

<<<<<<< HEAD
Đối tượng global cung cấp các biến và hàm có thể được sử dụng ở mọi nơi. Thông thường, đối tượng này luôn được tích hợp sẵn trong ngôn ngữ.
=======
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Trong trình duyệt, đối tượng global có tên là `window`, trong Node.js là `global`, ở các môi trường khác nhau, nó có thể mang các cái tên khác nhau.

<<<<<<< HEAD
Gần đây, `globalThis` đã được thêm vào để chuẩn hóa tên cho đối tượng global, và sẽ sớm được hỗ trợ ở mọi môi trường. Tuy nhiên ở một số trình duyệt, cụ thể là non-Chromium Edge, vẫn chưa hỗ trợ `globalThis` nhưng nó có thể dễ dàng được thêm vào.
=======
Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

<<<<<<< HEAD
Tất cả các thuộc tính của đối tượng global có thể được truy cập một cách trực tiếp:

```js run
alert("Xin chào");

// tương tự với
window.alert("Xin chào");
```

Trong trình duyệt, các biến và hàm toàn cục được khai báo với `var` sẽ trở thành thuộc tính của đối tượng global:
=======
We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (trở thành thuộc tính của đối tượng global)
```

<<<<<<< HEAD
<<<<<<< HEAD
Cân nhắc khi sử dụng việc này ! Hành vi này tồn tại chỉ để phục vụ cho khả năng tương thích trong ngôn ngữ. Nó sẽ không xảy ra trong các đoạn scripts hiện đại, nơi mà thường hay sử dụng Javascript modules. Ta sẽ tìm hiểu ở chương [Modules](info:modules).

Một điều nữa, các cách khai báo biến với `let` và `const` hoàn toàn không bị ảnh hưởng bởi hành vi này:
=======
=======
The same effect have function declarations (statements with `function` keyword in the main code flow, not function expressions).

>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (không bị trở thành thuộc tính của đối tượng global)
```

Nếu như có một giá trị nào đó thực sự quan trọng mà nó cần phải trở nên toàn cục, viết trực tiếp dưới dạng thuộc tính của đối tượng:

```js run
*!*
// làm cho biến currentUser trở nên toàn cục, giờ nó có thể được truy cập ở mọi nơi
window.currentUser = {
  name: "Đăng"
};
*/!*

// ở đâu đó trong code
alert(currentUser.name);  // Đăng

// hoặc nếu như có một biến cục bộ nào đó có tên trùng với "currentUser"
// cần chỉ ra rõ bạn muốn từ đối tượng window
alert(window.currentUser.name); // Đăng
```

<<<<<<< HEAD
Nói chung, việc sử dụng các biến toàn cục không được khuyến khích. Hạn chế sử dụng các biến toàn cục giúp code của bạn trở nên rõ ràng, giảm thiểu được lỗi và dễ dàng để test hơn.
=======
That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## Sử dụng cho polyfills

Đối tượng global thường được dùng để kiểm thử khả năng hỗ trợ cho các tính năng mới của ngôn ngữ.

Ví dụ, khi muốn kiểm tra xem đối tượng `Promise` có tồn tại hay không (ở một số trình duyệt cũ, `Promise` không tồn tại):
```js run
if (!window.Promise) {
  alert("Trình duyệt cũ lắm rồi!");
}
```

Nếu trình duyệt chưa có (giả sử rằng ta đang sử dụng một trình duyệt siêu cũ), ta có thể tạo nên một "polyfills": thêm một hàm hoặc tính năng mà môi trường hiện tại chưa hỗ trợ.

```js run
if (!window.Promise) {
  window.Promise = ... // tùy chỉnh thực hiện các tính năng mới.
```

## Tóm tắt

- Đối tượng global giữ các biến có thể truy cập ở mọi nơi.

    Bao gồm các tính năng được tích hợp sẵn trong Javascript, chẳng hạn như `Array` và các giá trị của môi trường hiện tại, chằng hạn như `window.innerHeight` - chiều cao của cửa sổ trong trình duyệt .
- Đối tượng global có một cái tên phổ quát hơn là `globalThis`.

<<<<<<< HEAD
    ...Nhưng thông thường nó được gọi bằng các tên riêng trong các môi trường cụ thể , chẳng hạn như `window` (trình duyệt) và `global` (Node.js). Cái tên `globalThis` chỉ mới được đề xuất gần đây và hiện tại vẫn chưa được hỗ trợ bởi mọi trình duyệt.
- Chỉ nên lưu trữ giá trị trong đối tượng global nếu như thực sự cần. Hạn chế nhất có thể.
- Trong trình duyệt, ngoại trừ khi sử dụng [Modules](info:modules), các biến và hàm toàn cục được khai báo với `var` sẽ trở thành thuộc tính của đối tượng global .
- Để dễ dàng hơn cho việc đọc hiểu code trong tương lai, truy cập thuộc tính trực tiếp thông qua đối tượng global, chẳng hạn như `window.x`.
=======
    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
