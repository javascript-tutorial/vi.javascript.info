importance: 5

---

# Lọc các phần tử array duy nhất

Đặt `arr` là một array.

Tạo một hàm `unique(arr)` sẽ trả về một array với các phần tử duy nhất của `arr`.

Ví dụ:

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

Tái bút: Ở đây các chuỗi được sử dụng, nhưng có thể là các giá trị thuộc bất kỳ loại nào.

Tái bút nữa: Sử dụng `Set` để lưu trữ các giá trị duy nhất.
