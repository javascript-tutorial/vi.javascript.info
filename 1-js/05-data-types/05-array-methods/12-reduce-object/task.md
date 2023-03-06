importance: 4

---

# Tạo đối tượng có khóa từ array

Giả sử chúng ta nhận được một array người dùng ở dạng `{id:..., name:..., age... }`.

Tạo một hàm `groupById(arr)` để tạo một đối tượng từ nó, với `id` là khóa và các mục array là giá trị.

Ví dụ:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// sau cuộc gọi chúng ta nên có:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Hàm như vậy thực sự tiện dụng khi làm việc với dữ liệu máy chủ.

Trong nhiệm vụ này, chúng ta giả định rằng `id` là duy nhất. Có thể không có hai mục array nào có cùng `id`.

Vui lòng sử dụng phương thức mảng `.reduce` trong giải pháp.
