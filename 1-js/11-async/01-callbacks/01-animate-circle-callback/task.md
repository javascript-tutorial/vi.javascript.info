
# Hiệu ứng hình tròn với hàm gọi lại

Trong bài tập này <info:task/animate-circle> sẽ hiển thị hiệu ứng phát triển hình tròn.

Hiện tại có thể nói ta chưa cần có một hình tròn, nhưng ta cần hiển thị thông báo trong nó. Thông báo cần được xuất hiện *sau* khi hiệu ứng hoàn thành (hình tròn đã phát triển lớn nhất), mặt khác thì nó sẽ trông xấu xí.

Giải pháp trong bài tập này, có hàm `showCircle(cx, cy, radius)` vẽ ra hình tròn nhưng không đưa cách nào để biết nó đã sẵn sàng.

Thêm biến có tên callback: `showCircle(cx, cy, radius, callback)` để được gọi sau khi hiệu ứng hoàn thành. `callback` nên nhận hình tròn `<div>` như là một biến truyền vào.

Đây là ví dụ:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

Lấy cách làm của bài <info:task/animate-circle> như cơ sở.
