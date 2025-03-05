
Để lưu trữ một ngày, chúng ta có thể sử dụng `WeakMap`:

```js
let messages = [
  {text: "Xin chào", from: "John"},
  {text: "Tiến triển thế nào rồi?", from: "John"},
  {text: "Hẹn sớm gặp lại", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Đối tượng ngày chúng ta sẽ nghiên cứu sau
```
