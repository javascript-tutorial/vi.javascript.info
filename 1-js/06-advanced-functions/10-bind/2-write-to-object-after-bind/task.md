importance: 5

---

# Dùng hàm ràng buộc làm phương thức

Cái gì sẽ được xuất ra?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

