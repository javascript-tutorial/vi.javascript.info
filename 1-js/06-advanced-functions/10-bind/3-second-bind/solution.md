Trả lời: **Việt**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Việt"} ).bind( {name: "Nam"} );

f(); // Việt
```

Hàm ràng buộc [(bound function)](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) trả về bởi `f.bind(...)` chỉ ghi nhớ `context` (và các đối số khác nếu có) tại thời điểm nó được tạo.

Sau đó không có cách nào ràng buộc lại nó.
