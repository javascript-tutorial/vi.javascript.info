importance: 5

---

# Khóa iterable

Chúng ta muốn lấy một array `map.keys()` trong một biến và sau đó áp dụng các phương thức dành riêng cho array đó, ví dụ: `.push`.

Nhưng nó không hoạt động:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push không phải một hàm
keys.push("more");
*/!*
```

Tại sao? Làm cách nào mà chúng ta có thể sửa mã để làm cho `keys.push` hoạt động?
