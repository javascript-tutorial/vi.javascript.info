importance: 5

---

# Tạo đối tượng có cùng constructor

Tưởng tượng, ta có đối tượng bất kỳ `obj`, tạo ra từ một hàm tạo -- chúng ta không biết về hàm này, nhưng lại muốn tạo đối tượng khác bằng nó.

Có thể làm như thế này không?

```js
let obj2 = new obj.constructor();
```

Cho biết khi nào đoạn mã trên làm việc và không làm việc, cho ví dụ minh họa từng trường hợp?
