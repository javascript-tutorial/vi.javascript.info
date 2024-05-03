# Animated circle with promise

Viết lại hàm `showCircle` trong giải pháp của bài tập <info:task/animate-circle-callback> để nó trả về một promise thay vì chấp nhận một callback.

Cách sử dụng mới

```js
showCircle(150, 150, 100).then((div) => {
  div.classList.add("message-ball");
  div.append("Hello, world!");
});
```

Lấy giải pháp của bài tập <info:task/animate-circle-callback> làm cơ sở.
