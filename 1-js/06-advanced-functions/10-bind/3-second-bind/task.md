importance: 5

---

# Ràng buộc thứ hai

Có thể thay đổi `this` bằng một ràng buộc thứ hai không?

Cái gì được xuất ra?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Việt"} ).bind( {name: "Nam" } );

f();
```

