importance: 5

---

# Lưu trữ ngày đọc

Có một array tin nhắn như trong [bài tập trước đó](info:task/recipients-read). Tình hình cũng tương tự.

```js
let messages = [
  {text: "Xin chào", from: "John"},
  {text: "Tiến triển thế nào rồi?", from: "John"},
  {text: "Hẹn sớm gặp lại", from: "Alice"}
];
```

Câu hỏi bây giờ là: bạn muốn đề xuất cấu trúc dữ liệu nào để lưu trữ thông tin: "khi tin nhắn được đọc?".

Trong tác vụ trước, chúng ta chỉ cần lưu trữ dữ kiện "có/không". Bây giờ chúng ta cần lưu trữ ngày tháng và nó chỉ nên lưu lại trong bộ nhớ cho đến khi thư được thu gom rác.

Tái bút: Ngày tháng có thể được lưu trữ dưới dạng đối tượng của lớp `Date` tích hợp sẵn, mà chúng ta sẽ đề cập sau.
