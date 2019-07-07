
Phương thức này có thể lấy tất cả các key có thể liệt kê bằng `Object.keys` và in ra danh sách này.

Để `toString` không được liệt kê, định nghĩa nó bằng một property descriptor. `Object.create` cũng cho phép ta làm điều này.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // định nghĩa phương thức toString
    value() { // giá trị là hàm
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Táo";
dictionary.__proto__ = "kiểm tra";

// apple và __proto__ được liệt kê
for(let key in dictionary) {
  alert(key); // "apple", sau đó là "__proto__"
}  

// toString trả về danh sách thuộc tính
alert(dictionary); // "apple,__proto__"
```

Khi tạo thuộc tính bằng descriptor, tất cả các cờ không được cung cấp có giá trị mặc định là `false`. Cho nên, `dictionary.toString` không thể liệt kê.

Xem lại bài [](info:property-descriptors) để hiểu rõ hơn.
