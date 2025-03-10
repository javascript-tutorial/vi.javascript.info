importance: 5

---

# Xuất danh sách liên kết đơn

Giả sử chúng ta có một danh sách liên kết đơn (như được mô tả trong chương <info:recursion>):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Viết một hàm `printList(list)` để xuất từng mục một trong danh sách.

Thực hiện hai biến thể của giải pháp: sử dụng vòng lặp và sử dụng đệ quy.

Điều gì tốt hơn: đệ quy hay không đệ quy?
