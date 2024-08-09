```js run
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => alert("runs after 3 seconds"));
```

Hãy nhớ rằng trong bài này `resolve` được gọi mà không có tham số. Chúng ta không trả về bất kỳ giá trị nào từ `delay`, chỉ đảm bảo thời gian trễ.
