# Trì hoãn với promise

Xây dựng bên trong một hàm `setTimeout` sử dụng callbacks. Tạo một giải pháp dựa trên promise.

Hàm `delay(ms)` sẽ trả về một promise. Promise đó sẽ được giải quyết sau `ms` mili giây, để chúng ta có thể thêm `.then` vào nó, như sau:

```js
function delay(ms) {
  // your code
}

delay(3000).then(() => alert("runs after 3 seconds"));
```
