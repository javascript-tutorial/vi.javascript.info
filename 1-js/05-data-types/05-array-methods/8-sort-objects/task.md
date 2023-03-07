importance: 5

---

# Sắp xếp người dùng theo độ tuổi

Viết hàm `sortByAge(users)` để lấy một array các đối tượng có thuộc tính `age` và sắp xếp chúng theo `age`.

Ví dụ:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
