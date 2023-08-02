importance: 5

---

# Hàm có nhận thay đổi mới nhất không?

Hàm sayHi sử dụng tên biến ngoài. Khi hàm chạy, nó sẽ sử dụng giá trị nào?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // nó sẽ hiển thị gì: "John" hay "Pete"?
```

Những tình huống như vậy là phổ biến cả trong phát triển trình duyệt và phía máy chủ. Một hàm có thể được lên lịch để thực thi muộn hơn so với khi nó được tạo, chẳng hạn như sau một hành động của người dùng hoặc một yêu cầu mạng.

Vì vậy, câu hỏi là: nó có nhận những thay đổi mới nhất không?
