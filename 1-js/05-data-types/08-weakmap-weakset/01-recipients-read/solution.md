Hãy lưu trữ tin nhắn đã đọc trong `WeakSet`:

```js run
let messages = [
  {text: "Xin chào", from: "John"},
  {text: "Tiến triển thế nào rồi?", from: "John"},
  {text: "Hẹn sớm gặp lại", from: "Alice"}
];

let readMessages = new WeakSet();

// hai tin nhắn đã được đọc
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...hãy đọc lại tin nhắn đầu tiên!
readMessages.add(messages[0]);
// readMessages vẫn có 2 yếu tố duy nhất

// trả lời: messages[0] đã được đọc chưa?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// bây giờ readMessages có 1 phần tử (về mặt kỹ thuật, bộ nhớ có thể được xóa sau)
```

`WeakSet` cho phép lưu trữ một tập hợp các thông báo và dễ dàng kiểm tra sự tồn tại của một thông báo trong đó.

Nó tự động dọn dẹp. Sự đánh đổi là chúng ta không thể lặp lại nó, không thể nhận trực tiếp "tất cả các tin nhắn đã đọc" từ nó. Nhưng chúng ta có thể làm điều đó bằng cách lặp lại tất cả các tin nhắn và lọc những tin nhắn có trong tập hợp.

Một giải pháp khác, khác có thể là thêm thuộc tính như `message.isRead=true` vào thư sau khi thư được đọc. Vì các đối tượng thông báo được quản lý bởi một mã khác, điều đó thường không được khuyến khích, nhưng chúng ta có thể sử dụng một thuộc tính tượng trưng để tránh xung đột.

Như thế này:
```js
// thuộc tính tượng trưng chỉ được biết đến với mã của chúng ta
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Bây giờ mã của bên thứ ba có thể sẽ không thấy thuộc tính bổ sung của chúng ta.

Mặc dù các biểu tượng cho phép giảm xác suất xảy ra sự cố, nhưng sử dụng `WeakSet` sẽ tốt hơn từ quan điểm kiến kiến trúc.
