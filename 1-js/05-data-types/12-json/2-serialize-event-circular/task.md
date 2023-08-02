importance: 5

---

# Loại trừ phản hồi

Trong các trường hợp đơn giản của tham chiếu vòng tròn, chúng ta có thể loại trừ một thuộc tính vi phạm khỏi việc tuần tự hóa theo tên của nó.

Nhưng đôi khi chúng ta không thể chỉ sử dụng tên, vì nó có thể được sử dụng cả trong tham chiếu vòng và thuộc tính bình thường. Vì vậy, chúng ta có thể kiểm tra thuộc tính theo giá trị của nó.

Viết hàm `replacer` để xâu chuỗi mọi thứ, nhưng xóa các thuộc tính tham chiếu `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// tham chiếu vòng
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* mã của bạn */
}));

/* kết quả nên là:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
