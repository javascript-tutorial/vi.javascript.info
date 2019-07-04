Trả lời: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

Giá trị `this` của hàm ràng buộc được cố định thành `null` và không thể thay đổi nó.

Cho nên dù ta chạy hàm ràng buộc từ một đối tượng khác `user.g()`, hàm gốc vẫn luôn được gọi với `this=null`.
