importance: 5

---

# Map tới các đối tượng

Bạn có một array các đối tượng `user`, mỗi đối tượng có `name`, `surname` và `id`.

Viết mã để tạo một array khác từ nó, gồm các đối tượng có `id` và `fullName`, trong đó `fullName` được tạo từ `name` và `surname`.

Ví dụ:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... mã của bạn ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Vì vậy, trên thực tế, bạn cần map một array đối tượng này sang array đối tượng khác. Hãy thử sử dụng `=>` tại đây. Có một nhược điểm nhỏ.
