importance: 5

---

# Sao chép và sắp xếp array

Chúng ta có một array với các chuỗi `arr`. Chúng ta muốn có một bản sao được sắp xếp của nó, nhưng giữ nguyên `arr`.

Tạo một hàm `copySorted(arr)` để trả về một bản sao như vậy.

```js
let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (không thay đổi)
```
