importance: 5

---

# Sử dụng "this" trong nghĩa đen của đối tượng

Ở đây hàm `makeUser` trả về một đối tượng.

Kết quả của việc truy cập `ref` của nó là gì? Tại sao?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Kết quả là gì?
```

