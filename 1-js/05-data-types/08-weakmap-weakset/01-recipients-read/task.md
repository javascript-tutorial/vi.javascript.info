importance: 5

---

# Lưu trữ cờ "chưa đọc"

Có một array các tin nhắn:

```js
let messages = [
  {text: "Xin chào", from: "John"},
  {text: "Tiến triển thế nào rồi?", from: "John"},
  {text: "Hẹn sớm gặp lại", from: "Alice"}
];
```

Mã của bạn có thể truy cập nó, nhưng các tin nhắn được quản lý bởi mã của người khác. Các tin nhắn mới được thêm vào, các tin nhắn cũ bị mã đó xóa thường xuyên và bạn không biết chính xác thời điểm nó xảy ra.

Bây giờ, bạn có thể sử dụng cấu trúc dữ liệu nào để lưu trữ thông tin về việc thư "đã được đọc" chưa? Cấu trúc phải phù hợp để đưa ra câu trả lời "đã đọc chưa?" cho đối tượng thông báo đã cho.

Tái bút: Khi một tin nhắn bị xóa khỏi `messages`, nó cũng sẽ biến mất khỏi cấu trúc của bạn.

Tái bút nữa: Chúng ta không nên sửa đổi các đối tượng tin nhắn, hãy thêm các thuộc tính của chúng ta vào chúng. Vì chúng được quản lý bởi mã của người khác, điều đó có thể dẫn đến hậu quả xấu.
