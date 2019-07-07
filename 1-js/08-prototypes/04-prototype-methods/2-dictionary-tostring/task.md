importance: 5

---

# Thêm toString vào từ điển

Có đối tượng `dictionary`, tạo bằng `Object.create(null)`, để chứa bất cứ cặp `key/value` nào.

Thêm phương thức `dictionary.toString()` vào nó, phương thức này trả về danh sách các key ngăn cách bởi dấu phảy. Phương thức `toString` không nên xuất hiện trong `for..in`.

Đây là cách nó làm việc:

```js
let dictionary = Object.create(null);

*!*
// thêm dictionary.toString ở đây
*/!*

// thêm dữ liệu
dictionary.apple = "Táo";
dictionary.__proto__ = "kiểm tra"; // __proto__ is là thuộc tính bình thường

// chỉ apple và __proto__ được liệt kê
for(let key in dictionary) {
  alert(key); // "apple", sau đó là "__proto__"
}  

// hoạt động của toString
alert(dictionary); // "apple,__proto__"
```
